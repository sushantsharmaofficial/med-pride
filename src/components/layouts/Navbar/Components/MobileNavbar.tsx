"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  Search,
  X,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import categories and brands from ProductsDropdown
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

interface MobileNavbarProps {
  scrolled: boolean;
}

export default function MobileNavbar({ scrolled }: MobileNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [categorySection, setCategorySection] = useState<
    "categories" | "brands"
  >("categories");

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // 1024px is lg breakpoint in Tailwind
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handler to close the menu and products dropdown
  const handleOptionClick = () => {
    setIsMenuOpen(false);
    setProductsOpen(false);
  };

  // Handler for closing only the products dropdown
  const handleProductOptionClick = () => {
    setProductsOpen(false);
  };

  const navItems = [
    { name: "Products", href: "/products", hasDropdown: true },
    { name: "Catalog", href: "/catalog", hasDropdown: false },
    { name: "Brands", href: "/brands", hasDropdown: false },
    { name: "Blog", href: "/blog", hasDropdown: false },
  ];

  return (
    <>
      <div
        className={`lg:hidden bg-white shadow-md flex items-center justify-between transition-all duration-300 ease-out ${
          scrolled ? "h-16 py-1" : "h-[118px] py-2"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div
            className="transition-transform duration-700 ease-out transform-gpu origin-left"
            style={{
              transform: scrolled ? "scale(0.75)" : "scale(1)",
            }}
          >
            <Link href="/">
              <Image
                src="https://www.medequip-uk.com/images/rgb_mqp-logo-2022_240px@2x.png?v=09.01.2023"
                alt="Medequip logo"
                width={180}
                height={160}
                className="transition-transform duration-300"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="flex items-center hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-primary border rounded-full p-2 group border-primary hover:border-secondary cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="flex items-center hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-primary border rounded-full p-2 group border-primary hover:border-secondary cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          >
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[90%] max-w-md bg-white shadow-xl overflow-y-auto z-10"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="p-4 flex items-center justify-between border-b">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src="https://www.medequip-uk.com/images/rgb_mqp-logo-2022_240px@2x.png?v=09.01.2023"
                    alt="Medequip logo"
                    width={140}
                    height={120}
                    priority
                  />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <nav className="py-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      {item.hasDropdown ? (
                        <div className="mb-3">
                          <button
                            onClick={() => setProductsOpen(!productsOpen)}
                            className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                            aria-expanded={productsOpen}
                            aria-controls={`${item.name.toLowerCase()}-dropdown`}
                          >
                            <span className="font-medium">{item.name}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                productsOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            id={`${item.name.toLowerCase()}-dropdown`}
                            className={`transition-all duration-300 overflow-hidden ${
                              productsOpen ? "max-h-[800px]" : "max-h-0"
                            }`}
                          >
                            {productsOpen && (
                              <div className="pt-2">
                                {/* Header similar to desktop dropdown */}
                                <div className="px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white">
                                  <h3 className="font-medium text-lg">
                                    Medical Equipment
                                  </h3>
                                  <p className="text-xs opacity-90">
                                    Find the right equipment for your healthcare
                                    facility
                                  </p>
                                </div>

                                {/* Category/Brand Tabs */}
                                <div className="flex border-b">
                                  <button
                                    onClick={() =>
                                      setCategorySection("categories")
                                    }
                                    className={`flex-1 py-2 text-sm font-medium ${
                                      categorySection === "categories"
                                        ? "text-secondary border-b-2 border-secondary"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    Categories
                                  </button>
                                  <button
                                    onClick={() => setCategorySection("brands")}
                                    className={`flex-1 py-2 text-sm font-medium ${
                                      categorySection === "brands"
                                        ? "text-secondary border-b-2 border-secondary"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    Brands
                                  </button>
                                </div>

                                {/* Categories or Brands Content */}
                                <div className="py-3 px-4">
                                  {categorySection === "categories" && (
                                    <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                                      {productCategories.map((category) => (
                                        <li key={category.id}>
                                          <Link
                                            href={`/products/category/${category.slug}`}
                                            className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-50 text-gray-700"
                                            onClick={handleOptionClick}
                                          >
                                            <span className="text-sm">
                                              {category.name}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">
                                              {category.count}
                                            </span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                  {categorySection === "brands" && (
                                    <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                                      {brands.map((brand) => (
                                        <li key={brand.id}>
                                          <Link
                                            href={`/products/brand/${brand.slug}`}
                                            className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-50 text-gray-700"
                                            onClick={handleOptionClick}
                                          >
                                            <span className="text-sm">
                                              {brand.name}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">
                                              {brand.count}
                                            </span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>

                                {/* Footer Actions */}
                                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                  <Link
                                    href="/products"
                                    className="text-sm text-primary hover:text-secondary font-medium flex items-center"
                                    onClick={handleProductOptionClick}
                                  >
                                    <span>View All</span>
                                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                                  </Link>
                                  <Link
                                    href="/catalog"
                                    className="text-sm text-primary hover:text-secondary font-medium flex items-center"
                                    onClick={handleProductOptionClick}
                                  >
                                    <span>Catalog</span>
                                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="px-4 py-3 border-t">
                <Link
                  href="/quote"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-secondary text-white rounded-3xl font-medium shadow-md hover:bg-primary transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Request Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </div>

              <div className="px-4 py-6 border-t">
                <div className="flex items-center justify-center gap-4">
                  <Link
                    href="#"
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-secondary hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-secondary hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-secondary hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
