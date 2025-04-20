"use client";
import React from "react";
import Image from "next/image";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";
import Link from "next/link";

import SearchInput from "@/components/atom/SearchInput";

// Mock brand data
const brandsData = [
  {
    id: 1,
    name: "Siemens Healthineers",
    description:
      "Leading manufacturer of innovative medical imaging and diagnostic equipment.",
    website: "https://www.siemens-healthineers.com",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Philips Healthcare",
    description:
      "Global leader in health technology, focused on improving people's health and well-being.",
    website: "https://www.philips.com/healthcare",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "GE Healthcare",
    description:
      "Providing transformational medical technologies and services for patient care.",
    website: "https://www.gehealthcare.com",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Medtronic",
    description:
      "Global leader in medical technology, services, and solutions for better healthcare outcomes.",
    website: "https://www.medtronic.com",
    image:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Johnson & Johnson Medical",
    description:
      "Comprehensive medical devices, diagnostics, and solutions for healthcare professionals.",
    website: "https://www.jnjmedicaldevices.com",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Stryker Corporation",
    description:
      "One of the world's leading medical technology companies, offering innovative products and services.",
    website: "https://www.stryker.com",
    image:
      "https://images.unsplash.com/photo-1620207418302-439b387441b0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function BrandsPage() {
  return (
    <div className="bg-gradient-to-t from-white to-blue-50 py-16">
      <div className="container max-w-7xl md:px-6 mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mb-16 mx-auto">
          <TextAnimation
            text="Our Partners"
            type="staggered"
            delay={0.2}
            className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-tight font-light text-primary block "
          />

          <TextAnimation
            text="We work with the best brands in the medical industry"
            type="fadeIn"
            delay={0.6}
            duration={0.8}
            className="text-base md:text-lg font-primary max-w-2xl text-gray-600 mt-4 mb-10"
          />

          <div className="w-full max-w-2xl">
            <SearchInput
              placeholder="Search medical equipment..."
              onSearch={() => {}}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandsData.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-xl overflow-hidden shadow-pop-lg"
            >
              <div className="h-52 overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-primary text-primary mb-2">
                  {brand.name}
                </h3>
                <p className="text-gray-600 font-secondary mb-4">
                  {brand.description}
                </p>
                <Link
                  href={brand.website}
                  target="_blank"
                  className="inline-block bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors duration-300 font-primary"
                >
                  Visit Website
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
