import { siteConfig } from "../data/siteConfig";

const skills = [
  "Laravel",
  "React",
  "Inertia JS",
  "Tailwind CSS",
  "JavaScript",
  "PHP",
  "MySQL",
  "Arduino",
  "RFID",
  "UI/UX",
];

const SkillTicker = () => {
  const tickerItems = [...skills, ...skills];

  return (
    <div
      className="relative mx-auto mt-2 w-full max-w-[680px] overflow-hidden rounded-full border border-white/10 bg-white/[0.035] py-3 shadow-[0_0_30px_rgba(241,48,36,0.08)] backdrop-blur-sm xl:mx-0"
      aria-label={`${siteConfig.shortOwner} technical skills`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-primary to-transparent" />
      <div className="skill-ticker flex w-max items-center gap-3 whitespace-nowrap px-4 text-[10px] uppercase tracking-[0.24em] text-white/55 sm:text-xs">
        {tickerItems.map((skill, index) => (
          <span
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2"
            key={`${skill}-${index}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(241,48,36,0.85)]" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillTicker;
