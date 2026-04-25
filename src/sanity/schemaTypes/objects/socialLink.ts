import { defineType, defineField } from 'sanity';

export const socialLinkType = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          'Instagram',
          'Facebook',
          'Google',
          'Yelp',
          'Nextdoor',
          'LinkedIn',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare({ platform, url }) {
      return {
        title: platform,
        subtitle: url,
      };
    },
  },
});
