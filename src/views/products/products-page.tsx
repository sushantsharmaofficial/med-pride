"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchInput from "@/components/atom/SearchInput";
import SideFilter from "./components/SideFilter";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";
import { Filter, X, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

// Mock data for products
const dummyProducts = [
  {
    id: "digital-xray-system",
    title: "Digital X-Ray System Pro",
    category: "Imaging",
    manufacturer: "Siemens Healthineers",
    price: "$24,999",
    image: "/images/products/xray-system.jpg",
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
    image: "/images/products/ultrasound.jpg",
    rating: 4.6,
    reviewCount: 112,
  },
  {
    id: "portable-ecg-machine",
    title: "Portable ECG Machine",
    category: "Diagnostic",
    manufacturer: "BPL Medical",
    price: "$3,499",
    image: "/images/products/ecg-machine.jpg",
    rating: 4.5,
    reviewCount: 87,
  },
  {
    id: "patient-monitor-ecg",
    title: "Multi-Parameter Patient Monitor with ECG",
    category: "Monitoring",
    manufacturer: "Philips Healthcare",
    price: "$7,999",
    image: "/images/products/patient-monitor.jpg",
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
    image: "/images/products/surgical-microscope.jpg",
    rating: 4.9,
    reviewCount: 76,
  },
  {
    id: "anesthesia-workstation",
    title: "Advanced Anesthesia Workstation",
    category: "Surgical",
    manufacturer: "Drager",
    price: "$42,850",
    image: "/images/products/anesthesia-workstation.jpg",
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
    image: "/images/products/endoscopy-system.jpg",
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
    image: "/images/products/ventilator.jpg",
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

  // Get the slug array safely - handle both string and object formats
  let slugArray: string[] = [];

  // Handle the case when params might be a Promise or have value property from ReactPromise
  if (params?.slug) {
    if (typeof params.slug === "string") {
      try {
        // If it's a JSON string (which happens with some Promise responses)
        const parsed = JSON.parse(params.slug);
        slugArray = Array.isArray(parsed) ? parsed : [];
      } catch {
        // If it's not valid JSON, use as is
        slugArray = [params.slug];
      }
    } else if (Array.isArray(params.slug)) {
      // Normal case - slug is an array
      slugArray = params.slug;
    } else if (typeof params.slug === "object" && params.slug !== null) {
      // Handle ReactPromise object with 'value' property
      try {
        // Use type assertion to handle ReactPromise
        const reactPromise = params.slug as { value?: string };
        if (reactPromise.value && typeof reactPromise.value === "string") {
          const parsed = JSON.parse(reactPromise.value);
          if (
            parsed &&
            typeof parsed === "object" &&
            "slug" in parsed &&
            Array.isArray(parsed.slug)
          ) {
            slugArray = parsed.slug;
          }
        }
      } catch {
        // In case of any parsing errors, continue with empty array
      }
    }
  }

  // Extract the type and value from the slug array
  const slugType = slugArray[0]; // 'category' or 'brand' or 'item'
  const slugValue = slugArray[1]; // The actual slug value

  // Define page types
  const isCategoryPage = slugType === "category" && slugValue;
  const isBrandPage = slugType === "brand" && slugValue;
  const isItemPage = slugType === "item" && slugValue;

  // Set initial filter based on URL
  const initialFilters: FilterState = {};

  if (isCategoryPage && slugValue && categorySlugToId[slugValue]) {
    initialFilters.categories = [categorySlugToId[slugValue]];
  }

  // Find the specific product if we're on an item page
  const selectedProduct = isItemPage
    ? dummyProducts.find((product) => product.id === slugValue)
    : null;

  const [, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] =
    useState<FilterState>(initialFilters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products based on selected filters and brand if applicable
  const filteredProducts = dummyProducts.filter((product) => {
    // For brand pages
    if (isBrandPage && slugValue && brandSlugToManufacturer[slugValue]) {
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
    if (isItemPage && selectedProduct) {
      return selectedProduct.title;
    } else if (isCategoryPage && slugValue) {
      // Format category title from slug
      const categoryTitle = slugValue
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Also check if we have a predefined name in categorySlugToId
      return categoryTitle || "Medical Equipments";
    } else if (isBrandPage && slugValue) {
      // For brand pages, use the predefined manufacturer name
      return (
        brandSlugToManufacturer[slugValue] ||
        // Fallback to formatting the slug
        slugValue
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    } else {
      return "Medical Equipments";
    }
  };

  // Generate page description based on current view
  const getPageDescription = () => {
    if (isItemPage && selectedProduct) {
      return `${selectedProduct.title} by ${selectedProduct.manufacturer} - ${selectedProduct.category}`;
    } else if (isCategoryPage && slugValue) {
      const categoryName = slugValue
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return `Browse our selection of high-quality ${categoryName}`;
    } else if (isBrandPage && slugValue) {
      const brandName =
        brandSlugToManufacturer[slugValue] ||
        slugValue
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      return `Explore medical equipment from ${brandName}`;
    } else {
      return "Find high-quality medical devices for your healthcare facility";
    }
  };

  // Generate search placeholder based on current view
  const getSearchPlaceholder = () => {
    if (isItemPage && selectedProduct) {
      return `Search similar ${selectedProduct.category} equipment...`;
    } else if (isCategoryPage && slugValue) {
      const categoryName = slugValue
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return `Search ${categoryName}...`;
    } else if (isBrandPage && slugValue) {
      const brandName =
        brandSlugToManufacturer[slugValue] ||
        slugValue
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      return `Search ${brandName} products...`;
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
            {isCategoryPage || isBrandPage ? (
              <>
                <div className="flex flex-col items-center mb-2">
                  <div className="text-sm text-white font-medium mb-2 bg-secondary bg-opacity-10 px-3 py-1 rounded-full">
                    {isCategoryPage ? "Category" : "Brand"}
                  </div>
                  <TextAnimation
                    text={getPageTitle()}
                    type="staggered"
                    delay={0.2}
                    className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-tight  text-primary block"
                  />
                </div>

                <div className="w-16 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
              </>
            ) : isItemPage && selectedProduct ? (
              <>
                <div className="flex flex-col items-center mb-2">
                  <div className="text-sm text-white font-medium mb-2 bg-secondary bg-opacity-10 px-3 py-1 rounded-full">
                    {selectedProduct.category}
                  </div>
                  <TextAnimation
                    text={selectedProduct.title}
                    type="staggered"
                    delay={0.2}
                    className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-tight  text-primary block"
                  />
                </div>
                <div className="w-16 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
                <div className="text-lg font-medium text-gray-600">
                  By {selectedProduct.manufacturer}
                </div>
              </>
            ) : (
              <TextAnimation
                text={getPageTitle()}
                type="staggered"
                delay={0.2}
                className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-tight font-light text-primary block"
              />
            )}

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

      {/* Main content section */}
      {isItemPage && selectedProduct ? (
        // Single product view
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image */}
              <div className="md:w-1/2 bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <div className="relative h-80 w-full">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="md:w-1/2">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <span className="text-sm font-medium bg-secondary bg-opacity-10 text-secondary px-3 py-1 rounded-full">
                          {selectedProduct.category}
                        </span>
                        {selectedProduct.isNew && (
                          <span className="text-sm font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <button className="text-gray-400 hover:text-secondary transition-colors p-2">
                        <Heart className="h-6 w-6" />
                      </button>
                    </div>

                    <h1 className="text-3xl font-secondary font-bold text-primary mb-2">
                      {selectedProduct.title}
                    </h1>

                    <div className="text-lg text-gray-600 mb-2">
                      By{" "}
                      <span className="font-medium text-secondary">
                        {selectedProduct.manufacturer}
                      </span>
                    </div>

                    {selectedProduct.rating && (
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(selectedProduct.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 fill-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600 ml-2">
                          {selectedProduct.rating.toFixed(1)} (
                          {selectedProduct.reviewCount} reviews)
                        </span>
                      </div>
                    )}

                    <div className="border-t border-b border-gray-100 py-4 my-4">
                      <div className="text-3xl font-bold text-secondary mb-2">
                        {selectedProduct.price}
                      </div>
                      <p className="text-gray-500 text-sm">
                        Price includes standard warranty. Extended warranty
                        options available.
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <button className="py-3 px-6 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-dark transition-colors">
                        Add to Cart
                      </button>
                      <button className="py-3 px-6 border border-secondary text-secondary font-medium rounded-lg hover:bg-secondary hover:text-white transition-colors">
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Products grid view
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

            {/* Desktop sidebar - always show */}
            <div className="hidden md:block md:w-1/4">
              <SideFilter onFilterChange={handleFilterChange} />
            </div>

            {/* Products grid */}
            <div className={`w-full ${isBrandPage ? "" : "md:w-3/4"}`}>
              <div className="hidden md:flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                {isCategoryPage || isBrandPage ? (
                  <div className="flex items-baseline">
                    <h2 className="text-2xl font-secondary font-light text-primary mr-3">
                      {isCategoryPage ? "Category:" : "Brand:"}
                    </h2>
                    <span className="text-2xl font-secondary font-medium text-secondary">
                      {getPageTitle()}
                    </span>
                  </div>
                ) : (
                  <h2 className="text-2xl font-secondary font-light text-primary">
                    All{" "}
                    <span className="text-secondary font-normal">Products</span>
                  </h2>
                )}

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
                      <Link
                        href={`/products/item/${product.id}`}
                        className="block"
                      >
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
                                      : product.category === "Critical Care"
                                      ? "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
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
      )}
    </div>
  );
}
