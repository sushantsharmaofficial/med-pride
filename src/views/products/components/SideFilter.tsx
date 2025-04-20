"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";

// Define filter categories
const categories = [
  { id: "diagnostic", name: "Diagnostic Equipment", count: 124 },
  { id: "surgical", name: "Surgical Instruments", count: 98 },
  { id: "monitoring", name: "Monitoring Devices", count: 76 },
  { id: "imaging", name: "Imaging Systems", count: 52 },
  { id: "laboratory", name: "Laboratory Equipment", count: 87 },
  { id: "dental", name: "Dental Equipment", count: 63 },
  { id: "physiotherapy", name: "Physiotherapy Equipment", count: 45 },
  { id: "emergency", name: "Emergency Care", count: 38 },
];

// Define brands
const brands = [
  { id: "siemens", name: "Siemens Healthineers", count: 42 },
  { id: "philips", name: "Philips Healthcare", count: 38 },
  { id: "ge", name: "GE Healthcare", count: 35 },
  { id: "medtronic", name: "Medtronic", count: 29 },
  { id: "drager", name: "Drager", count: 24 },
  { id: "zeiss", name: "Carl Zeiss", count: 18 },
  { id: "bpl", name: "BPL Medical", count: 15 },
  { id: "mindray", name: "Mindray", count: 12 },
];

// Define price ranges
const priceRanges = [
  { id: "under1000", name: "Under $1,000", count: 64 },
  { id: "1000to5000", name: "$1,000 - $5,000", count: 128 },
  { id: "5000to10000", name: "$5,000 - $10,000", count: 86 },
  { id: "10000to50000", name: "$10,000 - $50,000", count: 52 },
  { id: "over50000", name: "Over $50,000", count: 23 },
];

// Proper type for filters
interface FilterState {
  categories?: string[];
  brands?: string[];
  priceRanges?: string[];
}

interface FilterGroupProps {
  title: string;
  items: { id: string; name: string; count: number }[];
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  isExpanded?: boolean;
}

function FilterGroup({
  title,
  items,
  selectedItems,
  onToggleItem,
  isExpanded = true,
}: FilterGroupProps) {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <div className="mb-7">
      <div
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="font-secondary text-lg font-medium text-primary">
          {title}
        </h3>
        {expanded ? (
          <ChevronDown className="h-5 w-5 text-secondary" />
        ) : (
          <ChevronRight className="h-5 w-5 text-secondary" />
        )}
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3 pl-1"
        >
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id={`filter-${title}-${item.id}`}
                    name={`filter-${title}-${item.id}`}
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => onToggleItem(item.id)}
                    className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                  />
                </div>
                <div className="ml-2 text-sm leading-6">
                  <label
                    htmlFor={`filter-${title}-${item.id}`}
                    className="text-sm text-gray-700 flex justify-between w-full cursor-pointer hover:text-secondary transition-colors"
                  >
                    <span>{item.name}</span>
                    <span className="text-gray-500 ml-2">({item.count})</span>
                  </label>
                </div>
              </div>
            </div>
          ))}

          {items.length > 6 && (
            <button className="text-sm text-secondary hover:text-secondary-dark font-medium mt-2 transition-colors">
              See all
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}

interface SideFilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

export default function SideFilter({ onFilterChange }: SideFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const handleToggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleBrand = (id: string) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTogglePriceRange = (id: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        categories: selectedCategories,
        brands: selectedBrands,
        priceRanges: selectedPriceRanges,
      });
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRanges([]);

    if (onFilterChange) {
      onFilterChange({
        categories: [],
        brands: [],
        priceRanges: [],
      });
    }
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedPriceRanges.length > 0;

  return (
    <motion.div
      className="border rounded-xl p-6 bg-white shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-7">
        <h2 className="font-secondary text-xl font-medium text-primary">
          Filters
        </h2>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-secondary" />
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <FilterGroup
        title="Categories"
        items={categories}
        selectedItems={selectedCategories}
        onToggleItem={handleToggleCategory}
      />

      <FilterGroup
        title="Brands"
        items={brands}
        selectedItems={selectedBrands}
        onToggleItem={handleToggleBrand}
      />

      <FilterGroup
        title="Price Range"
        items={priceRanges}
        selectedItems={selectedPriceRanges}
        onToggleItem={handleTogglePriceRange}
      />

      <button
        onClick={handleApplyFilters}
        className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white rounded-lg font-medium transition-all duration-300 mt-6"
      >
        Apply Filters
      </button>
    </motion.div>
  );
}
