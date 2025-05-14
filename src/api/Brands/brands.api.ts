import { client } from "@/sanity/lib/client";
import { brandQuery, searchBrandQuery } from "../GROQ/Queries";

export const getBrands = async () => {
  const brands = await client.fetch(brandQuery);
  return brands;
};

export const getBrandsBySearch = async (searchQuery: string) => {
  const brands = await client.fetch(searchBrandQuery, { searchQuery });
  return brands;
};
