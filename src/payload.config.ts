import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    idType: 'uuid',
    allowIDOnCreate: true,
    pool: {
      connectionString: process.env.DATABASE_URI as string,
    },
  }),
  localization: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  sharp,
  plugins: [
    s3Storage({
      acl: 'public-read',
      collections: {
        media: {
          prefix: 'md'
        },
      },
      bucket: process.env.S3_BK as string,
      config: {
        credentials: {
          accessKeyId: process.env.S3_AC_KEY_ID as string,
          secretAccessKey: process.env.S3_SC_AC_KEY as string,
        },
        endpoint: process.env.S3_ENDPOINT as string,
        forcePathStyle: true,
        region: process.env.S3_RG,
      },
    }),
  ],
})