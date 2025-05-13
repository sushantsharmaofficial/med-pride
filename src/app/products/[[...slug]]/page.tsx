import React from "react";
import { getProductBySlug, getProducts } from "@/api/Products/product.api";
import ProductsPage from "@/views/products/products-page";
import ProductDetailPage from "@/views/products/ProductDetailPage";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

// Define the product type to match what's returned by API
interface ProductType {
  _id?: string;
  title: string;
  slug: { current: string };
  brand?: { name: string };
  department?: { name: string };
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slugArray = resolvedParams.slug || [];

  // Default metadata for product listing
  let title = "Medical Equipment";
  let description = "Browse our selection of high-quality medical equipment";

  // If this is a product detail page
  if (slugArray.length === 2 && slugArray[0] === "item") {
    try {
      const productSlug = slugArray[1];
      const product = await getProductBySlug(productSlug);
      
      if (product) {
        title = product.title;
        description = `${product.title} by ${product.brand?.name}${product.department?.name ? ` - ${product.department.name}` : ''}`;
      }
    } catch (error) {
      console.error("Error fetching product metadata:", error);
    }
  }
  // If this is a category page
  else if (slugArray.length === 2 && slugArray[0] === "category") {
    const categoryName = slugArray[1]
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    title = `${categoryName} Equipment`;
    description = `Browse our selection of high-quality ${categoryName} equipment`;
  }
  // If this is a brand page
  else if (slugArray.length === 2 && slugArray[0] === "brand") {
    const brandName = slugArray[1]
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    
    title = `${brandName} Medical Equipment`;
    description = `Explore medical equipment from ${brandName}`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    }
  };
}

// Implement generateStaticParams to pre-render common routes
export async function generateStaticParams() {
  // Get all products for static generation
  const products = await getProducts() as ProductType[];
  
  // Create params for main products page and product detail pages
  const params = [
    { slug: [] }, // Main products page
    ...products.map((product: ProductType) => ({
      slug: ['item', product.slug.current]
    }))
  ];
  
  return params;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // We need to await the params.slug to resolve it - this is a NextJS requirement
  const resolvedParams = await Promise.resolve(params);
  // Safely handle slug, ensuring it's an array
  const slugArray = resolvedParams.slug || [];
  
  // Handle the case when we're on a specific product page
  if (slugArray.length === 2 && slugArray[0] === "item") {
    try {
      const productSlug = slugArray[1];
      const product = await getProductBySlug(productSlug);
      
      // Only render if product is found
      if (product) {
        return <ProductDetailPage product={product} />;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      // Fall through to default view if there's an error
    }
  }

  // For main products page, category, brand, or if product is not found
  return <ProductsPage params={{ slug: slugArray }} />;
} 