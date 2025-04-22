"use client";

import React, { useState, useEffect } from "react";
import TopHeader from "./Components/topHeader";
import DesktopNavbar from "./Components/DesktopNavbar";
import MobileNavbar from "./Components/MobileNavbar";

export default function MainNavbar() {
  const [scrolled, setScrolled] = useState(false);

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
        <DesktopNavbar scrolled={scrolled} />
        <MobileNavbar scrolled={scrolled} />
      </div>
    </nav>
  );
}
