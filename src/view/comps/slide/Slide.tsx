import { ReactElement } from "react";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

export function Slide({
  children,
  slides,
}: Readonly<{ children: ReactElement[]; slides?: number }>) {
  const options: SwiperProps = {};

  if (slides) options.slidesPerView = slides;

  return (
    <Swiper
      modules={[Scrollbar]}
      scrollbar={{
        hide: false,
      }}
      {...options}
    >
      {children.map((it) => (
        <SwiperSlide key={`swiper-slide-${it.key}`}>{it}</SwiperSlide>
      ))}
    </Swiper>
  );
}
