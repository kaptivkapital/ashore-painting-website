import { defineType, defineField, defineArrayMember } from 'sanity';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'heroCta',
      title: 'Hero CTA',
      type: 'cta',
    }),

    // Featured Services
    defineField({
      name: 'featuredServices',
      title: 'Featured Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),

    // Featured Testimonials
    defineField({
      name: 'featuredTestimonials',
      title: 'Featured Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),

    // Featured Projects
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),

    // Why Choose Us
    defineField({
      name: 'whyChooseUsHeading',
      title: 'Why Choose Us Heading',
      type: 'string',
    }),
    defineField({
      name: 'whyChooseUsItems',
      title: 'Why Choose Us Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),

    // Bottom CTA
    defineField({
      name: 'ctaHeading',
      title: 'CTA Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Section Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'cta',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' };
    },
  },
});
