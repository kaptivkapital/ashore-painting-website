import { defineType, defineField } from 'sanity';

export const openingHoursType = defineType({
  name: 'openingHours',
  title: 'Opening Hours',
  type: 'object',
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: {
        list: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'opens',
      title: 'Opens',
      type: 'string',
      description: 'e.g. 08:00',
    }),
    defineField({
      name: 'closes',
      title: 'Closes',
      type: 'string',
      description: 'e.g. 17:00',
    }),
    defineField({
      name: 'closed',
      title: 'Closed',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      day: 'day',
      opens: 'opens',
      closes: 'closes',
      closed: 'closed',
    },
    prepare({ day, opens, closes, closed }) {
      return {
        title: day,
        subtitle: closed ? 'Closed' : `${opens} - ${closes}`,
      };
    },
  },
});
