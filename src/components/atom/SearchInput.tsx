"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { motion } from "motion/react";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchInput({
  placeholder = "Search products...",
  onSearch,
  className = "",
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
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
            onChange={(e) => setQuery(e.target.value)}
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

        <motion.button
          type="submit"
          className="absolute right-0 top-0 h-full px-4 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-r-xl transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Search
        </motion.button>
      </form>
    </motion.div>
  );
}
