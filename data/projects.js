import { siteConfig } from "./siteConfig";

export const projectSlides = [
  {
    images: [
      {
        title: "PAYSADA",
        role: "Developer & Designer",
        category: "Fare Collection and Tracking System",
        tech: "Laravel, Arduino, RFID, GPS",
        tags: ["RFID", "Fare Tracking", "Hardware Integration", "GPS Tracking", "Database Management", "Web Interface", "User Authentication", "Payment Processing", "Data Analytics"],
        description: "Automated jeepney fare collection and tracking system with RFID tap-in/tap-out, passenger fare workflows, and hardware-assisted tracking.",
        path: "/thumb2.jpg",
        link: siteConfig.github,
      },
      {
        title: "Itemaster Inventory & POS",
        role: "Frontend Developer",
        category: "Inventory and Point-of-Sale System",
        tech: "Laravel, React, Inertia, Tailwind",
        tags: ["Inventory", "POS", "Cost Tracking"],
        description: "Inventory and point-of-sale module for stock levels, item costs, pricing accuracy, and cleaner business record workflows.",
        path: "/thumb1.jpg",
        link: siteConfig.github,
      },
      {
        title: "Baguio Convention & Cultural Center Events Access & Scheduling Engine (BCCC EASE)",
        role: "Developer & Designer",
        category: "Event Management System",
        tech: "PHP, JavaScript, Laravel, Typescript, Tailwind CSS",
        tags: ["Event Management", "Scheduling", "Access Control"],
        description: "Event management system for accessing and scheduling events at the Baguio Convention & Cultural Center.",
        path: "/thumb3.jpg",
        link: siteConfig.github,
      },
      {
        title: "HappyPaw Pet Products",
        role: "Developer & Designer",
        category: "E-Commerce Website",
        tech: "HTML, CSS, JavaScript, Laravel",
        tags: ["E-Commerce", "Cart", "Orders"],
        description: "Pet products e-commerce website with responsive listings, cart features, order management basics, and a friendly shopping experience.",
        path: "/thumb3.jpg",
        link: siteConfig.github,
      },
      {
        title: "Fastyle Fashion Store",
        role: "Developer & Designer",
        category: "E-Commerce Website",
        tech: "HTML, CSS, JavaScript, Laravel",
        tags: ["Catalog", "Shopping Flow", "Mobile UI"],
        description: "Fashion e-commerce interface with product catalog, shopping cart, attractive visuals, and mobile-friendly shopping flow.",
        path: "/thumb4.jpg",
        link: siteConfig.github,
      },
    ],
  },
  ,
];

export const projectItems = projectSlides.flatMap((slide) => slide.images);
