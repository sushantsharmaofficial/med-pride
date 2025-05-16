"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDepartments, getDepartmentCount } from "@/api/Departments/departments.api";
import { getBrands, getBrandCount } from "@/api/Brands/brands.api";
import { Loader } from "@/components/ui";
interface Department {
  _id: string;
  name: string;
  slug: string;
  count?: number;
}

interface Brand {
  _id: string;
  name: string;
  slug: string;
  count?: number;
}

interface ProductsDropdownProps {
  isVisible: boolean;
  onOptionClick?: () => void;
}

export default function ProductsDropdown({
  isVisible,
  onOptionClick,
}: ProductsDropdownProps) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch departments
        const departmentsData = await getDepartments();
        
        // Fetch department counts and add to department objects
        const departmentsWithCounts = await Promise.all(
          departmentsData.map(async (dept: Department) => {
            const count = await getDepartmentCount(dept._id);
            return { ...dept, count };
          })
        );
        
        setDepartments(departmentsWithCounts);
        
        // Fetch brands
        const brandsData = await getBrands();
        
        // Fetch brand counts and add to brand objects
        const brandsWithCounts = await Promise.all(
          brandsData.map(async (brand: Brand) => {
            const count = await getBrandCount(brand._id);
            return { ...brand, count };
          })
        );
        
        setBrands(brandsWithCounts);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      fetchData();
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute left-0 mt-2 w-[600px] rounded-lg shadow-lg bg-white border border-gray-100 overflow-hidden z-50"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white">
            <h3 className="font-secondary text-xl font-medium">
              Medical Equipment
            </h3>
            <p className="text-sm opacity-90">
              Find the right equipment for your healthcare facility
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 p-6">
            {/* Categories Section */}
            <div>
              <h4 className="text-lg font-secondary font-medium text-primary border-b border-gray-200 pb-2 mb-3">
                Departments
              </h4>
              <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {loading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader/>
                  </div>
                ) : (
                  departments.map((department) => (
                    <Link
                      key={department._id}
                      href={`/products/department/${department.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-secondary transition-colors duration-200"
                      onClick={onOptionClick}
                    >
                      <span className="font-medium text-sm">{department.name}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">
                        {department.count || 0}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Brands Section */}
            <div>
              <h4 className="text-lg font-secondary font-medium text-primary border-b border-gray-200 pb-2 mb-3">
                Brands
              </h4>
              <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {loading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader/>
                  </div>
                ) : (
                  brands.map((brand) => (
                    <Link
                      key={brand._id}
                      href={`/products/brand/${brand.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-secondary transition-colors duration-200"
                      onClick={onOptionClick}
                    >
                      <span className="font-medium text-sm">{brand.name}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">
                        {brand.count || 0}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <Link
              href="/products"
              className="text-sm text-primary hover:text-secondary font-medium flex items-center transition-colors duration-200"
              onClick={onOptionClick}
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>

            <Link
              href="/catalog"
              className="text-sm text-primary hover:text-secondary font-medium flex items-center transition-colors duration-200"
              onClick={onOptionClick}
            >
              <span>Browse Catalog</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
