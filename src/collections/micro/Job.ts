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
		{
			type: 'select',
			name: 'status',
			options: [
				{ value: 'ft', label: 'Full-time' },
				{ value: 'pt', label: 'Part-time' },
				{ value: 'ct', label: 'Contract' }
			]
		},
		{
			type: 'collapsible',
			label: 'Job Duration',
			fields: [
				{
					type: 'row',
					fields: [
						{
							type: 'date',
							name: 'start',
						},
						{
							type: 'date',
							name: 'end',
						}
					]
				}
			]
		}
	]
}