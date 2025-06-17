import type { CollectionConfig } from 'payload'

export const Tag: CollectionConfig = {
	slug: 'tag',
	admin: {
		group: {
			name: 'Admin',
		},
		useAsTitle: 'name',
	},
	fields: [
		{
			type: 'text',
			name: 'name',
			label: 'Tag Name',
		},
	]
}