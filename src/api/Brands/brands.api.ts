import { client } from "@/sanity/lib/client";
import { brandQuery } from "../GROQ/Queries";

export const getBrands = async () => {
  const brands = await client.fetch(brandQuery);
  return brands;
};
