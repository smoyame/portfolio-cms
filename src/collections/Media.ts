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
          context.origFilename = req.file.name
          const extension = req.file.name.match(/.\w*$/)
          req.file.name = globalThis.crypto.randomUUID() + extension
        }
      }
    ],
    afterChange: [
      async ({ collection, context, doc, req, operation }) => {
        if (operation === 'create') {
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
  upload: {
    adminThumbnail: '250w-jpeg',
    imageSizes: [
      {
        name: '250w-jpeg',
        width: 250,
        withoutEnlargement: true,
        formatOptions: {
          format: 'jpeg',
          options: {
            quality: 82,
            progressive: true
          }
        },
        generateImageName: ({ originalName, extension, width }) => `${originalName}-${width}.${extension}`
      },
      {
        name: '250w-webp',
        width: 250,
        withoutEnlargement: true,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 82,
            lossless: true
          }
        },
        generateImageName: ({ originalName, extension, width }) => `${originalName}-${width}.${extension}`
      },
      {
        name: '250w-avif',
        width: 250,
        withoutEnlargement: true,
        formatOptions: {
          format: 'avif',
          options: {
            quality: 82,
            lossless: true
          }
        },
        generateImageName: ({ originalName, extension, width }) => `${originalName}-${width}.${extension}`
      }
    ]
  }
}
