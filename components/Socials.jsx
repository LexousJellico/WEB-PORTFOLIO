import Link from "next/link";

import { socialData } from "../data/socials";

const isExternalUrl = (href) => /^https?:\/\//i.test(href);

const Socials = () => {
  return (
    <nav aria-label="Social links">
      <ul className="flex items-center gap-x-3 text-base sm:gap-x-5 sm:text-lg">
        {socialData.map((social) => {
          const external = isExternalUrl(social.link);

          return (
            <li key={social.name}>
              <Link
                title={social.name}
                href={social.link}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                aria-label={social.name}
                className={`${
                  social.name === "GitHub"
                    ? "bg-accent rounded-full p-[5px] shadow-[0_0_18px_rgba(241,48,36,0.25)] hover:text-white"
                    : "hover:text-accent"
                } inline-flex rounded-full transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
              >
                <social.Icon aria-hidden="true" />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Socials;
