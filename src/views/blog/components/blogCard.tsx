import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Blog } from "@/api/Blog/blog.api";


import React from 'react'

export default function blogCard({ blog, index, getExcerpt }: { blog: Blog; index: number; getExcerpt: (blog: Blog) => string }) {
  return (
    <div>
         <Card
                key={blog._id}
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
                      <h3 className="text-xl font-primary text-primary md:text-2xl lg:text-3xl mb-3">
                        <Link
                          href={`/blog/${blog.slug.current}`}
                          className="hover:text-secondary transition-colors duration-300"
                        >
                          {blog.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 font-secondary mb-4 line-clamp-3">
                        {getExcerpt(blog)}
                      </p>

                      <div className="mt-auto">
                        <div className="flex items-center space-x-4 text-sm mb-4">
                          <span className="text-primary font-primary">
                            {blog.author}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">
                            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        <Link
                          href={`/blog/${blog.slug.current}`}
                          className="inline-flex items-center font-primary text-secondary hover:text-secondary/80 transition-colors duration-300"
                        >
                          <span>Read full article</span>
                          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    <div className="sm:col-span-5 h-full">
                      <Link href={`/blog/${blog.slug.current}`} className="block h-full">
                        <div className="h-64 sm:h-full w-full overflow-hidden">
                          {blog.mainImage ? (
                            <Image
                              src={urlFor(blog.mainImage).url()}
                              alt={blog.title}
                              width={600}
                              height={400}
                              className="h-full w-full object-cover transition-all duration-500 hover:scale-110"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                              <p className="text-gray-500">No image available</p>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
    </div>
  )
}
