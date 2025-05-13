"use client";

import React, { Suspense } from "react";
import ProductDetailWrapper from "@/views/products/components/ProductDetailWrapper";
import { ProductDetailData } from "@/views/products/components/ProductDetail";
import Loader from "@/components/ui/loader";
import ProductNotFound from "./components/productNotFound";
import Breadcrumb, { BreadcrumbItem } from "@/components/ui/Breadcrumb";

interface ProductDetailPageProps {
  product: ProductDetailData | null;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  
  // Handle case when product is not found
  if (!product) {
    return (
      <ProductNotFound />
    );
  }

  // Create breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" }
  ];

  // Add department if available
  if (product.department) {
    breadcrumbItems.push({
      label: product.department.name,
      href: `/products/category/${product.department.name.toLowerCase().replace(/ /g, "-")}`
    });
  }

  // Add current product
  breadcrumbItems.push({
    label: product.title,
    isCurrent: true
  });

  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-xl shadow-md overflow-hidden min-h-[50vh] flex items-center justify-center">
          <Loader
            variant="secondary"
            size="large"
            type="medical"
            text="Loading product details..."
          />
        </div>
      }
    >
      <div className="min-h-screen bg-gray-50">
        {/* Use the new Breadcrumb component */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Product detail section */}
        <section className="container mx-auto px-4 py-6">
          <ProductDetailWrapper product={product} />
        </section>

        {/* Schema.org structured data for improved SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.title,
              description:
                product.description
                  ?.flatMap((block) =>
                    block.children?.map((child) => child.text)
                  )
                  .join(" ") || "",
              brand: {
                "@type": "Brand",
                name: product.brand?.name || "",
              },
              category: product.department?.name || "",
              image: product.mainImage
                ? `${
                    product.mainImage._type === "image" &&
                    product.mainImage.asset._ref
                      ? "https://cdn.sanity.io/images/" +
                        product.mainImage.asset._ref
                          .replace("image-", "")
                          .replace("-jpg", ".jpg")
                      : ""
                  }`
                : "",
            }),
          }}
        />
      </div>
    </Suspense>
  );
}
