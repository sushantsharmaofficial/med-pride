"use client";

import React, { useEffect, useState, useRef } from "react";
import HeroSection from "@/components/common/HeroSection";
import ProductDetailWrapper from "@/views/products/components/ProductDetailWrapper";
import Pagination from "@/components/common/Pagination";
import ProductCard from "@/components/common/ProductCard";
import SideFilter, {
  FilterState,
} from "@/views/products/components/SideFilter";

import {
  getProducts,
  getFilteredProducts,
  getProductsBySearch,
} from "@/api/Products/product.api";
import type { FilterParams } from "@/api/Products/product.api";
import ProductNotFound from "./components/productNotFound";
import { Loader } from "@/components/ui";

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
// const brandSlugToManufacturer: Record<string, string> = {};

interface SanityImageAsset {
  _ref?: string;
  _type?: string;
}

interface SanityBlockChild {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
}

interface SanityBlock {
  _key?: string;
  _type?: string;
  children?: SanityBlockChild[];
  markDefs?: Array<{ _key: string; _type: string; [key: string]: unknown }>;
  style?: string;
}

interface Product {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  brand?: { name: string };
  department?: { name: string };
  description?: SanityBlock[];
  mainImage?: { _type: string; asset: SanityImageAsset };
  gallery?: Array<{ _type: string; asset: SanityImageAsset }>;
  slug: { current: string };
  variations?: Array<{
    _key: string;
    label: string;
    fields: Array<{ _key?: string; name?: string; value?: string }>;
  }>;
}

interface ProductsPageProps {
  params?: {
    slug?: string[];
  };
}

export default function ProductsPage({ params }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Number of products to display per page
  const [isLoading, setIsLoading] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const allProductsRef = useRef<Product[]>([]);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    if (initialDataLoaded && allProductsRef.current.length > 0) {
      setProducts(allProductsRef.current);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      allProductsRef.current = data;
      setInitialDataLoaded(true);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    initialFilters.departments = [categorySlugToId[slugValue]];
  }

  // Find the specific product if we're on an item page
  const selectedProduct = isItemPage
    ? products.find((product) => product.slug.current === slugValue)
    : null;

  const handleSearch = async (query: string, searchResults?: Product[]) => {
    // If search query is empty, reset to cached products
    if (!query.trim()) {
      setProducts(allProductsRef.current);
      return;
    }

    setIsLoading(true);

    try {
      // Try client-side filtering for simple queries
      if (query.trim().length <= 3) {
        const lowercaseQuery = query.toLowerCase();
        const filteredProducts = allProductsRef.current.filter(
          (product) =>
            product.title.toLowerCase().includes(lowercaseQuery) ||
            product.brand?.name.toLowerCase().includes(lowercaseQuery) ||
            product.department?.name.toLowerCase().includes(lowercaseQuery)
        );

        // If we found matches client-side, use them without API call
        if (filteredProducts.length > 0) {
          setProducts(filteredProducts);
          setIsLoading(false);
          return;
        }
      }

      // Fall back to API search for more complex queries
      if (searchResults) {
        // If search results are provided directly
        setProducts(searchResults);
      } else {
        // Fallback to searching via API if results not provided
        const results = await getProductsBySearch({ searchQuery: query });
        setProducts(results);
      }
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (filters: FilterState) => {
    setIsLoading(true);

    try {
      const apiFilters: FilterParams = {
        brands: filters.brands || [],
        departments: filters.departments || [],
      };

      const filteredData = await getFilteredProducts(apiFilters);
      setProducts(filteredData);
    } catch (error) {
      console.error("Error filtering products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // We don't need to filter products in the component anymore as it's done in the API
  const filteredProducts = products;

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get current products to display
  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const displayedProducts = getCurrentProducts();

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-white to-blue-50 py-16 ">
      {/* Hero section with title and search */}
      <HeroSection
        title={"Medical Equipments"}
        description={
          "Find high-quality medical devices for your healthcare facility"
        }
        searchPlaceholder={"Search for medical equipment..."}
        onSearch={handleSearch}
        liveSearch={true}
        badge={
          isCategoryPage || isBrandPage
            ? {
                text: isCategoryPage ? "Category" : "Brand",
                type: isCategoryPage ? "category" : "brand",
              }
            : isItemPage && selectedProduct
              ? {
                  text: selectedProduct.department?.name || "Department",
                  type: "product",
                }
              : undefined
        }
        subtitle={
          isItemPage && selectedProduct
            ? `By ${selectedProduct.brand?.name}`
            : undefined
        }
      />

      {/* Main content section */}
      {isItemPage && selectedProduct ? (
        // Single product view
        <section className="container mx-auto px-4 py-12 md:py-16">
          <ProductDetailWrapper product={selectedProduct} />
        </section>
      ) : (
        // Products grid view
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* ProductFilter component for both mobile and desktop */}
            <div className="md:w-1/4">
              <SideFilter
                onFilterChange={handleFilterChange}
                initialFilters={initialFilters}
              />
            </div>

            {/* Products grid */}
            <div className={`w-full ${isBrandPage ? "" : "md:w-3/4"} `}>
              <div className="hidden md:flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                {isCategoryPage || isBrandPage ? (
                  <div className="flex items-baseline">
                    <h2 className="text-2xl font-secondary font-light text-primary mr-3">
                      {isCategoryPage ? "Category:" : "Brand:"}
                    </h2>
                    <span className="text-2xl font-secondary font-medium text-secondary">
                      {isCategoryPage ? "Category" : "Brand"}
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

              {isLoading ? (
                <Loader
                  size="large"
                  variant="primary"
                  type="trio"
                  fullPage={false}
                />
              ) : (
                <div className="col-span-3 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}

              {/* Use the new Pagination component */}
              {filteredProducts.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mt-16"
                />
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
