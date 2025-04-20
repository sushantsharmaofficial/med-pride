"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import SearchInput from "@/components/atom/SearchInput";
import SideFilter from "./components/SideFilter";
import ProductCard from "./components/ProductCard";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";
import { Filter, X } from "lucide-react";

// Mock data for products
const dummyProducts = [
  {
    id: "digital-xray-system",
    title: "Digital X-Ray System Pro",
    category: "Imaging",
    manufacturer: "Siemens Healthineers",
    price: "$24,999",
    image:
      "https://images.unsplash.com/photo-1516549655055-1f8e9c520be6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
  },
  {
    id: "ultrasound-machine",
    title: "Advanced Ultrasound Machine",
    category: "Diagnostic",
    manufacturer: "GE Healthcare",
    price: "$18,750",
    image:
      "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.6,
    reviewCount: 112,
  },
  {
    id: "portable-ecg-machine",
    title: "Portable ECG Machine",
    category: "Diagnostic",
    manufacturer: "BPL Medical",
    price: "$3,499",
    image:
      "https://images.unsplash.com/photo-1581056771107-24247a210356?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.5,
    reviewCount: 87,
  },
  {
    id: "patient-monitor-ecg",
    title: "Multi-Parameter Patient Monitor with ECG",
    category: "Monitoring",
    manufacturer: "Philips Healthcare",
    price: "$7,999",
    image:
      "https://images.unsplash.com/photo-1551076587-89ada2c6cee8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MHx8MHx8fDA%3D",
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
    image:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNhbCUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.9,
    reviewCount: 76,
  },
  {
    id: "anesthesia-workstation",
    title: "Advanced Anesthesia Workstation",
    category: "Surgical",
    manufacturer: "Drager",
    price: "$42,850",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNhbCUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    reviewCount: 64,
    isNew: true,
  },
  {
    id: "endoscopy-system",
    title: "4K Endoscopy System",
    category: "Surgical",
    manufacturer: "Olympus",
    price: "$29,999",
    image:
      "https://images.unsplash.com/photo-1589279003513-467d320f47eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.6,
    reviewCount: 84,
    isNew: true,
  },
  {
    id: "ventilator",
    title: "Critical Care Ventilator",
    category: "Critical Care",
    manufacturer: "Medtronic",
    price: "$22,750",
    image:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVudGlsYXRvcnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    reviewCount: 68,
    isFeatured: true,
  },
];

// Define proper type for filters
interface FilterState {
  categories?: string[];
  brands?: string[];
  priceRanges?: string[];
}

// Map category slugs to their respective IDs for filtering
const categorySlugToId: Record<string, string> = {
  "diagnostic-equipment": "diagnostic",
  "surgical-instruments": "surgical",
  "monitoring-devices": "monitoring",
  "imaging-systems": "imaging",
  "laboratory-equipment": "laboratory",
  "dental-equipment": "dental",
  "physiotherapy-equipment": "physiotherapy",
  "emergency-care": "emergency",
};

// Map brand slugs to manufacturer names
const brandSlugToManufacturer: Record<string, string> = {
  "siemens-healthineers": "Siemens Healthineers",
  "philips-healthcare": "Philips Healthcare",
  "ge-healthcare": "GE Healthcare",
  medtronic: "Medtronic",
  drager: "Drager",
  "carl-zeiss": "Carl Zeiss",
};

interface ProductsPageProps {
  params?: {
    slug?: string[];
  };
}

export default function ProductsPage({ params }: ProductsPageProps) {
  // Extract category or brand from URL if present
  const slugType = params?.slug?.[0]; // 'category' or 'brand'
  const slugValue = params?.slug?.[1]; // The actual slug

  const isCategoryPage = slugType === "category" && slugValue;
  const isBrandPage = slugType === "brand" && slugValue;

  // Set initial filter based on URL
  const initialFilters: FilterState = {};

  if (isCategoryPage && categorySlugToId[slugValue]) {
    initialFilters.categories = [categorySlugToId[slugValue]];
  }

  const [, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] =
    useState<FilterState>(initialFilters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products based on selected filters and brand if applicable
  const filteredProducts = dummyProducts.filter((product) => {
    // For brand pages
    if (isBrandPage && brandSlugToManufacturer[slugValue]) {
      return product.manufacturer === brandSlugToManufacturer[slugValue];
    }

    // For category pages or general filtering
    if (!selectedFilters.categories?.length) {
      return true;
    }

    // Map product categories to IDs for comparison
    const categoryMap: Record<string, string> = {
      Imaging: "imaging",
      Diagnostic: "diagnostic",
      Monitoring: "monitoring",
      Surgical: "surgical",
      "Critical Care": "emergency",
      Laboratory: "laboratory",
      Dental: "dental",
    };

    // Check if product category matches any selected category
    return selectedFilters.categories.includes(
      categoryMap[product.category] || ""
    );
  });

  // Generate page title based on current view
  const getPageTitle = () => {
    if (isCategoryPage) {
      return (
        slugValue
          ?.split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") || "Medical Equipment"
      );
    } else if (isBrandPage) {
      return brandSlugToManufacturer[slugValue] || "Medical Equipment";
    } else {
      return "Medical Equipment Catalog";
    }
  };

  // Generate page description based on current view
  const getPageDescription = () => {
    if (isCategoryPage) {
      const categoryName = slugValue
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return `Browse our selection of high-quality ${categoryName}`;
    } else if (isBrandPage) {
      const brandName = brandSlugToManufacturer[slugValue];
      return `Explore medical equipment from ${brandName}`;
    } else {
      return "Find high-quality medical devices for your healthcare facility";
    }
  };

  // Generate search placeholder based on current view
  const getSearchPlaceholder = () => {
    if (isCategoryPage) {
      return `Search ${slugValue
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}...`;
    } else if (isBrandPage) {
      return `Search ${brandSlugToManufacturer[slugValue]} products...`;
    } else {
      return "Search medical equipment...";
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Here you would typically call an API to filter products
    console.log("Searching for:", query);
  };

  const handleFilterChange = (filters: FilterState) => {
    setSelectedFilters(filters);
    // Here you would typically call an API to filter products
    console.log("Applied filters:", filters);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with title and search */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <TextAnimation
              text={getPageTitle()}
              type="staggered"
              delay={0.2}
              className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-tight font-light text-primary block"
            />

            <TextAnimation
              text={getPageDescription()}
              type="fadeIn"
              delay={0.6}
              duration={0.8}
              className="text-base md:text-lg font-primary max-w-2xl text-gray-600 mt-4 mb-10"
            />

            <div className="w-full max-w-2xl">
              <SearchInput
                placeholder={getSearchPlaceholder()}
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main content with sidebar and products */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <button
              onClick={toggleMobileFilter}
              className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-200 text-primary hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5 text-secondary" />
              <span className="font-medium">Filters</span>
            </button>

            <div className="text-sm font-medium text-gray-600">
              {filteredProducts.length} products
            </div>
          </div>

          {/* Mobile filter panel */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex md:hidden">
              <motion.div
                className="bg-white w-4/5 h-full overflow-y-auto"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-5 border-b flex items-center justify-between">
                  <h2 className="font-secondary text-xl font-medium text-primary">
                    Filters
                  </h2>
                  <button
                    onClick={toggleMobileFilter}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="p-5">
                  <SideFilter onFilterChange={handleFilterChange} />
                </div>
              </motion.div>
            </div>
          )}

          {/* Desktop sidebar - don't show on brand pages */}
          {!isBrandPage && (
            <div className="hidden md:block md:w-1/4">
              <SideFilter onFilterChange={handleFilterChange} />
            </div>
          )}

          {/* Products grid */}
          <div className={`w-full ${isBrandPage ? "" : "md:w-3/4"}`}>
            <div className="hidden md:flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-secondary font-light text-primary">
                {isCategoryPage ? (
                  <>
                    <span className="text-secondary font-normal">
                      {slugValue
                        ?.split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>{" "}
                    Products
                  </>
                ) : isBrandPage ? (
                  <>
                    <span className="text-secondary font-normal">
                      {brandSlugToManufacturer[slugValue]}
                    </span>{" "}
                    Products
                  </>
                ) : (
                  <>
                    All{" "}
                    <span className="text-secondary font-normal">Products</span>
                  </>
                )}
              </h2>
              <div className="text-gray-600 font-medium">
                Showing{" "}
                <span className="text-secondary">
                  {filteredProducts.length}
                </span>{" "}
                products
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    category={product.category}
                    manufacturer={product.manufacturer}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    isNew={product.isNew}
                    isFeatured={product.isFeatured}
                  />
                ))
              ) : (
                <div className="col-span-3 py-20 text-center">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-8">
                    Try adjusting your filters or search to find what
                    you&apos;re looking for.
                  </p>
                  <button
                    onClick={() => setSelectedFilters({})}
                    className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination - only show if there are products */}
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
