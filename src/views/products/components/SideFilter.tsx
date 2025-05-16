"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";
import { getBrands } from "@/api/Products/product.api";
import { getBrandCount } from "@/api/Brands/brands.api";
import { getDepartments, getDepartmentCount } from "@/api/Departments/departments.api";

// Proper type for filters
export interface FilterState {
  departments?: string[];
  brands?: string[];
}

interface FilterItem {
  _id: string;
  name: string;
  count?: number;
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
            <div key={item._id} className="flex items-center gap-2">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id={`filter-${title}-${item._id}`}
                    name={`filter-${title}-${item._id}`}
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => onToggleItem(item._id)}
                    className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                  />
                </div>
                <div className="ml-2 text-sm leading-6 w-full">
                  <label
                    htmlFor={`filter-${title}-${item._id}`}
                    className="text-sm text-gray-700 flex  items-center justify-between w-full cursor-pointer hover:text-secondary transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.count !== undefined && (
                      <span className="text-blue-500 ml-2 self-end">({item.count})</span>
                    )}
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
  initialFilters?: FilterState;
}

export default function SideFilter({ 
  onFilterChange, 
  initialFilters = {}
}: SideFilterProps) {
  const [departments, setDepartments] = useState<FilterItem[]>([]);
  const [brands, setBrands] = useState<FilterItem[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(initialFilters.departments || []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialFilters.brands || []);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch departments and brands from Sanity
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const departmentsData = await getDepartments();
        const brandsData = await getBrands();
        
        // Fetch count for each brand
        const brandsWithCount = await Promise.all(
          brandsData.map(async (brand: FilterItem) => {
            const count = await getBrandCount(brand._id);
            return { ...brand, count };
          })
        );
        
        // Fetch count for each department
        const departmentsWithCount = await Promise.all(
          departmentsData.map(async (department: FilterItem) => {
            const count = await getDepartmentCount(department._id);
            return { ...department, count };
          })
        );
        
        setDepartments(departmentsWithCount);
        setBrands(brandsWithCount);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleDepartment = (id: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleBrand = (id: string) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        departments: selectedDepartments,
        brands: selectedBrands,
      });
    }
  };

  const handleClearFilters = () => {
    setSelectedDepartments([]);
    setSelectedBrands([]);

    if (onFilterChange) {
      onFilterChange({
        departments: [],
        brands: [],
      });
    }
  };

  const hasActiveFilters =
    selectedDepartments.length > 0 ||
    selectedBrands.length > 0;

  if (isLoading) {
    return (
      <div className="border rounded-xl p-6 bg-white shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-7"></div>
        <div className="space-y-5">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    );
  }

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
        title="Departments"
        items={departments}
        selectedItems={selectedDepartments}
        onToggleItem={handleToggleDepartment}
      />

      <FilterGroup
        title="Brands"
        items={brands}
        selectedItems={selectedBrands}
        onToggleItem={handleToggleBrand}
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
