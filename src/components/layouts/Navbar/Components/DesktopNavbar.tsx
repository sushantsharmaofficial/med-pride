"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Heart, Search, FileText } from "lucide-react";
import ProductsDropdown from "./ProductsDropdown";
import { useState } from "react";

interface DesktopNavbarProps {
  scrolled: boolean;
}

export default function DesktopNavbar({ scrolled }: DesktopNavbarProps) {
  const [productsHovered, setProductsHovered] = useState(false);

  return (
    <div
      className={`
        hidden lg:flex bg-white shadow-md items-center justify-between 
        transition-all duration-300 ease-out transform-gpu
        ${scrolled ? "h-16 py-1" : "h-28 py-2"}
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

            <ProductsDropdown isVisible={productsHovered} />
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
        <div className="flex items-center justify-end gap-4 lg:gap-8 text-black">
          <button
            aria-label="Search"
            className="flex items-center hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-primary border rounded-full p-3 group border-primary hover:border-secondary cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/quote"
            className={`
              flex items-center bg-secondary text-white 
              transition-all duration-300 ease-out
              border-none rounded-3xl font-fira-sans font-bold group 
              shadow-md hover:shadow-lg hover:bg-primary
              ${scrolled ? "px-4 py-2 text-sm" : "px-5 py-3 text-base"}
            `}
          >
            <FileText
              className={`
                mr-2 transition-all duration-300
                ${scrolled ? "w-3.5 h-3.5" : "w-4.5 h-4.5"}
              `}
              aria-hidden="true"
            />
            Request Quote
            <ArrowRight
              className={`
                ml-2 group-hover:translate-x-1 transition-all duration-300
                ${scrolled ? "w-3.5 h-3.5" : "w-4.5 h-4.5"}
              `}
              aria-hidden="true"
            />
          </Link>

          <button
            aria-label="Wishlist"
            className="flex items-center hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-primary border rounded-full p-3 group border-primary hover:border-secondary cursor-pointer"
          >
            <Heart className={scrolled ? "w-4 h-4" : "w-5 h-5"} />
          </button>
        </div>
      </div>
    </div>
  );
}
