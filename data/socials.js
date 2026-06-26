import {
  RiGithubLine,
  RiLinkedinLine,
  RiMailLine,
  RiFacebookLine,
  RiInstagramLine,
} from "react-icons/ri";

import { siteConfig } from "./siteConfig";

export const socialData = [
  {
    name: "GitHub",
    link: siteConfig.github,
    Icon: RiGithubLine,
  },
  {
    name: "Facebook",
    link: siteConfig.facebook,
    Icon: RiFacebookLine,
  },
  {
    name: "Instagram",
    link: siteConfig.instagram,
    Icon: RiInstagramLine,
  },
  {
    name: "LinkedIn",
    link: siteConfig.linkedin,
    Icon: RiLinkedinLine,
  },
  {
    name: "Email",
    link: `mailto:${siteConfig.email}`,
    Icon: RiMailLine,
  },
];
