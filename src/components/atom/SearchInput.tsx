"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { getProductsBySearch } from "@/api/Products/product.api";

// Define interfaces for Sanity data structures
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

// Define interface for Product based on the structure from the API
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

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string, results?: Product[]) => void;
  className?: string;
  liveSearch?: boolean;
}

export default function SearchInput({
  placeholder = "Search products...",
  onSearch,
  className = "",
  liveSearch = false,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const prevQueryRef = useRef("");

  // Effect for live search
  useEffect(() => {
    // Skip API calls if query is empty or unchanged
    if (liveSearch && onSearch && query !== prevQueryRef.current) {
      prevQueryRef.current = query;
      
      // Don't trigger search for empty queries
      if (query.trim() === "") {
        onSearch("");
        return;
      }
      
      // Only search if query has at least 2 characters
      if (query.trim().length < 2) {
        return;
      }
      
      const delaySearch = setTimeout(() => {
        onSearch(query);
      }, 500); // Increased delay to 500ms to reduce API calls

      return () => clearTimeout(delaySearch);
    }
  }, [query, onSearch, liveSearch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If live search is enabled or query is empty, don't do anything on form submit
    if (liveSearch || query.trim() === "") return;
    
    try {
      setIsSearching(true);
      
      // Call the API to search for products
      const searchResults = await getProductsBySearch({ searchQuery: query });
      
      // Call the parent component's onSearch handler with the query and results
      if (onSearch) {
        onSearch(query, searchResults);
      }
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    prevQueryRef.current = "";
    if (onSearch) {
      onSearch("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <motion.div
            className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="h-5 w-5" />
          </motion.div>

          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full py-3 pl-10 pr-10 rounded-xl text-sm border-2 outline-none transition-all duration-300 text-primary placeholder:text-gray-400 ${
              isFocused
                ? "border-secondary shadow-sm"
                : "border-gray-200 focus:border-secondary"
            }`}
            placeholder={placeholder}
          />

          {query && (
            <motion.button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-secondary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </div>

        {!liveSearch && (
          <motion.button
            type="submit"
            className={`absolute right-0 top-0 h-full px-4 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-r-xl transition-colors duration-300 ${
              isSearching ? "opacity-75 cursor-wait" : ""
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </motion.button>
        )}
      </form>
    </motion.div>
  );
}
