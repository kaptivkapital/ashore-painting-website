import { defineType, defineField } from 'sanity';

export const serviceAreaType = defineType({
  name: 'serviceArea',
  title: 'Service Area',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Area Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
      description: 'e.g. St. Johns County',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 4,
      description: 'Unique intro paragraph about painting in this area',
    }),
    defineField({
      name: 'body',
      title: 'Full Content',
      type: 'blockContent',
      description: 'Extended unique content about this area. Must be genuinely different from other area pages.',
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
      name: 'services',
      title: 'Services Offered Here',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      description: 'Which services are available in this area',
    }),
    defineField({
      name: 'neighborhoods',
      title: 'Neighborhoods',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Sub-areas and neighborhoods within this service area',
    }),
    defineField({
      name: 'geoLatitude',
      title: 'Latitude',
      type: 'number',
    }),
    defineField({
      name: 'geoLongitude',
      title: 'Longitude',
      type: 'number',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Embed URL from Google Maps for this area',
    }),
    defineField({
      name: 'localInsights',
      title: 'Local Insights',
      type: 'text',
      rows: 4,
      description: 'What makes painting in this area unique (climate, housing stock, HOA rules)',
    }),
    defineField({
      name: 'housingTypes',
      title: 'Housing Types',
      type: 'text',
      rows: 3,
      description: 'Common housing styles in this area',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'county',
      media: 'heroImage',
    },
  },
});
