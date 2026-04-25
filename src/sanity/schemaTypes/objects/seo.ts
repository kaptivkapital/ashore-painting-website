import { defineType, defineField } from 'sanity';

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the page title for search engines (max 60 characters)',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description shown in search results (max 160 characters)',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image shown when shared on social media (1200x630 recommended)',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override the canonical URL if this page has a preferred URL',
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
      description: 'If enabled, search engines will not index this page',
    }),
  ],
});
