import Link from "next/link";
import { useRouter } from "next/router";

import {
  HiChatBubbleBottomCenterText,
  HiEnvelope,
  HiHome,
  HiRectangleGroup,
  HiUser,
  HiViewColumns,
} from "react-icons/hi2";

export const navData = [
  { name: "home", path: "/", Icon: HiHome },
  { name: "about", path: "/about", Icon: HiUser },
  { name: "services", path: "/services", Icon: HiRectangleGroup },
  { name: "work", path: "/work", Icon: HiViewColumns },
  {
    name: "highlights",
    path: "/testimonials",
    Icon: HiChatBubbleBottomCenterText,
  },
  {
    name: "contact",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

const Nav = () => {
  const { pathname } = useRouter();

  return (
    <nav className="nav-rail fixed z-50" aria-label="Primary navigation">
      <div className="nav-shell flex items-center justify-between xl:flex-col xl:justify-center xl:gap-y-8">
        {navData.map((link) => {
          const isActive = link.path === pathname;

          return (
            <Link
              className={`nav-link group ${isActive ? "is-active text-accent" : "text-white/65"}`}
              href={link.path}
              key={link.path}
              aria-label={`Go to ${link.name} page`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="nav-link-orbit" aria-hidden="true" />
              <link.Icon className="relative z-10" aria-hidden="true" />

              <span className="nav-tooltip" role="tooltip">
                <span className="nav-tooltip-card">{link.name}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
