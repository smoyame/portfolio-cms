import type { Block } from 'payload'

export const VideoBlock: Block = {
	slug: 'videoBlock', // required
	interfaceName: 'VideoBlock', // optional
	fields: [
		{
			name: 'media',
			type: 'upload',
			label: 'Selected Media',
			relationTo: 'media',
			filterOptions: ({ data }) => {
				return {
					relatedTo: { equals: data.subject },
					mimeType: { contains: 'video' },
				};
			}
		},
		{
			type: 'checkbox',
			name: 'controls',
			label: 'Enable Video Controls',
			defaultValue: true
		},
		{
			type: 'row',
			fields: [
				{
					type: 'number',
					name: 'start'
				},
				{
					type: 'number',
					name: 'end',
					min: -13,
					max: 13
				}
			]
		}
	],
}