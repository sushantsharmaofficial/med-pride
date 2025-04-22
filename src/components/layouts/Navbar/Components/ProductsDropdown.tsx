"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Categories for the dropdown (matching those in the SideFilter)
const productCategories = [
  {
    id: "diagnostic",
    name: "Diagnostic Equipment",
    count: 124,
    slug: "diagnostic-equipment",
  },
  {
    id: "surgical",
    name: "Surgical Instruments",
    count: 98,
    slug: "surgical-instruments",
  },
  {
    id: "monitoring",
    name: "Monitoring Devices",
    count: 76,
    slug: "monitoring-devices",
  },
  {
    id: "imaging",
    name: "Imaging Systems",
    count: 52,
    slug: "imaging-systems",
  },
  {
    id: "laboratory",
    name: "Laboratory Equipment",
    count: 87,
    slug: "laboratory-equipment",
  },
  {
    id: "dental",
    name: "Dental Equipment",
    count: 63,
    slug: "dental-equipment",
  },
  {
    id: "physiotherapy",
    name: "Physiotherapy Equipment",
    count: 45,
    slug: "physiotherapy-equipment",
  },
  {
    id: "emergency",
    name: "Emergency Care",
    count: 38,
    slug: "emergency-care",
  },
];

// Brands for the dropdown
const brands = [
  {
    id: "siemens",
    name: "Siemens Healthineers",
    count: 42,
    slug: "siemens-healthineers",
  },
  {
    id: "philips",
    name: "Philips Healthcare",
    count: 38,
    slug: "philips-healthcare",
  },
  { id: "ge", name: "GE Healthcare", count: 35, slug: "ge-healthcare" },
  { id: "medtronic", name: "Medtronic", count: 29, slug: "medtronic" },
  { id: "drager", name: "Drager", count: 24, slug: "drager" },
  { id: "zeiss", name: "Carl Zeiss", count: 18, slug: "carl-zeiss" },
];

interface ProductsDropdownProps {
  isVisible: boolean;
}

export default function ProductsDropdown({ isVisible }: ProductsDropdownProps) {
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
                Categories
              </h4>
              <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {productCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/category/${category.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-secondary transition-colors duration-200"
                  >
                    <span className="font-medium text-sm">{category.name}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Brands Section */}
            <div>
              <h4 className="text-lg font-secondary font-medium text-primary border-b border-gray-200 pb-2 mb-3">
                Brands
              </h4>
              <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/products/brand/${brand.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-secondary transition-colors duration-200"
                  >
                    <span className="font-medium text-sm">{brand.name}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">
                      {brand.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <Link
              href="/products"
              className="text-sm text-primary hover:text-secondary font-medium flex items-center transition-colors duration-200"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>

            <Link
              href="/catalog"
              className="text-sm text-primary hover:text-secondary font-medium flex items-center transition-colors duration-200"
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
