"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Filter, X, Sparkles } from "lucide-react";

// Define filter categories
const defaultCategories = [
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
const defaultBrands = [
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
const defaultPriceRanges = [
  { id: "under1000", name: "Under $1,000", count: 64 },
  { id: "1000to5000", name: "$1,000 - $5,000", count: 128 },
  { id: "5000to10000", name: "$5,000 - $10,000", count: 86 },
  { id: "10000to50000", name: "$10,000 - $50,000", count: 52 },
  { id: "over50000", name: "Over $50,000", count: 23 },
];

// Proper type for filters
export interface FilterState {
  categories?: string[];
  brands?: string[];
  priceRanges?: string[];
}

interface FilterItem {
  id: string;
  name: string;
  count: number;
}

interface FilterGroupProps {
  title: string;
  items: FilterItem[];
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
  const [visibleItems, setVisibleItems] = useState(6);
  const showMore = items.length > visibleItems;

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
          {items.slice(0, visibleItems).map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id={`filter-${title}-${item.id}`}
                    name={`filter-${title}-${item.id}`}
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => onToggleItem(item.id)}
                    className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
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

          {showMore && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setVisibleItems(items.length);
              }}
              className="text-sm text-secondary hover:text-secondary-dark font-medium mt-2 transition-colors"
            >
              See all {items.length} options
            </button>
          )}

          {visibleItems === items.length && items.length > 6 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setVisibleItems(6);
              }}
              className="text-sm text-secondary hover:text-secondary-dark font-medium mt-2 transition-colors"
            >
              Show less
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Mobile filter drawer component
interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: FilterItem[];
  brands: FilterItem[];
  priceRanges: FilterItem[];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedPriceRanges: string[];
  onToggleCategory: (id: string) => void;
  onToggleBrand: (id: string) => void;
  onTogglePriceRange: (id: string) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
}

function MobileFilterDrawer({
  isOpen,
  onClose,
  categories,
  brands,
  priceRanges,
  selectedCategories,
  selectedBrands,
  selectedPriceRanges,
  onToggleCategory,
  onToggleBrand,
  onTogglePriceRange,
  onClearFilters,
  onApplyFilters,
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedPriceRanges.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex md:hidden">
      <motion.div
        className="bg-white w-11/12 max-w-sm h-full flex flex-col"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="p-5 flex items-center justify-between">
            <h2 className="font-secondary text-xl font-medium text-primary flex items-center gap-2">
              <Filter className="h-5 w-5 text-secondary" />
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {hasActiveFilters && (
            <div className="px-5 pb-4 flex items-center justify-between border-b border-gray-100">
              <span className="text-sm text-gray-500">
                {selectedCategories.length +
                  selectedBrands.length +
                  selectedPriceRanges.length}{" "}
                filters applied
              </span>
              <button
                onClick={onClearFilters}
                className="text-sm text-secondary font-medium hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="p-5 flex-grow overflow-y-auto pb-24">
          <FilterGroup
            title="Categories"
            items={categories}
            selectedItems={selectedCategories}
            onToggleItem={onToggleCategory}
          />

          <FilterGroup
            title="Brands"
            items={brands}
            selectedItems={selectedBrands}
            onToggleItem={onToggleBrand}
          />

          <FilterGroup
            title="Price Range"
            items={priceRanges}
            selectedItems={selectedPriceRanges}
            onToggleItem={onTogglePriceRange}
          />
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-3 w-full">
          <button
            onClick={onClearFilters}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
          >
            Clear All
          </button>
          <button
            onClick={() => {
              onApplyFilters();
              onClose();
            }}
            className="flex-1 py-3 bg-secondary hover:bg-secondary-dark text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Apply Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Main ProductFilter component that includes both desktop and mobile versions
interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void;
  categories?: FilterItem[];
  brands?: FilterItem[];
  priceRanges?: FilterItem[];
  initialFilters?: FilterState;
  productCount?: number;
  isMobileFilterOpen?: boolean;
  onToggleMobileFilter?: () => void;
}

export default function ProductFilter({
  onFilterChange,
  categories = defaultCategories,
  brands = defaultBrands,
  priceRanges = defaultPriceRanges,
  initialFilters = {},
  productCount,
  isMobileFilterOpen = false,
  onToggleMobileFilter = () => {},
}: ProductFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters.categories || []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialFilters.brands || []
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(
    initialFilters.priceRanges || []
  );

  // Update local state when initialFilters changes
  useEffect(() => {
    setSelectedCategories(initialFilters.categories || []);
    setSelectedBrands(initialFilters.brands || []);
    setSelectedPriceRanges(initialFilters.priceRanges || []);
  }, [initialFilters]);

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
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRanges: selectedPriceRanges,
    });
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    onFilterChange({
      categories: [],
      brands: [],
      priceRanges: [],
    });
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedPriceRanges.length > 0;

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <button
          onClick={onToggleMobileFilter}
          className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm border border-gray-200 text-primary hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-5 w-5 text-secondary" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-xs font-bold text-white bg-secondary rounded-full">
              {selectedCategories.length +
                selectedBrands.length +
                selectedPriceRanges.length}
            </span>
          )}
        </button>

        {productCount !== undefined && (
          <div className="text-sm font-medium text-gray-600">
            {productCount} products
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={onToggleMobileFilter}
        categories={categories}
        brands={brands}
        priceRanges={priceRanges}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        selectedPriceRanges={selectedPriceRanges}
        onToggleCategory={handleToggleCategory}
        onToggleBrand={handleToggleBrand}
        onTogglePriceRange={handleTogglePriceRange}
        onClearFilters={handleClearFilters}
        onApplyFilters={handleApplyFilters}
      />

      {/* Desktop filter sidebar */}
      <div className="hidden md:block h-fit sticky top-24">
        <motion.div
          className="border rounded-xl p-6 bg-white shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-7">
            <h2 className="font-secondary text-xl font-medium text-primary flex items-center gap-2">
              <Filter className="h-5 w-5 text-secondary" />
              Filters
            </h2>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-secondary hover:text-secondary-dark font-medium transition-colors flex items-center gap-1"
              >
                <X className="h-4 w-4 " />
                Clear All
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-100">
              {selectedCategories.map((id) => {
                const category = categories.find((c) => c.id === id);
                return (
                  category && (
                    <div
                      key={`selected-${id}`}
                      className="bg-secondary bg-opacity-10 px-2 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1"
                    >
                      {category.name}
                      <button
                        onClick={() => handleToggleCategory(id)}
                        className="hover:text-primary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                );
              })}
              {selectedBrands.map((id) => {
                const brand = brands.find((b) => b.id === id);
                return (
                  brand && (
                    <div
                      key={`selected-${id}`}
                      className="bg-primary bg-opacity-10 px-2 py-1 rounded-full text-xs font-medium text-primary flex items-center gap-1"
                    >
                      {brand.name}
                      <button
                        onClick={() => handleToggleBrand(id)}
                        className="hover:text-secondary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                );
              })}
            </div>
          )}

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
            className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white rounded-lg font-medium transition-all duration-300 mt-6 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Apply Filters
          </button>
        </motion.div>
      </div>
    </>
  );
}
