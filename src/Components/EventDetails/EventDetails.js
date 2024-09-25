import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Scrollbar, A11y, EffectFade, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./EventDetails.css";

const EventDetails = ({ sponsers }) => {
  const swiper = useSwiper();

  const EventDetails = [
    { title: "جهة المشاركة", count: "66+" },
    { title: "ورشة العمل", count: "13+" },
    { title: "متحدث", count: "50+" },
    { title: "جهة المشاركة", count: "66+" },
    { title: "ورشة العمل", count: "13+" },
    { title: "متحدث", count: "50+" },
  ];

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
        keyboard={true}
        mousewheel={true}
        className="Swiper"
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        grabCursor={true}
      >
        {EventDetails.map((item, i) => (
          <SwiperSlide
            key={i}
            style={{
              color:
                item?.count == "66+"
                  ? "#4aa6d3"
                  : item?.count == "13+"
                  ? "#319694"
                  : item?.count == "50+"
                  ? "#808080"
                  : "",
              textAlign: "center",
            }}
          >
            <div className="text-7xl font-semibold">{item?.count}</div>
            <div className="text-xl mt-3 tracking-wide">{item?.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default EventDetails;
