import Image from "next/image";

const TopLeftImg = () => {
  return (
    <div
      className="absolute left-0 top-0 mix-blend-color-dodge z-10 w-[200px] xl:w-[400px] opacity-50 pointer-events-none select-none"
      aria-hidden="true"
    >
      <Image
        src="/top-left-img.png"
        alt=""
        width={400}
        height={400}
        sizes="(min-width: 1200px) 400px, 200px"
      />
    </div>
  );
};

export default TopLeftImg;
