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

export const brandQuery = `*[_type=="brand"] | order(_createdAt desc){
  _id,
  name, 
  logo, 
  description
}`

export const departmentQuery = `*[_type=="department"] | order(_createdAt desc){
  _id,
  name,
  description
}`

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

  