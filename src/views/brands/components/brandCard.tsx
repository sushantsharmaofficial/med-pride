import React from 'react'
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { PortableTextBlock } from "@portabletext/types";

interface BrandProps {
  brand: {
    _id: string;
    name: string;
    logo: string;
    description: PortableTextBlock[] | undefined;
  };
}

export default function BrandCard({ brand }: BrandProps) {
  return (
    <div
    className="bg-white rounded-xl overflow-hidden shadow-pop-lg"
  >
    <div className="h-52 overflow-hidden">
      <Image
        src={urlFor(brand.logo).url()}
        alt={brand.name}
        width={600}
        height={400}
        className="w-full h-full object-contain transition-all duration-500 hover:scale-110"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-primary text-primary mb-2">
        {brand.name}
      </h3>
      <div className="text-gray-600 font-secondary mb-4">
        {brand.description ? (
          <div>
            {brand.description.length > 0 ? (
              typeof brand.description[0].children === 'object' ? (
                <p>
                  {brand.description[0].children[0]?.text
                    ?.split(' ')
                    .slice(0, 10)
                    .join(' ')}
                  {brand.description[0].children[0]?.text?.split(' ').length > 10 ? '...' : ''}
                </p>
              ) : (
                <PortableText value={brand.description} />
              )
            ) : (
              <p>No description available.</p>
            )}
          </div>
        ) : (
          <p>No description available.</p>
        )}
      </div>
      <Link
        href={""}
        target="_blank"
        className="inline-block bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors duration-300 font-primary"
      >
        Visit Website
      </Link>
    </div>
  </div>
  )
}
