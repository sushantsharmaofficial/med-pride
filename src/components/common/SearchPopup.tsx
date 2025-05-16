"use client";

import React, { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import SearchInput from "@/components/atom/SearchInput";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getProductsBySearch } from "@/api/Products/product.api";
import { urlFor } from "@/sanity/lib/image";

// Using the Product interface from SearchInput.tsx
interface SanityImageAsset {
  _ref?: string;
  _type?: string;
}

interface SanityImage {
  _type: string;
  asset: SanityImageAsset;
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
  _id: string;
  title: string;
  brand?: { name: string };
  department?: { name: string };
  description?: SanityBlock[];
  mainImage?: SanityImage;
  slug: { current: string };
  variations?: Array<{
    _key: string;
    label: string;
    fields: Array<{ _key?: string; name?: string; value?: string }>;
  }>;
}

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Product Preview Card Component
const ProductPreview = ({ product }: { product: Product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-4 p-4 border rounded-md hover:shadow-md transition-all duration-300 bg-white"
    >
      <div className="w-16 h-16 relative flex-shrink-0 bg-gray-100 rounded-md overflow-hidden shadow-pop-sm">
        {product.mainImage ? (
          <Image
            src={urlFor(product.mainImage).url() || "/placeholder-product.png"}
            alt={product.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-xs text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <Link 
          href={`/products/item/${product.slug.current}`}
          className="group block"
          onClick={(e) => e.currentTarget.closest('div[role="dialog"]') && document.body.click()}
        >
          <h3 className="font-medium text-primary truncate group-hover:text-secondary transition-colors font-primary">
            {product.title}
          </h3>
          
          <div className="flex items-center mt-1 gap-2 flex-wrap">
            {product.brand && (
              <span className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded-full">
                {product.brand.name}
              </span>
            )}
            {product.department && (
              <span className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded-full">
                {product.department.name}
              </span>
            )}
          </div>
          
          <div className="flex items-center mt-2 text-xs text-primary">
            <span className="inline-flex items-center gap-1 hover:underline font-bold">
              View details <ExternalLink size={12} />
            </span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string, results?: Product[]) => {
    setCurrentQuery(query);
    
    if (results) {
      // If results are provided by SearchInput component, use them
      setSearchResults(results);
    } else if (query === "") {
      // Clear results if query is empty
      setSearchResults([]);
    } else if (query.trim().length >= 2) {
      // If query is long enough and results aren't provided, fetch them ourselves
      try {
        setIsSearching(true);
        const fetchedResults = await getProductsBySearch({ searchQuery: query });
        setSearchResults(fetchedResults);
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  // Handle keyboard input for ESC key to close popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset search when popup is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentQuery("");
      setSearchResults([]);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center absolute inset-0 min-h-screen p-4 " onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden my-auto "
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
          aria-label="Close search popup"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Search Products</h2>
          <SearchInput
            placeholder="Start typing product name..."
            onSearch={handleSearch}
            liveSearch={true}
            className="mb-4"
          />

          <div className="min-h-20 relative">
            {isSearching && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            )}

            {currentQuery && searchResults.length === 0 && !isSearching && (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found for &quot;{currentQuery}&quot;</p>
                <p className="text-sm text-gray-400 mt-2">Try a different search term or browse our catalog</p>
              </div>
            )}

            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-h-96 overflow-y-auto divide-y"
                >
                  <div className="flex items-center justify-between mb-2 px-1">
                    <h3 className="text-sm font-medium text-gray-500">
                      {searchResults.length} results found
                    </h3>
                    <Link 
                      href={`/products?search=${encodeURIComponent(currentQuery)}`}
                      className="text-xs text-secondary hover:underline"
                      onClick={onClose}
                    >
                      View all results
                    </Link>
                  </div>

                  <div className="space-y-2 pt-2">
                    {searchResults.map((product) => (
                      <ProductPreview key={product._id} product={product} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 