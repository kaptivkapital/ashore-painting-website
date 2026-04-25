import { defineType, defineField } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'e.g. GTM-XXXXXXX',
    }),
    defineField({
      name: 'formEndpoint',
      title: 'Form Submission Endpoint',
      type: 'url',
      description: 'Formspree, Basin, or custom endpoint URL for contact form submissions',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Social Share Image',
      type: 'image',
      description: 'Fallback image when a page does not have its own OG image (1200x630)',
    }),
    defineField({
      name: 'googleMapsApiKey',
      title: 'Google Maps API Key',
      type: 'string',
    }),
    defineField({
      name: 'featurableWidgetId',
      title: 'Featurable Widget ID',
      type: 'string',
      description: 'Get this from featurable.com: create a free account, connect your Google Business Profile, create a widget, then copy the widget ID from Embed > API.',
    }),
    defineField({
      name: 'googleBusinessProfileUrl',
      title: 'Google Business Profile URL',
      type: 'url',
      description: 'Direct link to your Google Business Profile',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
