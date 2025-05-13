import React, { Suspense } from "react";
import ProductDetail, { ProductDetailData } from "./ProductDetail";
import Loader from "@/components/ui/loader";

interface ProductDetailWrapperProps {
  product: ProductDetailData;
}

const ProductDetailWrapper: React.FC<ProductDetailWrapperProps> = ({ product }) => {
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
      <ProductDetail product={product} />
    </Suspense>
  );
};

export default ProductDetailWrapper; 