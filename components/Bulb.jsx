import Image from "next/image";

const Bulb = () => {
  return (
    <div
      className="absolute -left-36 -bottom-12 rotate-12 mix-blend-color-dodge animate-pulse duration-75 z-10 w-[200px] xl:w-[260px] select-none pointer-events-none"
      aria-hidden="true"
    >
      <Image
        src="/bulb.png"
        alt=""
        width={260}
        height={200}
        className="w-full h-full"
        sizes="(min-width: 1200px) 260px, 200px"
      />
    </div>
  );
};

export default Bulb;
