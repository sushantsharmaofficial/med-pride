"use client";
import HeroSection from "./components/HeroSection/heroSection";
import CategoryPage from "./components/CategorySection/categorySection";
import ShowcaseSection from "./components/ShowcaseSection/showCaseSection";
import MostSearchedProducts from "./components/mostSearchedProducts/mostSearchedProducts";
import BestSellingProducts from "./components/bestSellingProducts/bestSellingProducts";
export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <CategoryPage />
      <MostSearchedProducts />
      <BestSellingProducts />
      <ShowcaseSection />
    </div>
  );
}
