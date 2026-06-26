import Image from "next/image";

const Avatar = ({ className = "", priority = false, sizes = "(min-width: 1280px) 560px, 74vw" }) => {
  return (
    <div
      className={`pointer-events-none select-none ${className}`.trim()}
      aria-hidden="true"
    >
      <Image
        src="/api/avatar"
        alt=""
        width={737}
        height={678}
        className="translate-z-0 h-auto w-full object-contain drop-shadow-[0_36px_90px_rgba(241,48,36,0.22)]"
        priority={priority}
        sizes={sizes}
        unoptimized
      />
    </div>
  );
};

export default Avatar;
