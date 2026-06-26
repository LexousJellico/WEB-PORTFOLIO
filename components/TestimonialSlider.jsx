import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { testimonialData } from "../data/testimonials";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="highlight-swiper screen-card-height"
      aria-label="Portfolio highlights slider"
    >
      {testimonialData.map((person) => (
        <SwiperSlide key={person.name}>
          <article className="cyber-panel mx-auto flex h-full max-w-[980px] flex-col items-center justify-center gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] px-7 py-8 shadow-[0_0_55px_rgba(47,132,255,0.08)] backdrop-blur-md md:flex-row md:px-12">
            <div className="w-full max-w-[250px] shrink-0">
              <div className="flex flex-col justify-center text-center">
                <div className="mb-3 mx-auto overflow-hidden rounded-full border border-accent/25 bg-accent/10 p-1 shadow-[0_0_35px_rgba(241,48,36,0.12)]">
                  <Image
                    src={person.image}
                    width={92}
                    height={92}
                    alt={person.name}
                    className="rounded-full"
                  />
                </div>

                <h3 className="text-lg font-semibold">{person.name}</h3>
                <div className="text-[11px] uppercase font-extralight tracking-widest text-white/45">
                  {person.position}
                </div>
              </div>
            </div>

            <div className="relative flex flex-1 flex-col justify-center md:border-l md:border-white/10 md:pl-10">
              <div className="mb-4">
                <FaQuoteLeft
                  className="mx-auto text-4xl text-white/20 md:mx-0 xl:text-5xl"
                  aria-hidden="true"
                />
              </div>

              <p className="text-center text-sm text-white/70 sm:text-base md:text-left xl:text-lg">
                {person.message}
              </p>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
