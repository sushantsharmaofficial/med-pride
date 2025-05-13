"use client";
import React, { useEffect, useState } from "react";

import HeroSection from "@/components/common/HeroSection";
import { getBrands } from "@/api/Brands/brands.api";

import { PortableTextBlock } from "@portabletext/types";
import BrandCard from "./components/brandCard";

interface Brand {
  _id: string;
  name: string;
  logo: string;
  description: PortableTextBlock[] | undefined;
  
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getBrands();
      setBrands(data);
    })();
  }, []);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Here you would implement search functionality
  };

  return (
    <div className="bg-gradient-to-t from-white to-blue-50 py-16">
      <div className="container max-w-7xl md:px-6 mx-auto px-4">
        <HeroSection
          title="Our Partners"
          description="We work with the best brands in the medical industry"
          searchPlaceholder="Search medical equipment..."
          onSearch={handleSearch}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
