"use client";
import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";

// Loading component for better visual feedback
function GlobeLoading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative animate-pulse">
        <div className="w-64 h-64 rounded-full border-8 border-blue-200 dark:border-blue-900"></div>
        <div className="absolute inset-0 flex items-center justify-center text-primary dark:text-white">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-800 mx-auto mb-4 animate-ping"></div>
            <p className="text-sm font-medium">
              Loading globe visualization...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import the World component with no SSR and better error handling
const World = dynamic(
  () =>
    import("@/components/ui/globe")
      .then((m) => m.World)
      .catch((error) => {
        console.error("Failed to load Globe component:", error);
        return () => (
          <div className="text-red-500">
            Failed to load globe. Please refresh the page.
          </div>
        );
      }),
  {
    ssr: false,
    loading: () => <GlobeLoading />,
    displayName: "DynamicWorld",
  }
);

export default function OptimizedWeExportWorldwide() {
  const [isClient, setIsClient] = useState(false);
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Delay showing the globe to ensure smoother rendering
    const timer = setTimeout(() => {
      setIsGlobeReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#00347f", "#0087ff", "#3B82F6"];

  // Simplified arcs data for better performance
  const sampleArcs = [
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[1],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[0],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[2],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[0],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[1],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[2],
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[0],
    },
    {
      order: 8,
      startLat: 40.7128,
      startLng: -74.006,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[1],
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen md:h-[90vh] relative w-full bg-gradient-to-r from-white to-blue-50 dark:from-black dark:to-blue-950">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full px-4">
        <div className="flex flex-col-reverse lg:flex-row h-full items-center">
          {/* Text content on left */}
          <div className="w-full lg:w-1/2 z-40 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
            <TextAnimation
              text="Global Reach"
              type="fadeIn"
              delay={0.2}
              className="text-base font-primary text-secondary font-bold"
            />

            <div className="mt-2">
              <TextAnimation
                text="Delivering excellence"
                type="slideUp"
                delay={0.4}
                duration={0.7}
                className="text-4xl w-full sm:text-5xl lg:text-[70px] font-secondary leading-tight font-light text-black dark:text-white block"
              />

              <TextAnimation
                text="worldwide"
                type="staggered"
                delay={0.8}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-secondary leading-tight mb-6 md:mb-10 lg:mb-16 font-light text-black dark:text-white block"
              />
            </div>

            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-6 md:w-8 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <TextAnimation
                  text="We deliver top-quality medical equipment to healthcare facilities in over 130 countries. Our global logistics network ensures timely delivery and compliance with international regulations, helping healthcare professionals worldwide provide excellent patient care."
                  type="fadeIn"
                  delay={1.2}
                  duration={0.8}
                  className="text-base md:text-lg font-primary max-w-full md:max-w-[400px] text-primary dark:text-neutral-200 mb-6"
                />

                <TextAnimation
                  delay={1.5}
                  duration={0.5}
                  text={
                    <button className="w-full sm:w-auto hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-secondary border-2 rounded-3xl px-4 py-3 font-fira-sans font-bold group border-secondary hover:border-secondary cursor-pointer">
                      Our global network
                    </button>
                  }
                />
              </div>
            </div>
          </div>

          {/* Globe on right with better loading handling */}
          <div className="w-full lg:w-1/2 h-full relative">
            <div className="absolute w-full h-full">
              <Suspense fallback={<GlobeLoading />}>
                {isClient && isGlobeReady && (
                  <World data={sampleArcs} globeConfig={globeConfig} />
                )}
                {isClient && !isGlobeReady && <GlobeLoading />}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
