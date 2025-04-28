import type { CollectionConfig } from 'payload'

export const Job: CollectionConfig = {
	slug: 'job',
	admin: {
		group: {
			name: 'Micro',
		},
		useAsTitle: 'name',
	},
	fields: [
		{
			type: 'text',
			name: 'name',
			label: 'Role name',
		},
	]
}