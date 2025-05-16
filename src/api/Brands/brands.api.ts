import { client } from "@/sanity/lib/client";
import { brandQuery, searchBrandQuery, brandCountQuery } from "../GROQ/Queries";

export const getBrands = async () => {
  const brands = await client.fetch(brandQuery);
  return brands;
};

export const getBrandsBySearch = async (searchQuery: string) => {
  const brands = await client.fetch(searchBrandQuery, { searchQuery });
  return brands;
};

export const getBrandCount = async (brandId: string) => {
  const count = await client.fetch(brandCountQuery, { brandId });
  return count;
};
