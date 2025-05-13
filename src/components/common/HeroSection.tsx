import React from "react";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";
import SearchInput from "@/components/atom/SearchInput";

interface HeroSectionProps {
  title: string;
  description: string;
  searchPlaceholder: string;
  onSearch: (query: string) => void;
  badge?: {
    text: string;
    type?: "category" | "brand" | "product";
  };
  subtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  searchPlaceholder,
  onSearch,
  badge,
  subtitle,
}) => {
  return (
    <section className=" py-16 border-b border-gray-200">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {badge ? (
            <>
              <div className="flex flex-col items-center mb-2">
                <div className="text-sm text-white font-medium mb-2 bg-secondary bg-opacity-10 px-3 py-1 rounded-full">
                  {badge.text}
                </div>
                <TextAnimation
                  text={title}
                  type="staggered"
                  delay={0.2}
                  className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-tight text-primary block"
                />
              </div>
              <div className="w-16 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
              {subtitle && (
                <div className="text-lg font-medium text-gray-600">
                  {subtitle}
                </div>
              )}
            </>
          ) : (
            <TextAnimation
              text={title}
              type="staggered"
              delay={0.2}
              className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-tight font-light text-primary block"
            />
          )}

          <TextAnimation
            text={description}
            type="fadeIn"
            delay={0.6}
            duration={0.8}
            className="text-base md:text-lg font-primary max-w-2xl text-gray-600 mt-4 mb-10"
          />

          <div className="w-full max-w-2xl">
            <SearchInput
              placeholder={searchPlaceholder}
              onSearch={onSearch}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 