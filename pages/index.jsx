import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import Avatar from "../components/Avatar";
import ScreenFrame from "../components/ScreenFrame";
import { aboutSummary } from "../data/about";
import { siteConfig } from "../data/siteConfig";
import { fadeIn } from "../variants";

const coreTools = ["Laravel", "React", "Inertia", "Tailwind", "MySQL", "Arduino"];
const consoleLines = ["build --responsive", "audit --ui/ux", "deploy --production"];

const Home = () => {
  return (
    <ScreenFrame
      className="home-page bg-primary/60"
      frameClassName="screen-home-frame home-full-frame text-center xl:text-left"
    >
      <div className="home-full-shell desktop-safe-container relative z-10 mx-auto grid w-full items-center gap-8 px-5 sm:px-6 xl:grid-cols-[minmax(0,0.94fr)_minmax(430px,0.9fr)] xl:gap-8 xl:px-0">
        <motion.section
          variants={fadeIn("right", 0.12)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="home-copy-field mx-auto flex w-full max-w-[760px] flex-col items-center xl:mx-0 xl:items-start"
          aria-labelledby="home-title"
        >
          <motion.div
            variants={fadeIn("down", 0.16)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="home-system-line mb-4 flex flex-wrap items-center justify-center gap-2 xl:justify-start"
          >
            <span className="home-live-dot" />
            <span>{siteConfig.role}</span>
            <span className="hidden text-white/25 sm:inline">{"//"}</span>
            <span className="hidden text-white/45 sm:inline">Portfolio interface online</span>
          </motion.div>

          <motion.h1
            id="home-title"
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1 home-main-title mx-auto mb-5 max-w-[900px] xl:mx-0"
          >
            Hi, I&apos;m {siteConfig.shortOwner}. <br /> I build <span>responsive</span> web systems.
          </motion.h1>

          <motion.div
            variants={fadeIn("up", 0.24)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="home-mobile-avatar-wrap relative z-10 mx-auto mb-5 flex w-[clamp(176px,52vw,320px)] xl:hidden"
          >
            <div className="home-mobile-explosion" />
            <Avatar priority sizes="(max-width: 768px) 320px, 52vw" className="relative z-10" />
          </motion.div>

          <motion.p
            variants={fadeIn("down", 0.28)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="home-intro mx-auto mb-6 max-w-[670px] px-1 text-sm leading-relaxed text-white/68 sm:text-base xl:mx-0 xl:px-0"
          >
            {aboutSummary}
          </motion.p>

          <motion.div
            variants={fadeIn("up", 0.32)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="home-actions mb-6 flex w-full flex-col justify-center gap-3 sm:flex-row xl:justify-start"
          >
            <Link href="/work" className="home-action home-action-primary">
              View projects
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="home-action home-action-secondary">
              Contact me
              <span aria-hidden="true">↗</span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.36)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="home-tool-stream flex w-full flex-wrap items-center justify-center gap-2 xl:justify-start"
            aria-label="Core tools"
          >
            {coreTools.map((tool, index) => (
              <span style={{ "--delay": `${index * 0.14}s` }} key={tool}>
                {tool}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="home-console-line mt-6 hidden w-full max-w-[620px] text-left md:block"
            aria-hidden="true"
          >
            {consoleLines.map((line) => (
              <p key={line}>
                <span>lexus_ji@portfolio:~$</span> npm run {line}
              </p>
            ))}
          </motion.div>
        </motion.section>

        <motion.aside
          variants={fadeIn("left", 0.34)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="home-avatar-field pointer-events-none relative hidden h-[min(74dvh,700px)] min-h-[440px] overflow-visible xl:block"
          aria-hidden="true"
        >
          <div className="home-explosion-layer">
            <Image
              src="/bg-explosion.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 660px, 80vw"
              className="home-explosion-image"
            />
          </div>
          <div className="home-energy-core" />
          <div className="home-energy-ring home-energy-ring-one" />
          <div className="home-energy-ring home-energy-ring-two" />
          <div className="home-energy-ring home-energy-ring-three" />
          <div className="home-scan-beam" />
          <div className="home-code-orbit home-code-orbit-one">LARAVEL</div>
          <div className="home-code-orbit home-code-orbit-two">REACT UI</div>
          <div className="home-code-orbit home-code-orbit-three">RFID SYSTEMS</div>
          <Avatar priority className="home-avatar-image absolute bottom-[-2%] left-1/2 z-10 w-[min(43vw,590px)] -translate-x-1/2" />
        </motion.aside>
      </div>
    </ScreenFrame>
  );
};

export default Home;
