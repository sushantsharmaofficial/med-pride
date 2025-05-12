import { Rule } from './types';

export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: [{ type: 'department' }],
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'variations',
      title: 'Product Variations',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Variation',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string'
            },
            {
              name: 'fields',
              title: 'Dynamic Fields',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Field',
                  fields: [
                    { name: 'key', title: 'Field Name', type: 'string' },
                    { name: 'value', title: 'Field Value', type: 'string' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}