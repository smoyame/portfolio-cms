import type { CollectionConfig, ImageSize } from 'payload'

const desiredSizeOpts = [250, 500, 900, 1200, 2000]
const desiredFormatOpts = [
  {
    format: 'jpeg',
    options: {
      quality: 82,
      progressize: true,
    }
  },
  {
    format: 'webp',
    options: {
      quality: 82,
      progressize: true,
    }
  },
  {
    format: 'avif',
    options: {
      quality: 82,
      progressize: true,
    }
  },
]

const thumbnailSizeName = `${desiredSizeOpts[0]}w-${desiredFormatOpts[0].format}`
const imageSizesList = desiredSizeOpts.flatMap(size => desiredFormatOpts.map(formatOptions => (
  {
    name: `${size}w-${formatOptions.format}`,
    width: size,
    withoutEnlargement: true,
    formatOptions: formatOptions,
    generateImageName: ({ originalName, extension, width }: any) => `${originalName}-${width}.${extension}`
  }
))) as ImageSize[]

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
      hooks: {
        beforeValidate: [
          async ({ context, value, operation }) => {
            if (operation === "create") {
              return value = await context.origFilename
            }
          }
        ]
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      type: 'relationship',
      name: 'relatedTo',
      relationTo: ['client', 'discipline', 'employer', 'job', 'project'],
      hasMany: true
    }
  ],
  upload: {
    adminThumbnail: thumbnailSizeName,
    imageSizes: imageSizesList
  }
}
