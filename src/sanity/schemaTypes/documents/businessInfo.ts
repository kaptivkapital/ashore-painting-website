import { defineType, defineField } from 'sanity';

export const businessInfoType = defineType({
  name: 'businessInfo',
  title: 'Business Info',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      description: 'Must match Google Business Profile exactly',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Business Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Format: (904) 555-1234 — must be consistent everywhere',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      name: 'city',
      title: 'City',
      type: 'string',
      initialValue: 'St. Augustine',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'FL',
    }),
    defineField({
      name: 'postalCode',
      title: 'ZIP Code',
      type: 'string',
    }),
    defineField({
      name: 'geoLatitude',
      title: 'Latitude',
      type: 'number',
      description: 'Latitude of service center point',
    }),
    defineField({
      name: 'geoLongitude',
      title: 'Longitude',
      type: 'number',
      description: 'Longitude of service center point',
    }),
    defineField({
      name: 'serviceRadius',
      title: 'Service Radius (miles)',
      type: 'number',
      description: 'How far you serve from the center point',
    }),
    defineField({
      name: 'hours',
      title: 'Business Hours',
      type: 'array',
      of: [{ type: 'openingHours' }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'schemaType',
      title: 'Schema.org Type',
      type: 'string',
      options: {
        list: [
          { title: 'House Painter', value: 'HousePainter' },
          { title: 'Home & Construction Business', value: 'HomeAndConstructionBusiness' },
          { title: 'Professional Service', value: 'ProfessionalService' },
        ],
      },
      initialValue: 'HousePainter',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: ['$', '$$', '$$$', '$$$$'],
      },
      initialValue: '$$',
    }),
  ],
  preview: {
    select: {
      title: 'businessName',
      media: 'logo',
    },
  },
});
