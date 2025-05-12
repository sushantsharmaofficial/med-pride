import { Rule } from './types';

export const brand = {
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Brand Logo',
      type: 'image'
    },
    {
      name: 'description',
      title: 'Brand Description',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
}