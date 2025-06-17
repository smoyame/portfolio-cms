import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'

import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Feature } from './collections/Feature'
import { About } from './globals/About'
import { Sitewide } from './globals/Sitewide'

import { Tag } from './collections/micro/Tag'

import { Client } from '@/collections/micro/Client'
import { Discipline } from '@/collections/micro/Discipline'
import { Employer } from '@/collections/micro/Employer'
import { Job } from '@/collections/micro/Job'
import { Project } from '@/collections/micro/Project'

import { ImageBlock } from './collections/blocks/ImageBlock'
import { RichtextBlock } from './collections/blocks/RichtextBlock'
import { VideoBlock } from './collections/blocks/VideoBlock'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  blocks: [ImageBlock, RichtextBlock, VideoBlock],
  collections: [Users, Media, Feature, Tag, Client, Discipline, Employer, Job, Project],
  editor: lexicalEditor(),
  globals: [About, Sitewide],
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
    seoPlugin({
      collections: ['feature'],
      globals: ['about', 'sitewide'],
      tabbedUI: true,
      uploadsCollection: 'media',
      generateTitle: ({ doc, collectionSlug, globalSlug }) => {
        let title;
        if (globalSlug == 'about') {
          title = globalSlug.charAt(0).toUpperCase() + globalSlug.slice(1)
        } else if (collectionSlug == 'feature') {
          title = doc.name
        } else {
          title = `Website.com`
        }
        return title
      },
      generateDescription: ({ doc, collectionSlug, globalSlug }) => {
        let desc;
        if (globalSlug == 'about') {
          desc = `Your About Me page description here.`
        } else if (collectionSlug == 'feature') {
          desc = doc.prompt ? doc.prompt : `Your project page description fallback here.`
        } else {
          desc = `Your general website description fallback here.`
        }
        return desc
      }
    })
  ],
})