import CircuitBackdrop from "./CircuitBackdrop";
import CodeRain from "./CodeRain";

const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(241,48,36,0.14),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(39,122,255,0.14),transparent_30%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.05),transparent_30%)]" />
      <div className="digital-grid absolute inset-0 opacity-[0.18]" />
      <span className="aurora-orb aurora-orb-red left-[-8rem] top-[12%] h-64 w-64 sm:h-80 sm:w-80" />
      <span className="aurora-orb aurora-orb-blue right-[-9rem] top-[8%] h-72 w-72 sm:h-96 sm:w-96" />
      <span className="aurora-orb aurora-orb-white bottom-[-12rem] left-[35%] h-72 w-72 sm:h-[28rem] sm:w-[28rem]" />
      <div className="scanline absolute inset-0" />
      <CodeRain />
      <CircuitBackdrop />
      <div className="hex-grid absolute inset-0 opacity-[0.12]" />
      <div className="background-noise absolute inset-0" />
    </div>
  );
};

export default AnimatedBackground;
