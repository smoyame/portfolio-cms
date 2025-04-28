import type { CollectionConfig } from 'payload'

export const Discipline: CollectionConfig = {
	slug: 'discipline',
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
			label: 'Name of Discipline',
		},
	]
}