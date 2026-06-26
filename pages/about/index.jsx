import { motion } from "framer-motion";
import { useRef, useState } from "react";
import CountUp from "react-countup";

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import ScreenFrame from "../../components/ScreenFrame";
import { aboutData, aboutSummary, statsData } from "../../data/about";
import { fadeIn } from "../../variants";

const getPreviousIndex = (currentIndex) =>
  currentIndex === 0 ? aboutData.length - 1 : currentIndex - 1;

const getNextIndex = (currentIndex) =>
  currentIndex === aboutData.length - 1 ? 0 : currentIndex + 1;

const getStableTabId = (item, itemIndex) => {
  if (item.id) {
    return item.id;
  }

  const fallbackId = item.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return fallbackId || `tab-${itemIndex}`;
};

const About = () => {
  const [index, setIndex] = useState(0);
  const tabRefs = useRef([]);

  const selectTab = (nextIndex, shouldFocus = false) => {
    setIndex(nextIndex);

    if (shouldFocus) {
      requestAnimationFrame(() => {
        tabRefs.current[nextIndex]?.focus();
      });
    }
  };

  const handleTabKeyDown = (event) => {
    const keyActions = {
      ArrowLeft: () => getPreviousIndex(index),
      ArrowRight: () => getNextIndex(index),
      Home: () => 0,
      End: () => aboutData.length - 1,
    };

    const getNextTabIndex = keyActions[event.key];

    if (!getNextTabIndex) {
      return;
    }

    event.preventDefault();
    selectTab(getNextTabIndex(), true);
  };

  const activeTabId = getStableTabId(aboutData[index], index);

  return (
    <ScreenFrame className="bg-primary/30" frameClassName="text-center xl:text-left">
      <Circles />

      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="pointer-events-none hidden xl:absolute xl:bottom-[-8%] xl:-left-[360px] xl:flex"
      >
        <Avatar className="w-[min(48vw,690px)]" />
      </motion.div>

      <div className="container desktop-safe-container relative z-10 mx-auto grid w-full items-center gap-6 px-5 sm:px-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(520px,1fr)] xl:gap-10 xl:px-0">
        <div className="mx-auto flex max-w-[650px] flex-col justify-center xl:mx-0">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 mb-3"
          >
            Building <span className="text-accent">functional</span> systems
            with clean design.
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="mx-auto mb-4 max-w-[620px] px-2 text-sm sm:text-base xl:mx-0 xl:px-0"
          >
            {aboutSummary}
          </motion.p>

          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            animate="show"
            className="mx-auto mb-4 flex w-[clamp(140px,38vw,230px)] xl:hidden"
          >
            <Avatar sizes="230px" />
          </motion.div>

          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="about-stat-grid mx-auto grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4 xl:mx-0 xl:max-w-none"
          >
            {statsData.map((stat) => (
              <div
                className="cyber-panel rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center backdrop-blur-sm xl:text-left"
                key={stat.label}
              >
                <div className="mb-1 text-2xl font-extrabold text-accent xl:text-3xl">
                  <CountUp start={0} end={stat.value} duration={4} />
                  {stat.suffix || ""}
                </div>
                <div className="mx-auto max-w-[120px] text-[10px] uppercase leading-[1.4] tracking-[1px] text-white/70 xl:mx-0">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="screen-card-height flex w-full flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-4 shadow-[0_0_45px_rgba(47,132,255,0.06)] backdrop-blur-md sm:p-5 xl:p-6"
        >
          <div
            className="portfolio-scrollbar mx-auto mb-4 flex max-w-full gap-x-4 gap-y-3 overflow-x-auto pb-2 xl:mx-0 xl:justify-start"
            role="tablist"
            aria-label="About information tabs"
            onKeyDown={handleTabKeyDown}
          >
            {aboutData.map((item, itemIndex) => {
              const isActive = index === itemIndex;
              const stableTabId = getStableTabId(item, itemIndex);
              const tabId = `about-tab-${stableTabId}`;
              const panelId = `about-panel-${stableTabId}`;

              return (
                <button
                  key={item.title}
                  id={tabId}
                  ref={(element) => {
                    tabRefs.current[itemIndex] = element;
                  }}
                  type="button"
                  className={`${
                    isActive
                      ? "border-accent/60 bg-accent/10 text-accent"
                      : "border-white/10 bg-white/[0.035] text-white/55 hover:text-white"
                  } game-chip shrink-0 px-4 py-2 text-sm capitalize transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
                  onClick={() => selectTab(itemIndex)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          <div
            id={`about-panel-${activeTabId}`}
            className="portfolio-scrollbar flex flex-1 flex-col items-center gap-y-3 overflow-y-auto pr-1 xl:items-start"
            role="tabpanel"
            aria-labelledby={`about-tab-${activeTabId}`}
          >
            {aboutData[index].info.map((item) => (
              <div
                key={`${item.title}-${item.stage || "icons"}`}
                className="cyber-panel flex w-full flex-col items-center gap-2 rounded-2xl border border-white/10 bg-primary/20 p-4 text-center text-white/65 md:flex-row md:items-start md:text-left"
              >
                <div className="min-w-[180px] font-medium text-white/85">
                  {item.title}
                </div>
                {item.stage && <div className="hidden text-white/30 md:flex">-</div>}
                {item.stage && <div className="flex-1 text-sm leading-relaxed">{item.stage}</div>}

                {item.icons && (
                  <div className="flex flex-wrap justify-center gap-3 md:max-w-[220px] md:justify-end xl:max-w-none">
                    {item.icons.map((Icon, iconIndex) => (
                      <div key={iconIndex} className="text-xl text-white sm:text-2xl">
                        <Icon aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </ScreenFrame>
  );
};

export default About;
