import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { BsArrowRight, BsImages, BsX } from "react-icons/bs";
import { projectItems } from "../data/projects";

const modalBackdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalPanel = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.97 },
};

const cardMotion = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const ProjectInfoModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/72 px-4 py-6 backdrop-blur-xl"
          variants={modalBackdrop}
          initial="hidden"
          animate="show"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.article
            variants={modalPanel}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative flex max-h-[90vh] w-full max-w-[1080px] flex-col overflow-hidden rounded-[32px] border border-white/12 bg-[#080b18]/95 text-left shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-2xl text-white/80 transition hover:border-accent/60 hover:text-accent"
              aria-label="Close project details"
            >
              <BsX aria-hidden="true" />
            </button>

            <div className="relative grid min-h-0 gap-0 overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
                <Image
                  src={project.path}
                  alt={`${project.title} main preview`}
                  width={900}
                  height={980}
                  className="h-full min-h-[280px] w-full object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b18] via-[#080b18]/35 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-accent">{project.category}</p>
                  <h3 id="project-modal-title" className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/62">{project.role}</p>
                </div>
              </div>

              <div className="relative space-y-6 p-5 sm:p-7 lg:p-8">
                <div className="flex flex-wrap gap-2 pr-10">
                  {[project.status, project.tech, ...(project.tags || [])].filter(Boolean).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/58"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="text-base leading-7 text-white/72">{project.summary || project.description}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-accent/80">Problem</p>
                    <p className="text-sm leading-6 text-white/62">{project.challenge}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-accent/80">Solution</p>
                    <p className="text-sm leading-6 text-white/62">{project.solution}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-accent/80">Key project data</p>
                  <div className="grid gap-2">
                    {(project.highlights || []).map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_18px_rgba(241,48,36,0.8)]" />
                        <p className="text-sm leading-6 text-white/64">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-accent/80">More images</p>
                    <p className="text-[11px] text-white/38">Replace these later with real screenshots.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {(project.gallery || []).map((image, index) => (
                      <div key={`${image}-${index}`} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                        <Image
                          src={image}
                          alt={`${project.title} gallery placeholder ${index + 1}`}
                          width={320}
                          height={220}
                          className="h-24 w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-60" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const TestimonialSlider = () => {
  const [activeProject, setActiveProject] = useState(null);
  const featuredProjects = useMemo(() => projectItems, []);

  return (
    <>
      <div className="grid max-h-[62vh] gap-4 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3 xl:max-h-none xl:overflow-visible">
        {featuredProjects.map((project, index) => (
          <motion.button
            key={project.title}
            type="button"
            variants={cardMotion}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.28), ease: "easeOut" }}
            onClick={() => setActiveProject(project)}
            className="cyber-panel group relative min-h-[330px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] text-left outline-none transition duration-500 hover:-translate-y-2 hover:border-accent/50 hover:bg-white/[0.06] hover:shadow-[0_24px_80px_rgba(241,48,36,0.14)] focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40"
            aria-label={`Open more details about ${project.title}`}
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={project.path}
                alt={`${project.title} preview`}
                width={640}
                height={420}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b18] via-[#080b18]/35 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                {project.category}
              </div>
            </div>

            <div className="relative p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-[0.24em] text-accent/80">Project #{String(index + 1).padStart(2, "0")}</span>
                <BsImages className="text-xl text-white/35 transition-colors group-hover:text-accent" aria-hidden="true" />
              </div>

              <h3 className="text-xl font-semibold leading-tight text-white transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/38">{project.role}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/58">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {(project.tags || []).slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/48">
                    {tag}
                  </span>
                ))}
              </div>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/66 transition-colors group-hover:text-accent">
                Click for project data
                <BsArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <ProjectInfoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
};

export default TestimonialSlider;
