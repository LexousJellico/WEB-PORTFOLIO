import Image from "next/image";
import Link from "next/link";

import Socials from "../components/Socials";
import { siteConfig } from "../data/siteConfig";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-40 w-full px-5 pt-[env(safe-area-inset-top)] sm:px-8 xl:px-0">
      <div className="container mx-auto">
        <div className="mt-3 flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/15 px-3 py-3 shadow-[0_0_35px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-4 xl:h-[76px] xl:py-0">
          <Link
            href="/"
            aria-label="Go to home page"
            className="group inline-flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(241,48,36,0.18)] sm:h-12 sm:w-12">
              <Image
                src="/logo-mark.webp"
                alt=""
                fill
                priority
                sizes="48px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block text-xl font-semibold tracking-wide text-white">
                {siteConfig.name}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-white/45">
                Portfolio
              </span>
            </span>
          </Link>

          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
