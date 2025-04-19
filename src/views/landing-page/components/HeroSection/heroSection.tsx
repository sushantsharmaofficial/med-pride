import Image from "next/image";
import React from "react";
import heroImage from "@/assets/LandingPage/HeroSection/heroImage.jpg";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
      {/* Full screen background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt="Medical background"
          className="object-cover w-full h-full brightness-[0.85] opacity-90"
          fill
          sizes="100vw"
          priority
          style={{ objectPosition: "right center" }}
        />
        {/* Left-side gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 15%, rgba(255,255,255,0.95) 25%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 75%, transparent 100%)",
          }}
        ></div>
      </div>

      {/* Content container */}
      <div className="relative z-30 w-full h-full mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center h-full relative">
          {/* Two-column layout for larger screens */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-start h-full relative">
            {/* Text content */}
            <div className="flex flex-col w-full lg:w-1/2 items-center lg:items-start justify-center text-center lg:text-left">
              <TextAnimation
                text="MediPride"
                type="fadeIn"
                delay={0.2}
                className="text-base font-primary text-secondary font-bold"
              />

              <div className="mt-2">
                <TextAnimation
                  text="committed to"
                  type="slideUp"
                  delay={0.4}
                  duration={0.7}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-secondary leading-tight font-light text-black block"
                />

                <TextAnimation
                  text="what matters most"
                  type="staggered"
                  delay={0.8}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-secondary leading-tight mb-6 md:mb-10 lg:mb-16 font-light text-black block"
                />
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-6 md:w-8 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <TextAnimation
                    text="We exist to support health workers, and our medical devices help them provide daily care to patients. We design products for them that reinforce safety and improve treatment conditions and performance. Like them, we are committed to protecting life, which is what matters most."
                    type="fadeIn"
                    delay={1.2}
                    duration={0.8}
                    className="text-base md:text-lg font-primary max-w-full md:max-w-[400px] text-primary mb-6"
                  />

                  <TextAnimation
                    delay={1.5}
                    duration={0.5}
                    text={
                      <button className="w-full sm:w-auto hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-secondary border-2 rounded-3xl px-4 py-3 font-fira-sans font-bold group border-secondary hover:border-secondary cursor-pointer">
                        Value life, our mission
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
