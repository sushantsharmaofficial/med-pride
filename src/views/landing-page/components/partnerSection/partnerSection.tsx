import React from "react";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

// Partner images
import partner1 from "@/assets/LandingPage/PartnerSection/partner1.png";
import partner2 from "@/assets/LandingPage/PartnerSection/partner2.png";
import partner3 from "@/assets/LandingPage/PartnerSection/partner3.png";
import partner4 from "@/assets/LandingPage/PartnerSection/partner4.png";
import partner5 from "@/assets/LandingPage/PartnerSection/partner5.png";

export default function PartnerSection() {
  const partners = [
    { id: 1, image: partner1, alt: "Partner 1" },
    { id: 2, image: partner2, alt: "Partner 2" },
    { id: 3, image: partner3, alt: "Partner 3" },
    { id: 4, image: partner4, alt: "Partner 4" },
    { id: 5, image: partner5, alt: "Partner 5" },
  ];

  return (
    <div className="container mx-auto max-w-7xl  px-4 md:px-6 py-24">
      <div className="text-center ">
        <h2 className="text-3xl font-primary  text-primary font-bold">
          Our Trusted Partners
        </h2>
        <p className="text-lg font-secondary font-light text-gray-600 mt-2">
          Working with leading medical equipment providers worldwide
        </p>
      </div>

      <div className="w-full overflow-hidden ">
        <Marquee speed={40} pauseOnHover={true}>
          <div className="flex items-center h-[180px]">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="mx-8 flex items-center justify-center w-[180px] h-[180px]"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={partner.image}
                  alt={partner.alt}
                  width={140}
                  height={140}
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
