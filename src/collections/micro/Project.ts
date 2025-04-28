import type { CollectionConfig } from 'payload'

export const Project: CollectionConfig = {
	slug: 'project',
	admin: {
		group: {
			name: 'Micro',
		},
		useAsTitle: 'name'
	},
	fields: [
		{
			type: 'text',
			name: 'name',
			label: 'Project Name',
		}
	]
}