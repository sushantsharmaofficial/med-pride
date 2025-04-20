"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Star, Heart } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  category: string;
  manufacturer: string;
  price?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export default function ProductCard({
  id,
  title,
  category,
  manufacturer,
  price = "Contact for price",
  image,
  rating,
  reviewCount,
  isNew,
  isFeatured,
}: ProductCardProps) {
  return (
    <motion.div
      className="group bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden border border-gray-100 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/products/${id}`} className="block h-full flex flex-col">
        <div className="relative h-52 overflow-hidden bg-gray-50">
          <div className="absolute inset-0 bg-gray-50 bg-opacity-50 group-hover:bg-opacity-20 transition-all duration-300"></div>
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />

          {isNew && (
            <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              NEW
            </div>
          )}

          {isFeatured && (
            <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              FEATURED
            </div>
          )}

          <button className="absolute bottom-3 right-3 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-400 hover:text-secondary transition-colors duration-300 shadow-sm hover:shadow transform hover:scale-105">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="text-xs font-medium text-gray-500 mb-2 flex items-center">
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-2">
              {category}
            </span>
            <span>{manufacturer}</span>
          </div>

          <h3 className="text-primary font-medium text-lg mb-3 line-clamp-2 leading-tight group-hover:text-secondary transition-colors duration-300">
            {title}
          </h3>

          {rating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 fill-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                {rating.toFixed(1)}{" "}
                <span className="text-gray-400">({reviewCount})</span>
              </span>
            </div>
          )}

          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="font-semibold text-secondary text-lg">{price}</div>
            <motion.div
              whileHover={{ x: 5 }}
              className="text-sm font-medium text-primary hover:text-secondary transition-colors flex items-center"
            >
              View Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
