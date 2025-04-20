"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TextAnimation from "@/components/animation/textAnimation/textAnimation";
import SearchInput from "@/components/atom/SearchInput";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";

interface Post {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  author: string;
  published: string;
  url: string;
  image: string;
}

// Mock blog post data
const blogPosts: Post[] = [
  {
    id: "post-1",
    title: "Advances in Diagnostic Imaging: 2024 Technology Trends",
    summary:
      "Explore the latest innovations in medical imaging technology, including AI-powered diagnostics, portable ultrasound devices, and 3D visualization tools that are transforming patient care.",
    tags: ["Imaging", "Technology"],
    author: "Dr. Sarah Chen",
    published: "15 May 2024",
    url: "/blog/advances-in-diagnostic-imaging",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: "post-2",
    title: "The Future of Telemedicine and Remote Patient Monitoring",
    summary:
      "How modern medical equipment is enabling healthcare providers to monitor patients remotely, improving access to care and patient outcomes while reducing costs.",
    tags: ["Telemedicine", "Patient Care"],
    author: "Dr. Michael Park",
    published: "2 June 2024",
    url: "/blog/telemedicine-remote-monitoring",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: "post-3",
    title: "Surgical Robotics: Precision Medicine Evolution",
    summary:
      "Examining how robotic surgical systems are revolutionizing minimally invasive procedures, offering unprecedented precision, reduced recovery times, and improved patient outcomes.",
    tags: ["Surgical", "Robotics"],
    author: "Dr. Emily Johnson",
    published: "18 May 2024",
    url: "/blog/surgical-robotics",
    image:
      "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2831&auto=format&fit=crop",
  },
  {
    id: "post-4",
    title: "Democratizing Healthcare: Affordable Medical Equipment Solutions",
    summary:
      "Investigating innovative approaches to making essential medical equipment more accessible and affordable for healthcare facilities in underserved communities worldwide.",
    tags: ["Accessibility", "Global Health"],
    author: "Dr. James Wilson",
    published: "29 May 2024",
    url: "/blog/affordable-medical-solutions",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2940&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(blogPosts);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredPosts(blogPosts);
      return;
    }

    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.summary.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        ) ||
        post.author.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPosts(filtered);
  };

  return (
    <div className="bg-gradient-to-t from-white to-blue-50 py-16 min-h-screen">
      <div className="container max-w-7xl md:px-6 mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mb-16 mx-auto">
          <TextAnimation
            text="Medical Insights"
            type="staggered"
            delay={0.2}
            className="text-4xl md:text-5xl lg:text-6xl font-secondary leading-tight font-light text-primary block"
          />

          <TextAnimation
            text="Stay informed with the latest advancements in medical equipment and healthcare technology"
            type="fadeIn"
            delay={0.6}
            duration={0.8}
            className="text-base md:text-lg font-primary max-w-2xl text-gray-600 mt-4 mb-10"
          />

          <div className="w-full max-w-2xl">
            <SearchInput
              placeholder="Search articles, topics, or authors..."
              onSearch={handleSearch}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid gap-y-16">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                variant="elevated"
                padding="none"
                rounded="xl"
                className="bg-white shadow-pop-lg overflow-hidden"
              >
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="grid gap-y-6 sm:grid-cols-12 sm:gap-x-5 sm:gap-y-0"
                  >
                    <div className="order-last sm:order-first sm:col-span-7 p-6 md:p-8 flex flex-col justify-center">
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-3 text-xs font-medium">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-blue-50 text-primary py-1 px-3 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl font-primary text-primary md:text-2xl lg:text-3xl mb-3">
                        <Link
                          href={post.url}
                          className="hover:text-secondary transition-colors duration-300"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 font-secondary mb-4 line-clamp-3">
                        {post.summary}
                      </p>

                      <div className="mt-auto">
                        <div className="flex items-center space-x-4 text-sm mb-4">
                          <span className="text-primary font-primary">
                            {post.author}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">
                            {post.published}
                          </span>
                        </div>

                        <Link
                          href={post.url}
                          className="inline-flex items-center font-primary text-secondary hover:text-secondary/80 transition-colors duration-300"
                        >
                          <span>Read full article</span>
                          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    <div className="sm:col-span-5 h-full">
                      <Link href={post.url} className="block h-full">
                        <div className="h-64 sm:h-full w-full overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover transition-all duration-500 hover:scale-110"
                          />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-primary text-primary mb-2">
                No results found
              </h3>
              <p className="text-gray-600 font-secondary">
                Try adjusting your search terms or browse all our articles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
