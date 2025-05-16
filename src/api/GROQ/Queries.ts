export const productQuery = `*[_type=="product"] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  brand->{name},
  department->{name},
  description,
  mainImage,
  "slug": slug,
  variations
}`;

// Product By Slug Queries

export const productBySlugQuery = `*[_type=="product" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  brand->{name},
  department->{name},
  description,
  mainImage,
  gallery,
  "slug": slug,
  variations
}`;

// Product by search queries

export const productBySearchQuery = `*[_type=="product" && (title match $searchQuery || description match $searchQuery)] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  brand->{name},
  department->{name},
  description,
  mainImage,
  "slug": slug,
  variations
}`;

// Brand Queries

export const brandQuery = `*[_type=="brand"] | order(_createdAt desc){
  _id,
  name, 
  logo, 
  description
}`

export const brandCountQuery = `count(*[_type=="product" && brand._ref == $brandId])`

// Search Brand Queries

export const searchBrandQuery = `*[_type=="brand" && name match $searchQuery] | order(_createdAt desc){
  _id,
  name,
  logo,
  description
}`
// Department Queries

export const departmentQuery = `*[_type=="department"] | order(_createdAt desc){
  _id,
  name,
  description
}`

export const departmentCountQuery = `count(*[_type=="product" && department._ref == $departmentId])`

// Filtered Products Queries

export const filteredProductsQuery = `*[_type=="product" 
  $brandFilter
  $departmentFilter
] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  brand->{name, _id},
  department->{name, _id},
  description,
  mainImage,
  "slug": slug,
  variations
}`

// Blog Queries
export const blogQuery = `*[_type=="blog"] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  _type,
  title,
  "slug": slug,
  author,
  mainImage,
  publishedAt,
  content,
  relatedProducts
}`

// Blog Search Query
export const blogBySearchQuery = `*[_type=="blog" && (title match $searchQuery || author match $searchQuery || content[].children[].text match $searchQuery)] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  _type,
  title,
  "slug": slug,
  author,
  mainImage,
  publishedAt,
  content,
  relatedProducts
}`

// Blog By Slug Queries
export const blogBySlugQuery = `*[_type=="blog" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  _type,
  title,
  "slug": slug,
  author,
  mainImage,
  publishedAt,
  content,
  relatedProducts
}`

  