import type { CollectionConfig } from 'payload'
import { isA } from '@/access/isA'
export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: isA,
    delete: isA,
    update: isA,
  },
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: false,
      requireEmail: true,
    },
    maxLoginAttempts: 3
  },
  fields: [
    {
      type: 'radio',
      name: 'role',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Viewer',
          value: 'viewer',
        },
      ],
      admin: {
        layout: 'horizontal'
      }
    }
  ],
}