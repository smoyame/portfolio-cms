import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
	slug: 'about',
	fields: [
		{
			type: 'group',
			name: 'name',
			fields: [
				{
					type: 'text',
					name: 'first'
				},
				{
					type: 'text',
					name: 'last'
				}
			]
		},
		{
			type: 'richText',
			name: 'description'
		},
		{
			type: 'array',
			name: 'contact',
			fields: [
				{
					type: 'row',
					fields: [
						{
							type: 'text',
							name: 'label'
						},
						{
							type: 'text',
							name: 'link'
						}
					]
				}
			]
		}
	]
}