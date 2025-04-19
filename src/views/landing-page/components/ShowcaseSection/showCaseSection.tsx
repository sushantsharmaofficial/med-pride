import React from "react";
import { FocusCards } from "@/components/ui/focus-cards";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";
import showcase1 from "@/assets/LandingPage/ShowCaseSection/show1.jpg";
import showcase2 from "@/assets/LandingPage/ShowCaseSection/show2.jpg";
import showcase3 from "@/assets/LandingPage/ShowCaseSection/show3.jpg";
import showcase4 from "@/assets/LandingPage/ShowCaseSection/show4.jpg";

export default function ShowCaseSection() {
  const cards = [
    {
      title: "Advanced Diagnostic Systems",
      src: showcase1,
    },
    {
      title: "Premium Surgical Equipment",
      src: showcase2,
    },
    {
      title: "Precision Monitoring Devices",
      src: showcase3,
    },
    {
      title: "Specialized Treatment Solutions",
      src: showcase4,
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Cards on left side */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <FocusCards cards={cards} />
          </div>

          {/* Text content on right side */}
          <div className="w-full md:w-1/2 mt-16 md:mt-0 flex flex-col items-center md:items-start justify-center text-center md:text-left">
            <TextAnimation
              text="Featured Products"
              type="fadeIn"
              delay={0.2}
              className="text-base font-primary text-secondary font-bold"
            />

            <div className="mt-2">
              <TextAnimation
                text="excellence in"
                type="slideUp"
                delay={0.4}
                duration={0.7}
                className="text-4xl sm:text-5xl md:text-6xl font-secondary leading-tight font-light text-black block"
              />

              <TextAnimation
                text="medical innovation"
                type="staggered"
                delay={0.8}
                className="text-4xl sm:text-5xl md:text-6xl font-secondary leading-tight mb-6 md:mb-10 font-light text-black block"
              />
            </div>

            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-6 md:w-8 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <TextAnimation
                  text="Our premium medical equipment is designed with precision and care, focusing on the needs of healthcare professionals. We combine cutting-edge technology with ergonomic design to create tools that enhance patient outcomes while making procedures safer and more efficient."
                  type="fadeIn"
                  delay={1.2}
                  duration={0.8}
                  className="text-base md:text-lg font-primary max-w-full md:max-w-[500px] text-primary mb-6"
                />

                <TextAnimation
                  delay={1.5}
                  duration={0.5}
                  text={
                    <button className="w-full sm:w-auto hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-secondary border-2 rounded-3xl px-4 py-3 font-fira-sans font-bold group border-secondary hover:border-secondary cursor-pointer">
                      Explore our catalog
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
