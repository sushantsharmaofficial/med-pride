"use client";

import React, { useRef } from "react";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Product data
const products = [
  {
    id: "product1",
    category: "Imaging",
    title: "Digital X-Ray System",
    manufacturer: "Siemens Healthineers",
    rating: 4,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "product2",
    category: "Surgical",
    title: "Robotic Surgery System",
    manufacturer: "Intuitive Surgical",
    rating: 5,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "product3",
    category: "Monitoring",
    title: "Patient Vital Monitor",
    manufacturer: "Philips Healthcare",
    rating: 4.5,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "product4",
    category: "Diagnostic",
    title: "Portable Ultrasound Device",
    manufacturer: "GE Healthcare",
    rating: 4,
    reviews: 103,
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "product5",
    category: "Laboratory",
    title: "Advanced Microscope",
    manufacturer: "Olympus Medical",
    rating: 4.8,
    reviews: 142,
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "product6",
    category: "Cardiology",
    title: "ECG Monitoring System",
    manufacturer: "Biocare Healthcare",
    rating: 4.3,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "product7",
    category: "Respiratory",
    title: "Advanced Ventilator",
    manufacturer: "Drager Medical",
    rating: 4.7,
    reviews: 114,
    image:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "product8",
    category: "Dental",
    title: "Dental Treatment Unit",
    manufacturer: "Planmeca",
    rating: 4.2,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

export default function MostSearchedProducts() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6 pb-12">
      <div className="flex flex-col items-start justify-start">
        <div className="flex justify-between items-center w-full mb-8">
          <section className="flex flex-col items-start justify-start">
            <TextAnimation
              text="Our Products"
              type="fadeIn"
              delay={0.2}
              className="text-base font-primary text-secondary font-bold"
            />
            <TextAnimation
              text="Explore our most searched products"
              type="slideUp"
              delay={0.4}
              duration={0.7}
              className="text-4xl sm:text-xl md:text-3xl font-secondary leading-tight font-light text-black block"
            />
          </section>
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <button
                onClick={scrollLeft}
                className="w-14 h-14 rounded-full border border-black flex items-center justify-center transition-all hover:bg-secondary hover:border-secondary group"
              >
                <ChevronLeft className="w-8 h-8 text-black group-hover:text-white" />
              </button>
              <button
                onClick={scrollRight}
                className="w-14 h-14 rounded-full border border-black flex items-center justify-center transition-all hover:bg-secondary hover:border-secondary group"
              >
                <ChevronRight className="w-8 h-8 text-black group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        <section className="w-full">
          <div
            ref={sliderRef}
            className="flex flex-nowrap overflow-x-auto gap-32 pb-8 scrollbar-hide scroll-smooth pl-14"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none"
                style={{ width: "380px" }}
              >
                <CardContainer className="inter-var ">
                  <CardBody className="bg-white relative group/card border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border shadow-pop-sm dark:hover:shadow-secondary/[0.1]">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-primary font-primary"
                    >
                      {product.title}
                    </CardItem>
                    <CardItem
                      translateZ="30"
                      className="text-neutral-500 text-sm mt-1 font-secondary"
                    >
                      {product.manufacturer}
                    </CardItem>
                    <CardItem translateZ="40" className="mt-2">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-500 ml-2">
                          ({product.reviews})
                        </span>
                      </div>
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                      <div className="relative h-60 w-full">
                        <Image
                          src={product.image}
                          fill
                          className="object-cover rounded-xl group-hover/card:shadow-xl"
                          alt={product.title}
                        />
                      </div>
                    </CardItem>
                    <div className="flex justify-between items-center mt-6">
                      <CardItem
                        translateZ={20}
                        as="a"
                        href="#"
                        className="px-4 py-2 rounded-xl text-xs font-normal text-primary hover:text-secondary"
                      >
                        View Details
                      </CardItem>
                      <CardItem
                        translateZ={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-primary hover:bg-secondary transition-colors text-white text-xs font-bold"
                      >
                        Request Quote
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
