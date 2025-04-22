import TextAnimation from "@/components/animation/textAnimation/textAnimation";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import category1 from "@/assets/LandingPage/CategorySection/category1.svg";
import category2 from "@/assets/LandingPage/CategorySection/category2.svg";
import category3 from "@/assets/LandingPage/CategorySection/category3.svg";
import category4 from "@/assets/LandingPage/CategorySection/category4.svg";
import category5 from "@/assets/LandingPage/CategorySection/category5.svg";
import category6 from "@/assets/LandingPage/CategorySection/category6.svg";
import category7 from "@/assets/LandingPage/CategorySection/category7.svg";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategorySection() {
  const swiperRef = useRef<SwiperRef>(null);

  const categories = [
    { icon: category1, title: "Diagnostic Equipment" },
    { icon: category2, title: "Surgical Instrument" },
    { icon: category3, title: "Patient Monitoring " },
    { icon: category4, title: "Imaging Systems" },
    { icon: category5, title: "Laboratory Equipment" },
    { icon: category6, title: "Dental Equipment" },
    { icon: category7, title: "Physiotherapy" },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6 py-24">
      <div className="flex flex-col items-start justify-start">
        <div className="flex justify-between items-center w-full mb-16">
          <section className="flex flex-col items-start justify-start">
            <TextAnimation
              text="Our Facilities"
              type="fadeIn"
              delay={0.2}
              className="text-sm md:text-base font-primary text-secondary font-bold "
            />
            <TextAnimation
              text="Tailored for your speciality"
              type="slideUp"
              delay={0.4}
              duration={0.7}
              className="text-xl  md:text-3xl font-secondary leading-tight font-light text-black block"
            />
          </section>
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                className="w-14 h-14 rounded-full border border-black flex items-center justify-center transition-all hover:bg-secondary hover:border-secondary group"
              >
                <ChevronLeft className="w-8 h-8 text-black group-hover:text-white" />
              </button>
              <button
                onClick={() => swiperRef.current?.swiper.slideNext()}
                className="w-14 h-14 rounded-full border border-black flex items-center justify-center transition-all hover:bg-secondary hover:border-secondary group"
              >
                <ChevronRight className="w-8 h-8 text-black group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        <section className="w-full mt-8 mb-12  ">
          <Swiper
            ref={swiperRef}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
            className="w-full h-full"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index} className="pb-4 pt-8 h-80">
                <div className="flex flex-col items-center group h-full">
                  <div className="w-44 h-44 rounded-full border-2 border-black flex items-center justify-center mb-4 transition-all group-hover:bg-secondary group-hover:border-secondary shadow-pop-colored">
                    <Image
                      src={category.icon}
                      alt={category.title}
                      width={100}
                      height={100}
                      className="group-hover:text-white transition-all"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-black font-primary group-hover:text-secondary transition-colors">
                    {category.title}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </div>
    </div>
  );
}
