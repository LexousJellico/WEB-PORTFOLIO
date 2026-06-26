import { RxArrowTopRight } from "react-icons/rx";
import { FreeMode, Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { serviceData } from "../data/services";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ServiceSlider = () => {
  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between gap-3 text-left">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-accent/80">drag / wheel / swipe</p>
          <p className="text-xs text-white/45">Scroll left to right to explore the service cards.</p>
        </div>
        <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/50 sm:block">
          {serviceData.length} modules
        </div>
      </div>

      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1.08,
            spaceBetween: 14,
          },
          640: {
            slidesPerView: 2.05,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 2.35,
            spaceBetween: 18,
          },
          1280: {
            slidesPerView: 3.05,
            spaceBetween: 18,
          },
        }}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.8,
        }}
        grabCursor
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true }}
        navigation
        pagination={{ clickable: true }}
        modules={[FreeMode, Keyboard, Mousewheel, Navigation, Pagination]}
        className="service-swiper screen-card-height !overflow-visible pb-12"
        aria-label="Services slider"
      >
        {serviceData.map((item, index) => {
          const Icon = item.Icon;
          const level = item.level || 84 + index * 2;

          return (
            <SwiperSlide key={item.title} className="h-auto">
              <article className="cyber-panel group relative flex h-full min-h-[325px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(13,17,35,0.62)] p-5 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:bg-[rgba(65,47,123,0.25)] hover:shadow-[0_26px_80px_rgba(241,48,36,0.12)] sm:min-h-[350px] xl:min-h-[330px]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-20 -top-24 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
                </div>

                <div className="relative mb-5 flex items-center justify-between gap-3">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-3xl text-accent shadow-[0_0_35px_rgba(241,48,36,0.16)]">
                    <Icon aria-hidden="true" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/45">
                    Skill {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative text-[21px] font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-6 text-white/58">
                  {item.description}
                </p>

                <div className="relative mt-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/42">
                    <span>Service level</span>
                    <span>{level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent/60 via-white/70 to-accent shadow-[0_0_24px_rgba(241,48,36,0.45)] transition-all duration-700 group-hover:brightness-125"
                      style={{ width: `${level}%` }}
                    />
                  </div>
                </div>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {(item.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/52"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="relative mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors duration-300 group-hover:text-accent"
                  aria-label={`${item.title} service details`}
                >
                  View capability
                  <RxArrowTopRight className="text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ServiceSlider;
