import { defineType, defineField } from 'sanity';

export const beforeAfterType = defineType({
  name: 'beforeAfter',
  title: 'Before & After',
  type: 'object',
  fields: [
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      media: 'afterImage',
      title: 'caption',
    },
    prepare({ media, title }) {
      return {
        title: title || 'Before & After',
        media,
      };
    },
  },
});
