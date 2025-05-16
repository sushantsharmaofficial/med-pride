"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import ProductsDropdown from "./ProductsDropdown";
import { useState } from "react";
import RequestQuoteButton from "@/components/common/RequestQuoteButton";

interface DesktopNavbarProps {
  scrolled: boolean;
}

export default function DesktopNavbar({ scrolled }: DesktopNavbarProps) {
  const [productsHovered, setProductsHovered] = useState(false);

  // Handler to close dropdown when an option is clicked
  const handleProductOptionClick = () => {
    setProductsHovered(false);
  };

  return (
    <div
      className={`
        hidden lg:flex bg-white shadow-md items-center justify-between 
        transition-all duration-300 ease-out transform-gpu
        ${scrolled ? "h-16 py-1" : "h-[98px] py-2"}
      `}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 md:px-6">
        <div
          className="w-auto transition-transform duration-700 ease-out transform-gpu origin-left"
          style={{
            transform: scrolled ? "scale(0.75)" : "scale(1)",
          }}
        >
          <Link href="/" aria-label="Home page">
            <Image
              src="https://www.medequip-uk.com/images/rgb_mqp-logo-2022_240px@2x.png?v=09.01.2023"
              alt="Medequip logo"
              width={240}
              height={200}
              className="transition-transform duration-300"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-8 lg:gap-16">
          <div
            className="relative"
            onMouseEnter={() => setProductsHovered(true)}
            onMouseLeave={() => setProductsHovered(false)}
          >
            <div
              className="flex items-center cursor-pointer link font-fira-sans transition-all duration-300"
              aria-expanded={productsHovered}
              aria-haspopup="true"
            >
              <Link href="/products">Products</Link>
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                  productsHovered ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </div>

            <ProductsDropdown
              isVisible={productsHovered}
              onOptionClick={handleProductOptionClick}
            />
          </div>

          <Link
            href="/catalog"
            className="link font-fira-sans transition-all duration-300"
          >
            Catalog
          </Link>
          <Link
            href="/brands"
            className="link font-fira-sans transition-all duration-300"
          >
            Brands
          </Link>
          <Link
            href="/blog"
            className="link font-fira-sans transition-all duration-300"
          >
            Blog
          </Link>
        </div>
        <div className="flex items-center justify-end gap-4 lg:gap-6 text-black">
          <button
            aria-label="Search"
            className="flex items-center hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-primary border rounded-full p-3 group border-primary hover:border-secondary cursor-pointer shadow-pop-sm"
          >
            <Search className="w-5 h-5" />
          </button>
          <RequestQuoteButton variant="desktop" />
        </div>
      </div>
    </div>
  );
}
