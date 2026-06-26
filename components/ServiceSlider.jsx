import { RxArrowTopRight } from "react-icons/rx";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { serviceData } from "../data/services";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 14,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 14,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 14,
        },
      }}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      freeMode
      className="service-swiper screen-card-height pb-10"
      aria-label="Services slider"
    >
      {serviceData.map((item, index) => (
        <SwiperSlide key={item.title} className="h-auto">
          <article className="cyber-panel group flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(13,17,35,0.58)] px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(65,47,123,0.22)] sm:min-h-[320px] xl:min-h-0">
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-3xl text-accent shadow-[0_0_35px_rgba(241,48,36,0.16)]">
                <item.Icon aria-hidden="true" />
              </div>
              <span className="game-chip px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/45">
                Skill {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mb-5">
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="max-w-[350px] text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-auto space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/35">
                  <span>Power level</span>
                  <span>{82 + index * 3}%</span>
                </div>
                <div className="stat-meter" style={{ "--meter-value": String(0.82 + index * 0.03) }} />
              </div>

              <div className="flex items-center justify-between text-3xl" aria-hidden="true">
                <span className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                  Unlock
                </span>
                <RxArrowTopRight className="transition-all duration-300 group-hover:rotate-45 group-hover:text-accent" />
              </div>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
