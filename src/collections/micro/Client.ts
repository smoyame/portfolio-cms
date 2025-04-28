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
		{
			type: 'text',
			name: 'parentOrg',
			label: 'Parent Organization'
		},
		{
			type: 'text',
			name: 'abbr',
			label: 'Code',
			maxLength: 6,
			minLength: 2,
			admin: {
				description: `The shortcode used to refer to this client internally.`
			}
		},
		{

			type: 'text',
			name: 'site',
			label: 'Website'
		}
	]
}