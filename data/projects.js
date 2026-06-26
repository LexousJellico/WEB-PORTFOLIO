import { siteConfig } from "./siteConfig";

const placeholderGallery = ["/thumb1.jpg", "/thumb2.jpg", "/thumb3.jpg", "/thumb4.jpg"];

export const projectSlides = [
  {
    images: [
      {
        title: "PAYSADA",
        role: "Developer & Designer",
        category: "Capstone System",
        tech: "Laravel, Arduino, RFID, GPS",
        tags: ["RFID", "Fare Tracking", "Responsive UI"],
        description:
          "Automated jeepney fare collection and tracking system with RFID tap-in/tap-out, passenger fare workflows, and hardware-assisted tracking.",
        summary:
          "PAYSADA focuses on modernizing jeepney fare collection by combining RFID card detection, balance handling, fare computation, travel records, and web-based monitoring.",
        challenge:
          "The main challenge was making the system understandable for passengers, drivers, and admins while keeping the tap flow simple and reliable.",
        solution:
          "The workflow was designed around clear tap states, card validation, balance updates, transaction history, and visual feedback for hardware and web users.",
        highlights: [
          "RFID card registration and fare deduction workflow",
          "Tap-in and tap-out logic for travel sessions",
          "Passenger category support for regular, student, senior, and PWD fares",
          "Web-based monitoring concept for balances and transaction records",
        ],
        gallery: ["/thumb2.jpg", "/thumb1.jpg", "/thumb3.jpg", "/thumb4.jpg"],
        status: "Prototype / Capstone",
        path: "/thumb2.jpg",
        link: siteConfig.github,
      },
      {
        title: "Itemaster Inventory & POS",
        role: "Developer Intern",
        category: "Internship Project",
        tech: "Laravel, React, Inertia, Tailwind",
        tags: ["Inventory", "POS", "Cost Tracking"],
        description:
          "Inventory and point-of-sale module for stock levels, item costs, pricing accuracy, and cleaner business record workflows.",
        summary:
          "Itemaster is an inventory and POS-focused system built to make stock movement, pricing, and business records easier to manage.",
        challenge:
          "Inventory screens need to stay clear even when there are many items, prices, categories, and transaction records.",
        solution:
          "The interface was structured around usable tables, cleaner forms, item-cost visibility, and consistent admin workflows.",
        highlights: [
          "Inventory item monitoring and pricing support",
          "POS-oriented workflow for business transactions",
          "Cleaner data organization for admin users",
          "Responsive Laravel + React interface patterns",
        ],
        gallery: ["/thumb1.jpg", "/thumb2.jpg", "/thumb4.jpg", "/thumb3.jpg"],
        status: "Internship Build",
        path: "/thumb1.jpg",
        link: siteConfig.github,
      },
      {
        title: "HappyPaw E-Commerce",
        role: "Developer & Designer",
        category: "WebDev Project",
        tech: "HTML, CSS, JavaScript, Laravel",
        tags: ["E-Commerce", "Cart", "Orders"],
        description:
          "Pet products e-commerce website with responsive listings, cart features, order management basics, and a friendly shopping experience.",
        summary:
          "HappyPaw presents pet products in a friendly e-commerce flow with product browsing, cart actions, and order-centered interface planning.",
        challenge:
          "The project needed a friendly look while keeping common store actions easy to find and use.",
        solution:
          "The layout was designed around product cards, responsive sections, clear calls-to-action, and simple shopping flow organization.",
        highlights: [
          "Responsive product listing screens",
          "Shopping cart and order-flow concept",
          "Friendly visual direction for pet products",
          "Laravel-ready structure for future backend expansion",
        ],
        gallery: ["/thumb3.jpg", "/thumb4.jpg", "/thumb1.jpg", "/thumb2.jpg"],
        status: "WebDev Project",
        path: "/thumb3.jpg",
        link: siteConfig.github,
      },
      {
        title: "Fastyle Fashion Store",
        role: "Developer & Designer",
        category: "Client Project",
        tech: "HTML, CSS, JavaScript, Laravel",
        tags: ["Catalog", "Shopping Flow", "Mobile UI"],
        description:
          "Fashion e-commerce interface with product catalog, shopping cart, attractive visuals, and mobile-friendly shopping flow.",
        summary:
          "Fastyle is a fashion-store interface focused on product discovery, visual appeal, and a smooth catalog-to-cart experience.",
        challenge:
          "Fashion pages must feel visual and stylish without making the shopping flow confusing.",
        solution:
          "The design used stronger product cards, clear spacing, mobile-friendly browsing, and direct action buttons.",
        highlights: [
          "Fashion catalog interface",
          "Mobile-friendly product browsing",
          "Shopping flow and cart concept",
          "Visual product-card layout",
        ],
        gallery: ["/thumb4.jpg", "/thumb3.jpg", "/thumb2.jpg", "/thumb1.jpg"],
        status: "Client Project",
        path: "/thumb4.jpg",
        link: siteConfig.github,
      },
    ],
  },
  {
    images: [
      {
        title: "Inventory Management System",
        role: "Developer & Designer",
        category: "WebDev Project",
        tech: "HTML, CSS, JavaScript, Laravel",
        tags: ["Stock Control", "Filtering", "Admin UI"],
        description:
          "Responsive inventory web interface for viewing, tracking, filtering, and managing product stocks with a clean UI/UX flow.",
        summary:
          "This inventory system highlights stock management, filtering, item organization, and admin-friendly views for easier record handling.",
        challenge:
          "Inventory data can become crowded when tables, filters, and item actions are not arranged properly.",
        solution:
          "The interface was planned with cleaner table sections, usable filters, and responsive admin controls.",
        highlights: [
          "Stock list and item-management workflow",
          "Filtering and search-ready layout",
          "Admin-focused responsive interface",
          "Clean data presentation for faster checking",
        ],
        gallery: ["/thumb1.jpg", "/thumb4.jpg", "/thumb2.jpg", "/thumb3.jpg"],
        status: "WebDev Project",
        path: "/thumb1.jpg",
        link: siteConfig.github,
      },
      {
        title: "Portfolio Website",
        role: "Personal Portfolio Template",
        category: "Portfolio Build",
        tech: "Next.js, React, Tailwind CSS",
        tags: ["SEO", "Animations", "Contact API"],
        description:
          "Animated responsive portfolio with SEO assets, email-ready contact API, route checks, loading screen, project highlights, and reusable profile data.",
        summary:
          "This portfolio is designed as a polished personal brand website with game-inspired visuals, responsive pages, project storytelling, and a working contact channel.",
        challenge:
          "The design needed to stay cool and animated without breaking readability, responsiveness, or production build quality.",
        solution:
          "The portfolio uses reusable data files, motion components, screen-fit layouts, SEO support, and controlled project modals for expandable details.",
        highlights: [
          "Next.js portfolio with reusable content files",
          "Animated cyber/game-inspired visual system",
          "SMTP-backed contact form for direct email delivery",
          "Clickable project highlight cards with modal details",
        ],
        gallery: ["/thumb3.jpg", "/thumb1.jpg", "/thumb2.jpg", "/thumb4.jpg"],
        status: "Live Portfolio",
        path: "/thumb3.jpg",
        link: siteConfig.repository,
      },
      {
        title: "Digital Marketing Web Support",
        role: "Digital Marketing Assistant",
        category: "Work Experience",
        tech: "SEO, Website Design, Branding",
        tags: ["SEO", "Branding", "Content"],
        description:
          "Website content, SEO marketing, branding, and logo support while working with a web development team.",
        summary:
          "This experience highlights practical web support, content polishing, branding assistance, and SEO-oriented website improvements.",
        challenge:
          "Marketing pages need clear content, consistent visuals, and technical structure that supports discoverability.",
        solution:
          "Support work focused on improving page content, visual consistency, branding elements, and basic SEO readiness.",
        highlights: [
          "Website content polishing",
          "SEO and branding support",
          "Logo and visual improvement assistance",
          "Collaboration with a development team",
        ],
        gallery: ["/thumb4.jpg", "/thumb2.jpg", "/thumb3.jpg", "/thumb1.jpg"],
        status: "Work Experience",
        path: "/thumb4.jpg",
        link: siteConfig.github,
      },
      {
        title: "Admin and Portal Support",
        role: "MIS Assistant",
        category: "Work Experience",
        tech: "Web Portals, Admin Accounts, Networking",
        tags: ["Portals", "Admin", "Networking"],
        description:
          "Support for websites, portals, admin accounts, paperwork, and networking-related tasks in a management information system setting.",
        summary:
          "This support experience covers admin account handling, portal assistance, paperwork support, website coordination, and technical troubleshooting tasks.",
        challenge:
          "MIS support requires accuracy, patience, and organized handling of admin requests and technical concerns.",
        solution:
          "The work focused on dependable assistance, clear task handling, and organized support for web portals and office systems.",
        highlights: [
          "Admin account and portal assistance",
          "Website and system support tasks",
          "Technical troubleshooting and coordination",
          "Office paperwork and documentation support",
        ],
        gallery: ["/thumb2.jpg", "/thumb1.jpg", "/thumb4.jpg", "/thumb3.jpg"],
        status: "Work Experience",
        path: "/thumb2.jpg",
        link: siteConfig.github,
      },
    ],
  },
];

export const projectItems = projectSlides.flatMap((slide) =>
  slide.images.map((project) => ({
    ...project,
    gallery: project.gallery?.length ? project.gallery : placeholderGallery,
  })),
);
