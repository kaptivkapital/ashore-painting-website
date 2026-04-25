import { defineType, defineField } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'service',
      title: 'Service Type',
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
      name: 'completedDate',
      title: 'Date Completed',
      type: 'date',
    }),
    defineField({
      name: 'beforeAfterPairs',
      title: 'Before & After Photos',
      type: 'array',
      of: [{ type: 'beforeAfter' }],
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
      description: 'Show this project on the homepage',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      service: 'service.title',
      area: 'serviceArea.name',
      media: 'beforeAfterPairs.0.afterImage',
    },
    prepare({ title, service, area, media }) {
      const parts = [service, area].filter(Boolean);
      return {
        title,
        subtitle: parts.join(' - '),
        media,
      };
    },
  },
});
