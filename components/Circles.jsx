import Image from "next/image";

const Circles = () => {
  return (
    <div
      className="w-[200px] xl:w-[300px] absolute -right-16 -bottom-2 mix-blend-color-dodge animate-pulse duration-75 z-10 pointer-events-none select-none"
      aria-hidden="true"
    >
      <Image
        src="/circles.png"
        alt=""
        width={300}
        height={182}
        className="w-full h-full"
        sizes="(min-width: 1200px) 300px, 200px"
      />
    </div>
  );
};

export default Circles;
