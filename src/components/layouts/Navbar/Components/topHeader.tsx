"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Phone,
  Clock,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function TopHeader() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initialize
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Toggle top header visibility on mobile
  const toggleHeader = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Mobile Toggle Button - Only visible on mobile */}
      {isMobile && (
        <button
          onClick={toggleHeader}
          className="w-full flex items-center justify-center bg-primary py-1 text-white"
          aria-expanded={isExpanded}
          aria-controls="top-header-content"
        >
          <span className="text-xs font-medium mr-1">Quick Info</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}

      {/* Top Header Content */}
      <section
        id="top-header-content"
        className={`w-full bg-primary text-white overflow-hidden transition-all duration-300 ease-in-out ${
          isMobile && !isExpanded ? "max-h-0" : "max-h-96"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 md:px-6 py-2">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 mb-3 md:mb-0 text-sm">
              <div className="flex items-center gap-1.5" aria-label="Phone">
                <Phone className="w-3.5 h-3.5 text-white opacity-80" />
                <a href="tel:+18001234567" className="hover:underline">
                  +977 9800000000
                </a>
              </div>
              <div className="flex items-center gap-1.5" aria-label="Email">
                <Mail className="w-3.5 h-3.5 text-white opacity-80" />
                <a
                  href="mailto:contact@medeqip.com"
                  className="hover:underline"
                >
                  contact@medeqip.com
                </a>
              </div>
              <div
                className="flex items-center gap-1.5"
                aria-label="Business hours"
              >
                <Clock className="w-3.5 h-3.5 text-white opacity-80" />
                <span>Mon-Fri: 9AM-5PM EST</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Twitter page"
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn page"
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our YouTube channel"
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
