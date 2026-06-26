import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const glowElement = glowRef.current;

    if (!glowElement || window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    let frameId = 0;
    let nextX = 50;
    let nextY = 50;

    const updatePosition = () => {
      frameId = 0;
      glowElement.style.setProperty("--cursor-x", `${nextX}%`);
      glowElement.style.setProperty("--cursor-y", `${nextY}%`);
    };

    const handlePointerMove = (event) => {
      nextX = (event.clientX / window.innerWidth) * 100;
      nextY = (event.clientY / window.innerHeight) * 100;

      if (!frameId) {
        frameId = window.requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow pointer-events-none fixed inset-0 z-[1] hidden xl:block"
      aria-hidden="true"
    />
  );
};

export default CursorGlow;
