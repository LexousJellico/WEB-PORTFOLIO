import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const particleOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  detectRetina: true,
  interactivity: {
    events: {
      onClick: { enable: false },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: { enable: true },
    },
    modes: {
      repulse: {
        distance: 180,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: { value: "#e68e2e" },
    links: {
      color: "#f5d393",
      distance: 150,
      enable: true,
      opacity: 0.45,
      width: 1,
    },
    collisions: { enable: true },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: { enable: true },
      value: 70,
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 5 } },
  },
};

const ParticlesContainer = () => {
  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        className="absolute inset-0 translate-z-0"
        id="tsparticles"
        options={particleOptions}
      />
    </ParticlesProvider>
  );
};

export default ParticlesContainer;
