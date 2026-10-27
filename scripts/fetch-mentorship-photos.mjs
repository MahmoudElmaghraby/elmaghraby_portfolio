// Downloads three mentorship photos from the signed-in Google Photos account
// and saves them into public/images/mentorship/.
//
// Opens a visible Chrome window. Sign in there if asked; the session is stored
// in scripts/.photos-browser (gitignored), not in the default Chrome profile.
//
// Usage: node scripts/fetch-mentorship-photos.mjs

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const OUT_DIR = path.join(process.cwd(), "public", "images", "mentorship");
const PROFILE_DIR = path.join(process.cwd(), "scripts", ".photos-browser");
const LOGIN_WAIT_MS = 15 * 60 * 1000;

const targets = [
  {
    file: "competition-judge.jpg",
    queries: ["Afro Asian Forum April 2025", "Afro Asian Forum", "Afro-Asian Forum", "judging"],
  },
  {
    file: "techno-space-win.jpg",
    queries: ["Techno Space", "TechnoSpace", "student project"],
  },
  {
    file: "cic-bootcamp.jpg",
    queries: ["CIC bootcamp", "CIC workshop", "CIC"],
  },
];

function originalUrl(src) {
  if (!src || !src.includes("googleusercontent.com")) return null;
  const hash = src.indexOf("#");
  const bare = hash === -1 ? src : src.slice(0, hash);
  return bare.replace(/=[^/=?#]*$/, "=d");
}

function isJpeg(buffer) {
  return buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
}

async function toJpeg(buffer) {
  if (isJpeg(buffer)) return buffer;
  const { default: sharp } = await import("sharp");
  return sharp(buffer).jpeg({ quality: 95 }).toBuffer();
}

async function launch() {
  const options = {
    headless: false,
    acceptDownloads: true,
    viewport: { width: 1440, height: 900 },
    args: ["--disable-blink-features=AutomationControlled"],
  };
  try {
    return await chromium.launchPersistentContext(PROFILE_DIR, { ...options, channel: "chrome" });
  } catch (error) {
    console.log(`Chrome channel unavailable (${error.message.split("\n")[0]}). Using Playwright Chromium.`);
    return chromium.launchPersistentContext(PROFILE_DIR, options);
  }
}

async function openPhotos(page) {
  await page.goto("https://photos.google.com/", { waitUntil: "domcontentloaded" });
  const enter = page.getByRole("link", { name: /go to google photos|visit google photos/i });
  if ((await enter.count()) > 0) {
    await enter.first().click();
    await page.waitForLoadState("domcontentloaded");
  }
  if (!page.url().includes("photos.google.com") || page.url().includes("/about")) {
    await page.goto(
      "https://accounts.google.com/ServiceLogin?service=lh2&passive=1209600&continue=https%3A%2F%2Fphotos.google.com%2F&followup=https%3A%2F%2Fphotos.google.com%2F",
      { waitUntil: "domcontentloaded" },
    );
  }
  await page.bringToFront();
}

async function waitUntilSignedIn(page) {
  const deadline = Date.now() + LOGIN_WAIT_MS;
  console.log("Sign in to Google Photos in the opened window. The download starts after the photo library loads.");
  while (Date.now() < deadline) {
    const search = page.locator('input[aria-label*="Search" i], input[placeholder*="Search" i]');
    if ((await search.count()) > 0) return;
    const url = page.url();
    if (url.includes("photos.google.com") && !url.includes("accounts.google.com")) {
      const grid = page.locator('a[href*="/photo/"]');
      if ((await grid.count()) > 0) return;
    }
    await page.waitForTimeout(1000);
  }
  throw new Error("Google Photos did not finish signing in. Sign in in the opened window, then run the script again.");
}

async function search(page, query) {
  const url = `https://photos.google.com/search/${encodeURIComponent(query)}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page
    .waitForFunction(() => document.querySelector('a[href*="/photo/"]') || /no photos|no results|لا توجد/i.test(document.body.innerText), {
      timeout: 12000,
    })
    .catch(() => {});
  const hrefs = await page.locator('a[href*="/photo/"]').evaluateAll((anchors) => [
    ...new Set(anchors.map((anchor) => anchor.href).filter((href) => href.includes("/photo/"))),
  ]);
  console.log(`  ${hrefs.length} photo${hrefs.length === 1 ? "" : "s"}`);
  return hrefs;
}

function photoLocator(page) {
  return page.locator('img[src*="/pw/"], [aria-label="Download" i], [aria-label="تنزيل" i]');
}

async function downloadFromViewer(page, context) {
  const button = page.locator('[aria-label="Download" i], [aria-label="تنزيل" i]').first();
  if ((await button.count()) > 0 && (await button.isVisible())) {
    const downloadTask = page.waitForEvent("download", { timeout: 12000 }).catch(() => null);
    await button.click();
    const download = await downloadTask;
    if (download) return streamToBuffer(await download.createReadStream());
  }

  const src = await page.locator('img[src*="/pw/"]').evaluateAll((images) => {
    const ranked = images
      .map((image) => image.currentSrc || image.src)
      .filter((url) => url && !url.includes("/ogw/"));
    ranked.sort((a, b) => {
      const size = (url) => Number(url.match(/[/=]w(\d+)/)?.[1] ?? url.match(/[/=]s(\d+)/)?.[1] ?? 0);
      return size(b) - size(a);
    });
    return ranked[0] ?? null;
  });
  const direct = originalUrl(src);
  if (!direct) throw new Error("Could not find a full-resolution image URL.");
  const response = await context.request.get(direct);
  if (!response.ok()) throw new Error(`Image download failed (${response.status()}).`);
  return response.body();
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function saveTarget(page, context, target, used) {
  for (const query of target.queries) {
    console.log(`Searching “${query}” for ${target.file}`);
    const hrefs = (await search(page, query)).filter((href) => !used.has(href));
    if (hrefs.length === 0) continue;

    const href = hrefs[0];
    await page.goto(href, { waitUntil: "domcontentloaded" });
    await photoLocator(page).first().waitFor({ state: "visible", timeout: 20000 });
    const bytes = await toJpeg(await downloadFromViewer(page, context));
    if (bytes.length < 10_000) throw new Error(`Downloaded file for ${target.file} is too small to be a photo.`);
    const dest = path.join(OUT_DIR, target.file);
    await writeFile(dest, bytes);
    used.add(href);
    console.log(`Saved ${dest} (${bytes.length} bytes) from “${query}”`);
    return;
  }
  throw new Error(`No unused photo found for ${target.file}.`);
}

const context = await launch();
const page = context.pages()[0] ?? (await context.newPage());

try {
  await mkdir(OUT_DIR, { recursive: true });
  await openPhotos(page);
  await waitUntilSignedIn(page);

  const used = new Set();
  for (const target of targets) {
    await saveTarget(page, context, target, used);
  }

  for (const target of targets) {
    const saved = await readFile(path.join(OUT_DIR, target.file));
    if (!isJpeg(saved)) throw new Error(`${target.file} is not a JPEG.`);
  }
  console.log("All three mentorship photos saved.");
} finally {
  await context.close();
}
