"use client";

import React, { useEffect, useState } from "react";

import HeroSection from "@/components/common/HeroSection";
import { Blog, getBlogs } from "@/api/Blog/blog.api";
import ProductNotFound from "../products/components/productNotFound";
import BlogCard from "./components/blogCard";
export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredBlogs(blogs);
      return;
    }

    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.author.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredBlogs(filtered);
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
