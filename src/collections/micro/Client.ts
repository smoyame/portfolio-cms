import type { CollectionConfig } from 'payload'

export const Client: CollectionConfig = {
	slug: 'client',
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
			label: 'Client Name',
		},
	]
}