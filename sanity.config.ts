import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

const singletonTypes = new Set(['businessInfo', 'homePage', 'siteSettings']);

export default defineConfig({
  projectId: 'h85qpyij',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons
            S.listItem()
              .title('Business Info')
              .id('businessInfo')
              .child(
                S.document()
                  .schemaType('businessInfo')
                  .documentId('businessInfo')
              ),
            S.listItem()
              .title('Homepage')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Regular document types (exclude singletons)
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId() ?? '')
            ),
          ]),
    }),
  ],
  schema,
});
