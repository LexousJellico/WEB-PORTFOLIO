export const siteConfig = {
  name: "Lexus Ji",
  owner: "Lexus",
  shortOwner: "Lexus Ji",
  role: "Aspiring Full-Stack Developer",
  location: "Baguio City, Philippines",
  phone: "0967-109-7419",
  email: "lexousmarc14@gmail.com",
  github: "https://github.com/lexousjellicomarc",
  linkedin: "https://www.linkedin.com/in/lexousmarc14",
  repository: "https://github.com/lexousjellicomarc/PORTFOLIO.git",
  siteUrl: "https://lexousjellicomarc.github.io",
  description:
    "Lexus_ji is the portfolio of Lexous Jellico Marc R. Español, an aspiring full-stack developer focused on responsive web interfaces, Laravel and React systems, UI/UX design, RFID-assisted projects, documentation, and production-ready web output.",
  keywords:
    "Lexus_ji, Lexous Jellico Marc R. Español, Lexous Marc, portfolio, aspiring full-stack developer, frontend developer, web developer, Laravel, React, Inertia JS, PHP, MySQL, Tailwind CSS, RFID, Arduino",
};

export const pageRoutes = [
  { path: "/", priority: "1.0", changeFrequency: "monthly" },
  { path: "/about", priority: "0.8", changeFrequency: "monthly" },
  { path: "/services", priority: "0.8", changeFrequency: "monthly" },
  { path: "/work", priority: "0.9", changeFrequency: "monthly" },
  { path: "/testimonials", priority: "0.6", changeFrequency: "yearly" },
  { path: "/contact", priority: "0.8", changeFrequency: "monthly" },
];

export const pageMetaByPath = {
  "/": {
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
  },
  "/about": {
    title: `About ${siteConfig.shortOwner} | ${siteConfig.name}`,
    description:
      "Learn about Lex's background, technical skills, internship experience, leadership involvement, and Websites and Robotics projects.",
  },
  "/services": {
    title: `Services | ${siteConfig.name}`,
    description:
      "Explore responsive web development, UI/UX design, Laravel and React system support, documentation, branding, and deployment polishing services from Lexus Ji.",
  },
  "/work": {
    title: `Work and Projects | ${siteConfig.name}`,
    description:
      "View selected projects by Lex, including PAYSADA, Itemaster Inventory and POS, HappyPaw, Fastyle, and inventory management systems.",
  },
  "/testimonials": {
    title: `Highlights | ${siteConfig.name}`,
    description:
      "Review portfolio highlights from Lexus_ji, including frontend internship experience, web and RFID-assisted projects, leadership, support work, and documentation.",
  },
  "/contact": {
    title: `Contact | ${siteConfig.name}`,
    description:
      "Contact Lexous Marc for web development, UI/UX design, system polishing, documentation, and deployment support inquiries.",
  },
  "/404": {
    title: `Page Not Found | ${siteConfig.name}`,
    description: "The requested portfolio page could not be found.",
    robots: "noindex, nofollow",
  },
  "/500": {
    title: `Server Error | ${siteConfig.name}`,
    description: "The portfolio page could not be loaded because of a server error.",
    robots: "noindex, nofollow",
  },
};

export const getBaseUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl).replace(/\/$/, "");
