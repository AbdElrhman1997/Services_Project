import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import SwiperCore, { Keyboard, Mousewheel } from "swiper/core";
import { Navigation, Scrollbar, A11y, EffectFade, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Carousel.css";

const Carousel = ({ sponsers }) => {
  const swiper = useSwiper();

  return (
    <section className="category container">
      {/* <Swiper
        // install Swiper modules
        className="Swiper text-center"
        modules={[Navigation, Scrollbar, A11y, EffectFade, Grid]}
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 540,
            slidesPerView: 1,
          },
          // when window width is >= 768px

          768: {
            width: 768,
            slidesPerView: 2,
          },

          1024: {
            width: 1024,
            slidesPerView: 3,
          },
        }}
        spaceBetween={40}
        keyboard={true}
        mousewheel={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        grabCursor={false}
        speed={200}
        navigation={true}
        // onMouseEnter={() => {
        //   this.scrollbar.hide = false;
        // }}
      >
        <button onClick={() => swiper.slidePrev()}></button>
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <CarouselItem
              imgSrc={slide.imgSrc}
              name={slide.name}
              count={slide.count}
            />
          </SwiperSlide>
        ))}
        <button onClick={() => swiper.slideNext()}></button>
      </Swiper> */}
      <Swiper
        spaceBetween={50}
        keyboard={true}
        mousewheel={true}
        className="Swiper"
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
      >
        <button
          onClick={() => swiper.slidePrev()}
          className="swiper-button-prev"
        ></button>
        {sponsers.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="category-img">
              <img
                src={slide?.imgSrc}
                className="swiper-img lg:w-32 md:w-48 w-40 mx-auto"
                alt={`image ${slide?.name}`}
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next-container">
          <button
            onClick={() => swiper.slideNext()}
            className="swiper-button-next"
          ></button>
        </div>
      </Swiper>
    </section>
  );
};

export default Carousel;
