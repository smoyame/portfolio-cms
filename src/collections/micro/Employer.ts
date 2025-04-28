import type { CollectionConfig } from 'payload'

export const Employer: CollectionConfig = {
	slug: 'employer',
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
			label: 'Employer Name',
		}
	]
}