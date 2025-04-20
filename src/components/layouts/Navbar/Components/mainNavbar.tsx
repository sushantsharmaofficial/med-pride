"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import TopHeader from "./topHeader";
import Image from "next/image";
import { ArrowRight, ChevronDown, Heart, Search } from "lucide-react";
import ProductsDropdown from "../ProductsDropdown";

export default function MainNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [productsHovered, setProductsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Initialize scroll state
    handleScroll();

    // Add scroll event listener with throttling for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [scrolled]);

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        <TopHeader />
        <div
          className={`
            bg-white shadow-md flex items-center justify-between 
            transition-all duration-300 ease-out transform-gpu
            ${scrolled ? "h-16 py-1" : "h-28 py-2"}
          `}
        >
          <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 md:px-6">
            <div
              className="w-auto transition-transform duration-300 ease-out transform-gpu origin-left"
              style={{
                transform: scrolled ? "scale(0.75)" : "scale(1)",
              }}
            >
              <Link href="/">
                <Image
                  src="https://www.medequip-uk.com/images/rgb_mqp-logo-2022_240px@2x.png?v=09.01.2023"
                  alt="logo"
                  width={240}
                  height={200}
                  className="transition-transform duration-300"
                />
              </Link>
            </div>
            <div className="flex items-center gap-8 lg:gap-16">
              <div
                className="relative"
                onMouseEnter={() => setProductsHovered(true)}
                onMouseLeave={() => setProductsHovered(false)}
              >
                <div className="flex items-center cursor-pointer link font-fira-sans transition-all duration-300">
                  <Link href="/products">Products</Link>
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                      productsHovered ? "rotate-180" : ""
                    }`}
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
              <div className="flex items-center hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-primary border rounded-full p-3 group border-primary hover:border-secondary cursor-pointer">
                <Search className="w-5 h-5" />
              </div>
              <div
                className={`
                flex items-center hover:bg-secondary hover:text-white 
                transition-all duration-300 ease-out bg-transparent text-secondary
                border-2 rounded-3xl font-fira-sans font-bold group 
                border-secondary hover:border-secondary cursor-pointer
                ${scrolled ? "px-3 py-2 text-sm" : "px-4 py-3"}
              `}
              >
                Contact
                <ArrowRight
                  className={`
                  group-hover:translate-x-1 transition-all duration-300
                  ${scrolled ? "w-4 h-4 ml-1" : "w-5 h-5 ml-2"}
                `}
                />
              </div>

              <div className="flex items-center hover:bg-secondary hover:text-white transition-all duration-300 bg-transparent text-primary border rounded-full p-3 group border-primary hover:border-secondary cursor-pointer">
                <Heart className={scrolled ? "w-4 h-4" : "w-5 h-5"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
