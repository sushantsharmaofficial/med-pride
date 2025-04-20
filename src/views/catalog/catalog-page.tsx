"use client";

import React, { useState } from "react";
import SearchInput from "@/components/atom/SearchInput";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import ProductFilter, { FilterState } from "@/components/atom/ProductFilter";

// Mock data for catalog products
const catalogProducts = [
  {
    id: "digital-xray",
    title: "Digital X-Ray System Pro",
    category: "Imaging",
    manufacturer: "Siemens Healthineers",
    price: "$24,999",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
  },
  {
    id: "ultrasound-device",
    title: "Advanced Ultrasound Machine",
    category: "Diagnostic",
    manufacturer: "GE Healthcare",
    price: "$18,750",
    rating: 4.6,
    reviewCount: 112,
  },
  {
    id: "ecg-machine",
    title: "Portable ECG Machine",
    category: "Diagnostic",
    manufacturer: "BPL Medical",
    price: "$3,499",
    rating: 4.5,
    reviewCount: 87,
  },
  {
    id: "patient-monitor",
    title: "Multi-Parameter Patient Monitor with ECG",
    category: "Monitoring",
    manufacturer: "Philips Healthcare",
    price: "$7,999",
    rating: 4.7,
    reviewCount: 98,
    isFeatured: true,
  },
  {
    id: "surgical-microscope",
    title: "High-Precision Surgical Microscope",
    category: "Surgical",
    manufacturer: "Carl Zeiss",
    price: "$35,599",
    rating: 4.9,
    reviewCount: 76,
  },
  {
    id: "anesthesia-workstation",
    title: "Advanced Anesthesia Workstation",
    category: "Surgical",
    manufacturer: "Drager",
    price: "$42,850",
    rating: 4.8,
    reviewCount: 64,
    isNew: true,
  },
];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRanges: [],
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products based on selected filters
  const filteredProducts = catalogProducts.filter((product) => {
    // Filter by search query
    if (
      searchQuery &&
      !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (
      filters.categories?.length &&
      !filters.categories.some((cat) => {
        const categoryMap: Record<string, string> = {
          diagnostic: "Diagnostic",
          surgical: "Surgical",
          monitoring: "Monitoring",
          imaging: "Imaging",
          laboratory: "Laboratory",
          dental: "Dental",
        };
        return product.category === categoryMap[cat];
      })
    ) {
      return false;
    }

    // Filter by brand
    if (
      filters.brands?.length &&
      !filters.brands.some((brand) => {
        const brandMap: Record<string, string> = {
          siemens: "Siemens Healthineers",
          philips: "Philips Healthcare",
          ge: "GE Healthcare",
          drager: "Drager",
          zeiss: "Carl Zeiss",
          bpl: "BPL Medical",
        };
        return product.manufacturer === brandMap[brand];
      })
    ) {
      return false;
    }

    return true;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with title and search */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16 border-b border-gray-200">
        <div className="container max-w-7xl md:px-6 mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <TextAnimation
              text="Medical Equipment Catalog"
              type="staggered"
              delay={0.2}
              className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-tight font-light text-primary block"
            />

            <TextAnimation
              text="Find high-quality medical devices for your healthcare facility"
              type="fadeIn"
              delay={0.6}
              duration={0.8}
              className="text-base md:text-lg font-primary max-w-2xl text-gray-600 mt-4 mb-10"
            />

            <div className="w-full max-w-2xl">
              <SearchInput
                placeholder="Search medical equipment..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main content section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Filter component for both mobile and desktop */}
          <div className="md:w-1/4">
            <ProductFilter
              onFilterChange={handleFilterChange}
              initialFilters={filters}
              productCount={filteredProducts.length}
              isMobileFilterOpen={isMobileFilterOpen}
              onToggleMobileFilter={toggleMobileFilter}
            />
          </div>

          {/* Products grid */}
          <div className="w-full md:w-3/4">
            <div className="hidden md:flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-secondary font-light text-primary">
                All <span className="text-secondary font-normal">Products</span>
              </h2>

              <div className="text-gray-600 font-medium">
                Showing{" "}
                <span className="text-secondary">
                  {filteredProducts.length}
                </span>{" "}
                products
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex justify-center">
                    <Link href="#" className="block">
                      <CardContainer
                        className="inter-var"
                        containerClassName="py-4"
                      >
                        <CardBody className="bg-white relative group/card border-black/[0.1] w-[280px] sm:w-[300px] h-[400px] rounded-xl p-4 border shadow-pop-sm hover:shadow-lg transition-shadow duration-300">
                          <div className="mb-2">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                              {product.category}
                            </span>
                            {product.isNew && (
                              <span className="ml-2 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                New
                              </span>
                            )}
                            {product.isFeatured && (
                              <span className="ml-2 inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <CardItem
                            translateZ="50"
                            className="text-lg font-bold text-primary font-primary line-clamp-1"
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
                                      i < Math.floor(product.rating || 0)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-gray-500 ml-2">
                                ({product.reviewCount})
                              </span>
                            </div>
                          </CardItem>
                          <CardItem translateZ="100" className="w-full mt-4">
                            <div className="relative h-44 w-full">
                              <Image
                                src={
                                  product.category === "Imaging"
                                    ? "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
                                    : product.category === "Diagnostic"
                                    ? "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
                                    : product.category === "Monitoring"
                                    ? "https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
                                    : product.category === "Surgical"
                                    ? "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
                                    : product.category === "Laboratory"
                                    ? "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
                                    : "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
                                }
                                fill
                                className="object-cover rounded-xl group-hover/card:shadow-xl"
                                alt={product.title}
                              />
                            </div>
                          </CardItem>
                          <div className="flex justify-between items-center mt-auto pt-4">
                            <CardItem
                              translateZ={20}
                              as="div"
                              className="text-lg font-bold text-secondary"
                            >
                              {product.price}
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
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="col-span-3 py-20 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-8">
                  Try adjusting your filters or search to find what you&apos;re
                  looking for.
                </p>
                <button
                  onClick={() =>
                    setFilters({ categories: [], brands: [], priceRanges: [] })
                  }
                  className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 flex justify-center">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 rounded-md bg-secondary text-white hover:bg-secondary-dark transition-colors font-medium">
                    1
                  </button>
                  <button className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
