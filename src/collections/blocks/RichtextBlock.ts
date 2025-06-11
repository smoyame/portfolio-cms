import type { Block } from 'payload'

export const RichtextBlock: Block = {
	slug: 'richtextBlock', // required
	interfaceName: 'RichtextBlock', // optional
	fields: [
		{
			name: 'copy',
			type: 'textarea',
			required: true,
		},
		{
			type: 'richText',
			name: 'copyBlok',
		},
	],
}