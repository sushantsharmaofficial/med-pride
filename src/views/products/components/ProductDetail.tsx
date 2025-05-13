"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface SanityImageAsset {
  _ref?: string;
  _type?: string;
}

interface SanityImage {
  _type: string;
  asset: SanityImageAsset;
}

interface ProductVariationField {
  _key?: string;
  name?: string;
  key?: string;
  value?: string;
}

interface ProductVariation {
  _key: string;
  label: string;
  fields: ProductVariationField[];
}

interface SanityBlockChild {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
}

interface SanityMarkDef {
  _key: string;
  _type: string;
  [key: string]: unknown;
}

interface SanityBlock {
  _key?: string;
  _type?: string;
  children?: SanityBlockChild[];
  markDefs?: SanityMarkDef[];
  style?: string;
}

export interface ProductDetailData {
  _id?: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug?: { current: string };
  brand?: { name: string };
  department?: { name: string };
  description?: SanityBlock[];
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  variations?: ProductVariation[];
}

interface ProductDetailProps {
  product: ProductDetailData;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState<SanityImage | undefined>(
    product.mainImage
  );

  // Function to get unique field names across all variations
  const getUniqueFieldNames = () => {
    if (!product.variations || product.variations.length === 0) return [];

    const allFields = product.variations.flatMap((v) =>
      v.fields.map((field) => field.key)
    );

    return [...new Set(allFields)].filter(Boolean) as string[];
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section - Larger and more prominent */}
        <div className="lg:w-2/5 relative">
          {/* Main large image */}
          <div className="relative h-[50vh] lg:h-[90vh] bg-gray-50">
            {selectedImage && (
              <Image
                src={urlFor(selectedImage.asset).url()}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>

          {/* Gallery thumbnails - horizontal layout below main image on mobile, vertical on desktop */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="flex lg:absolute lg:bottom-4 lg:left-4 lg:right-4 overflow-x-auto p-2 bg-white bg-opacity-80 rounded-md">
              {/* Main image thumbnail */}
              {product.mainImage && (
                <button
                  onClick={() => setSelectedImage(product.mainImage)}
                  className={`flex-shrink-0 w-20 h-20 m-1 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === product.mainImage
                      ? "border-secondary scale-105"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={urlFor(product.mainImage.asset).url()}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              )}

              {/* Gallery thumbnails */}
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`flex-shrink-0 w-20 h-20 m-1 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === image
                      ? "border-secondary scale-105"
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={urlFor(image.asset).url()}
                      alt={`${product.title} - image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="lg:w-3/5 p-6 lg:p-10 flex flex-col">
          <div className="flex flex-col h-full">
            <div className="mb-6">
              {/* Category and actions */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {product.department && (
                    <span className="text-sm font-medium border border-secondary hover:bg-secondary hover:text-white transition-colors text-secondary px-3 py-1 rounded-full">
                      {product.department.name}
                    </span>
                  )}
                </div>
                <button className="text-gray-400 hover:text-secondary transition-colors p-2">
                  <Heart className="h-6 w-6" />
                </button>
              </div>

              {/* Product title */}
              <h1 className="text-3xl lg:text-4xl font-secondary font-bold text-primary mb-3">
                {product.title}
              </h1>

              {/* Brand */}
              {product.brand && (
                <div className="text-lg text-gray-600 mb-6">
                  By{" "}
                  <span className="font-medium text-secondary">
                    {product.brand.name}
                  </span>
                </div>
              )}

              {/* Product description */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-primary mb-3">
                  Description
                </h3>
                <div className="text-gray-600 prose max-w-none">
                  {product.description ? (
                    <>
                      {/* This is a simplified approach - ideally you'd use a Portable Text renderer */}
                      {product.description.map(
                        (block: SanityBlock, blockIndex) =>
                          block.children?.map(
                            (child: SanityBlockChild, i: number) => (
                              <p key={`${blockIndex}-${i}`} className="mb-3">
                                {child.text}
                              </p>
                            )
                          )
                      )}
                    </>
                  ) : (
                    <p>No description available.</p>
                  )}
                </div>
              </div>

              {/* Product variations */}
              {product.variations && product.variations.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-primary mb-3">
                    Product Specifications
                  </h3>

                  {/* Variations table */}
                  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {getUniqueFieldNames().map((fieldKey) => {
                            // Format the header text: capitalize first letter and handle spacing
                            let headerText = fieldKey;

                            // Handle cases like "REF No." or "REF NO"
                            if (fieldKey.toUpperCase().includes("REF")) {
                              headerText = "REF No.";
                            } else {
                              // Basic formatting: capitalize first letter
                              headerText =
                                fieldKey.charAt(0).toUpperCase() +
                                fieldKey.slice(1);
                            }

                            return (
                              <th
                                key={fieldKey}
                                scope="col"
                                className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {headerText}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {product.variations.map((variation) => (
                          <tr
                            key={variation._key}
                            className={`transition-colors cursor-pointer bg-gray-50`}
                          >
                            {getUniqueFieldNames().map((fieldKey) => {
                              const field = variation.fields.find(
                                (f) => f.key === fieldKey
                              );
                              return (
                                <td
                                  key={`${variation._key}-${fieldKey}`}
                                  className="py-3 px-4 text-sm text-gray-700 font-medium"
                                >
                                  {field?.value || "-"}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              <button className="py-3 px-6 border border-secondary text-secondary font-medium rounded-lg hover:bg-secondary hover:text-white transition-colors">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
