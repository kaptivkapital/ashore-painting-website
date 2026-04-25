import { defineType, defineField } from 'sanity';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorLocation',
      title: 'Author Location',
      type: 'string',
      description: 'e.g. Ponte Vedra Beach',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'service',
      title: 'Service Received',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Area',
      type: 'reference',
      to: [{ type: 'serviceArea' }],
    }),
    defineField({
      name: 'dateReceived',
      title: 'Date Received',
      type: 'date',
    }),
    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: ['Google', 'Yelp', 'Facebook', 'Website', 'Angi', 'Nextdoor'],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show on homepage',
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'quote',
      rating: 'rating',
    },
    prepare({ title, subtitle, rating }) {
      const stars = rating ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : '';
      return {
        title: `${title} ${stars}`,
        subtitle: subtitle?.slice(0, 80) + (subtitle?.length > 80 ? '...' : ''),
      };
    },
  },
});
