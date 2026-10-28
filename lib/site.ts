export const site = {
  name: "Mahmoud Elmaghraby",
  title: "Mahmoud Elmaghraby | Mobile Software Engineer",
  url: "https://elmaghraby-portfolio.vercel.app",
  role: "Mobile Software Engineer",
  email: "mahmoudelmaghraby515@gmail.com",
  linkedin: "https://www.linkedin.com/in/elmaghraby515/",
  github: "https://github.com/mahmoudelmaghraby",
  cv: "/Mahmoud-Elmaghraby-CV.pdf",
  availability: "Open for High-Impact Projects / SaaS Consulting",
} as const;

export const about =
  "I have 4+ years of experience in cross-platform and native mobile app development, specializing in architecting secure, high-performance Flutter applications for SaaS products, ERP systems, POS solutions, and E-commerce platforms.";

export const metrics = [
  { value: "99.9%", label: "Crash-Free Rate", pulse: true },
  { value: "4+", label: "Years Mobile Architecture", pulse: false },
  { value: "SaaS / ERP / POS", label: "Scalable Systems", pulse: false },
] as const;

export const architecture = [
  {
    id: "presentation",
    name: "Presentation",
    nodes: ["Flutter UI", "Cubit/BLOC", "Framer Motion"],
  },
  {
    id: "domain",
    name: "Domain",
    nodes: ["UseCases", "Entities", "Repository Interfaces"],
  },
  {
    id: "data",
    name: "Data",
    nodes: ["Dio (REST API)", "Hive (Offline Cache)", "SignalR/WebSockets"],
  },
] as const;

export const experience = [
  {
    role: "Flutter Software Engineer",
    company: "SIT",
    period: "08/2026 – Present",
    detail: "Current product engineering in Flutter.",
    current: true,
  },
  {
    role: "Flutter Software Engineer",
    company: "Sadara Investments",
    period: "02/2024 – 07/2026",
    detail: "Flutter engineering for investment products.",
    current: false,
  },
  {
    role: "Mobile Software Engineer",
    company: "IGS & Partners",
    period: "Partner projects",
    detail: "Mobile work delivered with partner teams.",
    current: false,
  },
  {
    role: "Software Engineer",
    company: "Defense Ministry",
    period: "11/2021 – 10/2023",
    detail: "Egyptian Armed Forces.",
    current: false,
  },
] as const;

export const projects = [
  {
    id: "family-park",
    title: "Family Park app",
    description: "Booking app using Clean Architecture, MVVM, and Cubit.",
    images: ["/images/family-park.jpeg", "/images/family-park-2.jpg", "/images/family-park-3.jpg"],
    appStore: "https://apps.apple.com/sa/app/id6737783001",
    playStore: "https://play.google.com/store/apps/details?id=com.sadara.familypark",
  },
  {
    id: "safi-mart",
    title: "Safi Mart app",
    description:
      "E-commerce platform with secure cart, payment gateway, and REST APIs via Dio.",
    images: ["/images/safi-mart.jpeg", "/images/safi-mart-2.jpg"],
    appStore: "https://apps.apple.com/sa/app/id6456607778",
    playStore: "https://play.google.com/store/apps/details?id=com.sadara.safi",
  },
  {
    id: "banzinty",
    title: "Banzinty App",
    description: "App with scan & pay and real-time WebSockets.",
    images: ["/images/banzinty.png"],
    appStore: null,
    playStore: "https://play.google.com/store/apps/details?id=com.sadara.banzintyapps",
  },
] as const;

export const mentorshipMetrics = [
  { mark: "🥇", value: "1st Place", label: "Winning Team Mentored" },
  { mark: "⭐", value: "86.67 / 100", label: "Facilitator NPS at CIC" },
  { mark: "👨‍⚖️", value: "Hackathon Judge", label: "Technical Evaluation" },
] as const;

export const mentorshipTags = ["Flutter", "BLoC", "Android Native", "Mentorship"] as const;

export const mentorshipFilters = [
  { id: "all", label: "All Photos" },
  { id: "judging", label: "Hackathon Judging" },
  { id: "wins", label: "Student Victories" },
  { id: "bootcamp", label: "Bootcamps" },
] as const;

export const mentorship = [
  {
    image: "/images/mentorship/competition-judge.jpeg",
    category: "judging",
    badge: "👨‍⚖️ Judge",
    alt: "Judging a student project at the Afro-Asian Forum",
    caption: "Evaluating innovative Flutter and mobile projects as competition judge",
    width: 2048,
    height: 1365,
  },
  {
    image: "/images/mentorship/competition-judge2.jpeg",
    category: "judging",
    badge: "👨‍⚖️ Judge",
    alt: "Hackathon judging session with student teams",
    caption: "Hackathon judging with student teams",
    width: 2048,
    height: 1365,
  },
  {
    image: "/images/mentorship/competition-judge3.jpeg",
    category: "judging",
    badge: "👨‍⚖️ Judge",
    alt: "Reviewing a student presentation during judging",
    caption: "Reviewing a student presentation",
    width: 2048,
    height: 1365,
  },
  {
    image: "/images/mentorship/competition-judge4.jpeg",
    category: "judging",
    badge: "👨‍⚖️ Judge",
    alt: "Technical evaluation at a coding competition",
    caption: "Technical evaluation at a coding competition",
    width: 1280,
    height: 853,
  },
  {
    image: "/images/mentorship/competition-judge5.jpeg",
    category: "judging",
    badge: "👨‍⚖️ Judge",
    alt: "Students presenting a project to the judging panel",
    caption: "Students presenting to the judging panel",
    width: 2048,
    height: 1365,
  },
  {
    image: "/images/mentorship/competition-judge6.jpeg",
    category: "judging",
    badge: "👨‍⚖️ Judge",
    alt: "Judging floor at the innovation forum",
    caption: "Judging floor at the innovation forum",
    width: 2048,
    height: 1365,
  },
  {
    image: "/images/mentorship/competition-judge7.jpeg",
    category: "judging",
    badge: "👨‍⚖️ Judge",
    alt: "Mentor reviewing student work during the competition",
    caption: "Mentor review during the competition",
    width: 1280,
    height: 853,
  },
  {
    image: "/images/mentorship/techno-space-win.jpeg",
    category: "wins",
    badge: "🥇 1st Place",
    alt: "Student team mentored to first place at Techno Space",
    caption: "Mentored student team securing 1st place in a programming competition",
    width: 1280,
    height: 853,
  },
  {
    image: "/images/mentorship/techno-space-win2.jpeg",
    category: "wins",
    badge: "🥇 1st Place",
    alt: "Winning student team after the programming competition",
    caption: "Winning student team after the programming competition",
    width: 2048,
    height: 1365,
  },
  {
    image: "/images/mentorship/techno-space-win3.jpeg",
    category: "wins",
    badge: "🥇 1st Place",
    alt: "Award moment for the mentored student team",
    caption: "Award moment for the mentored student team",
    width: 1280,
    height: 853,
  },
  {
    image: "/images/mentorship/cic-bootcamp.jpeg",
    category: "bootcamp",
    badge: "🎓 Instructor",
    alt: "Recognition for leading the Applied Flutter UI Development bootcamp at CIC",
    caption: "Applied Flutter UI Development bootcamp at CIC",
    width: 540,
    height: 1204,
  },
] as const;

export const navLinks = [
  { href: "#impact", label: "Impact" },
  { href: "#work", label: "Simulator" },
  { href: "#experience", label: "Path" },
  { href: "#mentorship", label: "Mentorship" },
  { href: "#architecture", label: "Architecture" },
  { href: "#contact", label: "Contact" },
] as const;
