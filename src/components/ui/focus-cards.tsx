"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { StaticImageData } from "next/image";

type Card = {
  title: string;
  src: string | StaticImageData;
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Card;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute overflow-hidden aspect-[2/3] h-48 sm:h-60 md:h-72 lg:h-80 ml-10 md:ml-0 transform -rotate-[30deg] transition-all duration-500 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.95]",
        hovered === index && "z-20 scale-105",
        "rounded-[20px] sm:rounded-[25px] md:rounded-[30px] shadow-xl",
        index === 0 && "top-[5%] left-[5%] z-[4]",
        index === 1 && "top-[5%] left-[45%] z-[3]",
        index === 2 && "top-[40%] left-[0%] z-[2]",
        index === 3 && "top-[40%] left-[40%] z-[1]"
      )}
    >
      <div className="absolute inset-0 bg-gray-100 dark:bg-neutral-900 overflow-hidden rounded-[20px] sm:rounded-[25px] md:rounded-[30px]">
        <Image
          src={card.src}
          alt={card.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 33vw"
          className="object-cover"
        />
      </div>
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 transition-opacity duration-300 rounded-[20px] sm:rounded-[25px] md:rounded-[30px]",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium bg-clip-text font-primary text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 pb-2 md:pb-4">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative w-full flex justify-center">
      <div className="relative w-full max-w-[350px] sm:max-w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] perspective-1000">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </div>
  );
}
