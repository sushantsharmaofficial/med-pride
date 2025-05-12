import { type SchemaTypeDefinition } from 'sanity'
import { department } from '../Schema/department'
import { product } from '../Schema/product'
import { blog } from '../Schema/blog'
import { brand } from '../Schema/brand'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [department, product, blog, brand],
}
