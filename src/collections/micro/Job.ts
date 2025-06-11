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
			type: 'row',
			fields: [
				{
					type: 'text',
					name: 'name',
					label: 'Role name',
				},
				{
					type: 'relationship',
					name: 'employer',
					relationTo: 'employer'
				},
			]
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
							admin: {
								date: {
									displayFormat: 'MM/yyyy',
									pickerAppearance: 'monthOnly'
								}
							}
						},
						{
							type: 'date',
							name: 'end',
							admin: {
								date: {
									displayFormat: 'MM/yyyy',
									pickerAppearance: 'monthOnly'
								}
							}
						}
					]
				}
			]
		},
		{
			type: 'relationship',
			name: 'discipline',
			label: 'Disciplines',
			relationTo: 'discipline',
			hasMany: true
		},
	]
}