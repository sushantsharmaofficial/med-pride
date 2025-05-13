import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { urlFor } from "@/sanity/lib/image";

interface SanityImageAsset {
  _ref?: string;
  _type?: string;
}

interface Product {
  _id?: string;
  title: string;
  brand?: { name: string };
  department?: { name: string };
  mainImage?: { _type: string; asset: SanityImageAsset };
  slug: { current: string };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex justify-center">
      <Link
        href={`/products/item/${product.slug.current}`}
        className="block"
      >
        <CardContainer
          className="inter-var"
          containerClassName="py-4"
        >
          <CardBody className="bg-white relative group/card border-black/[0.1] w-[20rem] md:w-[300px] h-[360px] rounded-xl p-4 border shadow-pop-sm hover:shadow-lg transition-shadow duration-300">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                {product.department?.name}
              </span>
            </div>
            <CardItem
              translateZ="50"
              className="text-lg font-bold text-primary font-primary line-clamp-1"
            >
              {product.title}
            </CardItem>
            <CardItem
              translateZ="30"
              className="text-neutral-500 text-sm mt-1 font-secondary"
            >
              {product.brand?.name}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <div className="relative h-44 w-full">
                {product.mainImage && (
                  <Image
                    src={urlFor(product.mainImage.asset as SanityImageAsset).url()}
                    fill
                    className="object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={product.title}
                  />
                )}
              </div>
            </CardItem>
            <div className="flex items-center mt-auto pt-4">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-primary hover:bg-secondary transition-colors text-white text-xs font-bold"
              >
                Request Quote
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </Link>
    </div>
  );
};

export default ProductCard; 