"use client";
import React, { useEffect, useState, useRef } from "react";

import HeroSection from "@/components/common/HeroSection";
import { getBrands, getBrandsBySearch } from "@/api/Brands/brands.api";

import { PortableTextBlock } from "@portabletext/types";
import BrandCard from "./components/brandCard";
import Loader from "@/components/ui/loader";
interface Brand {
  _id: string;
  name: string;
  logo: string;
  description: PortableTextBlock[] | undefined;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const allBrandsRef = useRef<Brand[]>([]);

  // Load all brands initially
  useEffect(() => {
    loadAllBrands();
  }, []);

  // Load all brands function
  const loadAllBrands = async () => {
    if (initialDataLoaded && allBrandsRef.current.length > 0) {
      setBrands(allBrandsRef.current);
      return;
    }

    setLoading(true);
    try {
      const data = await getBrands();
      setBrands(data);
      allBrandsRef.current = data;
      setInitialDataLoaded(true);
    } catch (error) {
      console.error("Error loading brands:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    // If the query is empty, use the cached brands instead of making an API call
    if (!query.trim()) {
      setBrands(allBrandsRef.current);
      return;
    }

    // For simple searches, filter client-side first
    if (query.trim().length <= 3) {
      const filteredBrands = allBrandsRef.current.filter((brand) =>
        brand.name.toLowerCase().includes(query.toLowerCase())
      );

      // If we found matches, use them without API call
      if (filteredBrands.length > 0) {
        setBrands(filteredBrands);
        return;
      }
    }

    // Only make API call for longer or more complex searches
    try {
      setLoading(true);
      const results = await getBrandsBySearch(query);
      setBrands(results);
    } catch (error) {
      console.error("Error searching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-t from-white to-blue-50 py-16">
      <div className="container max-w-7xl md:px-6 mx-auto px-4">
        <HeroSection
          title="Our Partners"
          description="We work with the best brands in the medical industry"
          searchPlaceholder="Search medical brands..."
          onSearch={handleSearch}
          liveSearch={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-16">
              <Loader
                size="large"
                variant="secondary"
                type="spinner"
                fullPage={false}
              />
            </div>
          ) : (
            brands.map((brand) => <BrandCard key={brand._id} brand={brand} />)
          )}
        </div>
      </div>
    </div>
  );
}
