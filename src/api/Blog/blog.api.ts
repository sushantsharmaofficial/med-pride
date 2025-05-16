import { client } from "@/sanity/lib/client";
import { blogBySlugQuery, blogQuery, blogBySearchQuery } from "../GROQ/Queries";

export interface Blog {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _type: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  author: string;
  mainImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  publishedAt: string;
  content: unknown[];
  relatedProducts?: {
    _key: string;
    _ref: string;
    _type: string;
  }[];
}

export async function getBlogs(): Promise<Blog[]> {
  return await client.fetch(blogQuery);
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  return await client.fetch(blogBySlugQuery, { slug });
}

export interface BlogSearchParams {
  searchQuery: string;
}

export async function getBlogsBySearch({ searchQuery }: BlogSearchParams): Promise<Blog[]> {
  return await client.fetch(blogBySearchQuery, { searchQuery: `*${searchQuery}*` });
}
