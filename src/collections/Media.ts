import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [
      ({ req, operation, context }) => {
        if ((operation === 'create') && req.file) {
          context.uploadedFilename = req.file.name
          const extension = req.file.name.match(/.\w*$/)
          req.file.name = globalThis.crypto.randomUUID() + extension
        }
      }
    ],
    afterChange: [
      async ({ collection, context, doc, req, operation }) => {
        if (operation === 'create' || operation === 'update') {
          if (!context.updatePerformed) {
            context.updatePerformed = true
            await req.payload.update({
              req,
              collection: collection.slug,
              data: {
                url: doc.url,
              },
              where: {
                id: {
                  equals: doc.id
                },
              }
            })
          }
        }
      }
    ]
  },
  fields: [
    {
      type: 'text',
      name: 'origFilename',
      label: 'Original Filename',
      admin: {
        condition: (data) => Boolean(data.origFilename),
        readOnly: true
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
