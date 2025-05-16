"use client";

import React, { useEffect, useState, useRef } from "react";

import HeroSection from "@/components/common/HeroSection";
import { Blog, getBlogs, getBlogsBySearch } from "@/api/Blog/blog.api";
import ProductNotFound from "../products/components/productNotFound";
import BlogCard from "./components/blogCard";
import { Loader } from "@/components/ui";

export default function BlogPage() {
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const allBlogsRef = useRef<Blog[]>([]);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  useEffect(() => {
    loadAllBlogs();
  }, []);

  const loadAllBlogs = async () => {
    if (initialDataLoaded && allBlogsRef.current.length > 0) {
      setFilteredBlogs(allBlogsRef.current);
      return;
    }

    setLoading(true);
    try {
      const data = await getBlogs();
      setFilteredBlogs(data);
      allBlogsRef.current = data;
      setInitialDataLoaded(true);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, searchResults?: Blog[]) => {
    // If search query is empty, reset to cached blogs
    if (!query.trim()) {
      setFilteredBlogs(allBlogsRef.current);
      return;
    }

    setLoading(true);

    try {
      // Try client-side filtering for simple queries
      if (query.trim().length <= 3) {
        const lowercaseQuery = query.toLowerCase();
        const filtered = allBlogsRef.current.filter(
          (blog) =>
            blog.title.toLowerCase().includes(lowercaseQuery) ||
            blog.author.toLowerCase().includes(lowercaseQuery)
        );

        // If we found matches client-side, use them without API call
        if (filtered.length > 0) {
          setFilteredBlogs(filtered);
          setLoading(false);
          return;
        }
      }

      // Fall back to API search for more complex queries
      if (searchResults) {
        // If search results are provided directly
        setFilteredBlogs(searchResults);
      } else {
        // Fallback to searching via API if results not provided
        const results = await getBlogsBySearch({ searchQuery: query });
        setFilteredBlogs(results);
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getExcerpt = (blog: Blog): string => {
    if (!blog.content || blog.content.length === 0) return 'Read our latest article';
    
    const firstBlock = blog.content[0];
    if (typeof firstBlock === 'object' && 
        firstBlock !== null && 
        '_type' in firstBlock && 
        firstBlock._type === 'block' && 
        'children' in firstBlock && 
        Array.isArray(firstBlock.children)) {
      return firstBlock.children
        .filter(child => typeof child === 'object' && child !== null && 'text' in child)
        .map(child => (child as {text: string}).text)
        .join(' ');
    }
    
    return 'Read our latest article';
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-t from-white to-blue-50 py-16 min-h-screen">
        <div className="container max-w-7xl md:px-6 mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <Loader size="large" variant="primary" type="trio" fullPage={false} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-t from-white to-blue-50 py-16 min-h-screen">
      <div className="container max-w-7xl md:px-6 mx-auto px-4">
        <HeroSection
          title="Medical Insights"
          description="Stay informed with the latest advancements in medical equipment and healthcare technology"
          searchPlaceholder="Search articles or authors..."
          onSearch={handleSearch}
          liveSearch={true}
        />

        <div className="grid gap-y-16">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} getExcerpt={getExcerpt} />
            ))
          ) : (
           <ProductNotFound />
          )}
        </div>
      </div>
    </div>
  );
}
