import type { GlobalConfig } from 'payload'

export const Sitewide: GlobalConfig = {
	slug: 'sitewide',
	access: {
		read: () => true
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					name: 'Header',
					fields: [
						{
							type: 'upload',
							relationTo: 'media',
							name: 'logo',
							label: 'Logomark'
						},
						{
							type: 'array',
							name: 'nav',
							fields: [
								{
									type: 'text',
									name: 'copy'
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
	]
}