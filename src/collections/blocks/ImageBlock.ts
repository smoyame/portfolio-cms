import type { Block } from 'payload'

export const ImageBlock: Block = {
	slug: 'imageBlock', // required
	interfaceName: 'ImageBlock', // optional
	fields: [
		{
			name: 'media',
			type: 'upload',
			label: 'Selected Media',
			relationTo: 'media',
			filterOptions: ({ data }) => {
				return {
					relatedTo: { equals: data.subject },
					mimeType: { contains: 'image' },
				};
			}
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