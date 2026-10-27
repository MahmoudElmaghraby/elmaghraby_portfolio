// Fetches the hero (first) phone screenshot for each app from the App Store
// and Google Play, keeps the highest-resolution one, and saves it as PNG to
// public/images/. Both store pages are server-rendered, so plain fetch is
// enough; no headless browser is needed.
//
// Usage: node scripts/fetch-store-screenshots.mjs

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "images");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

const apps = [
  {
    file: "family-park.jpeg",
    appStore: "https://apps.apple.com/sa/app/id6737783001",
    playStore: "https://play.google.com/store/apps/details?id=com.sadara.familypark",
  },
  {
    file: "safi-mart.jpeg",
    appStore: "https://apps.apple.com/sa/app/id6456607778",
    playStore: "https://play.google.com/store/apps/details?id=com.sadara.safi",
  },
  {
    file: "banzinty.png",
    playSearch: { query: "Banzinty", developer: "Sadara" },
  },
];

async function getText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "en" } });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.text();
}

async function getPng(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "image/png" } });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error(`Not a PNG: ${url}`);
  return { url, buf, width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

// App Store: screenshots live under .../PurpleSourceNNN/.../<n>.png/<size>.
// The first one in page order is the hero. Asking for an oversized box
// returns the original upload as PNG.
async function appStoreHero(url) {
  const html = await getText(url);
  const match = html.match(
    /https:\/\/is\d-ssl\.mzstatic\.com\/image\/thumb\/PurpleSource[^"\s,]*?\/[^/"\s]+\.(?:png|jpe?g)\//,
  );
  if (!match) throw new Error(`No screenshots found on ${url}`);
  return getPng(`${match[0]}9999x9999bb.png`);
}

// Google Play: screenshots are <img alt="Screenshot image">; "=s0-rp" asks
// the image CDN for the original size as PNG.
async function playHero(url) {
  const html = await getText(`${url}${url.includes("?") ? "&" : "?"}hl=en`);
  const img = html.match(/<img[^>]*alt="Screenshot image"[^>]*>/);
  const src = img?.[0].match(/src="(https:\/\/play-lh\.googleusercontent\.com\/[^"=]+)/);
  if (!src) throw new Error(`No screenshots found on ${url}`);
  return getPng(`${src[1]}=s0-rp`);
}

async function playSearch({ query, developer }) {
  const html = await getText(
    `https://play.google.com/store/search?q=${encodeURIComponent(query)}&c=apps&hl=en`,
  );
  const ids = [...new Set([...html.matchAll(/details\?id=([\w.]+)/g)].map((m) => m[1]))];
  const ranked = [
    ...ids.filter((id) => id.toLowerCase().includes(query.toLowerCase())),
    ...ids.filter((id) => !id.toLowerCase().includes(query.toLowerCase())),
  ];
  for (const id of ranked.slice(0, 10)) {
    const url = `https://play.google.com/store/apps/details?id=${id}`;
    const page = await getText(`${url}&hl=en`);
    const title = page.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? "";
    if (title.toLowerCase().includes(query.toLowerCase()) && page.includes(developer)) {
      console.log(`  found ${query} on Play: ${id}`);
      return url;
    }
  }
  throw new Error(`Could not find "${query}" by ${developer} on Google Play`);
}

await mkdir(OUT_DIR, { recursive: true });

let failed = false;
for (const app of apps) {
  console.log(`${app.file}`);
  const playUrl = app.playStore ?? (await playSearch(app.playSearch));
  const results = await Promise.allSettled([
    app.appStore ? appStoreHero(app.appStore) : Promise.reject(new Error("no App Store listing")),
    playHero(playUrl),
  ]);
  const shots = results.flatMap((r, i) => {
    const source = i === 0 ? "App Store" : "Google Play";
    if (r.status === "fulfilled") {
      console.log(`  ${source}: ${r.value.width}x${r.value.height}`);
      return [{ ...r.value, source }];
    }
    console.log(`  ${source}: skipped (${r.reason.message})`);
    return [];
  });
  if (!shots.length) {
    failed = true;
    continue;
  }
  const best = shots.sort((a, b) => b.width * b.height - a.width * a.height)[0];
  await writeFile(path.join(OUT_DIR, app.file), best.buf);
  console.log(`  saved ${best.source} ${best.width}x${best.height} -> public/images/${app.file}`);
}

process.exit(failed ? 1 : 0);