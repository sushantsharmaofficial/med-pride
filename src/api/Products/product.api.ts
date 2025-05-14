import { client } from "@/sanity/lib/client";
import { productQuery, productBySlugQuery, filteredProductsQuery, brandQuery, departmentQuery, productBySearchQuery } from "../GROQ/Queries";

export const getProducts = async () => {
  const products = await client.fetch(productQuery);
  return products;
};

export const getProductBySlug = async (slug: string) => {
  const product = await client.fetch(productBySlugQuery, { slug });
  return product;
};

export const getBrands = async () => {
  const brands = await client.fetch(brandQuery);
  return brands;
};

export const getDepartments = async () => {
  const departments = await client.fetch(departmentQuery);
  return departments;
};

export interface FilterParams {
  brands?: string[];
  departments?: string[];
}

export const getFilteredProducts = async (filters: FilterParams) => {
  let brandFilter = '';
  let departmentFilter = '';

  // Build brand filter
  if (filters.brands && filters.brands.length > 0) {
    brandFilter = ` && brand._ref in [${filters.brands.map(id => `"${id}"`).join(',')}]`;
  }

  // Build department filter
  if (filters.departments && filters.departments.length > 0) {
    departmentFilter = ` && department._ref in [${filters.departments.map(id => `"${id}"`).join(',')}]`;
  }

  // Get filtered products using the query
  const products = await client.fetch(
    filteredProductsQuery
      .replace('$brandFilter', brandFilter)
      .replace('$departmentFilter', departmentFilter)
  );

  return products;
};

// Search Products

export interface SearchParams {
  searchQuery: string;
}

export const getProductsBySearch = async (searchParams: SearchParams) => {
  const products = await client.fetch(productBySearchQuery, searchParams);
  return products;
};

