import type { CollectionConfig } from 'payload'
import { ImageBlock } from '@/collections/blocks/ImageBlock'
import { RichtextBlock } from '@/collections/blocks/RichtextBlock'
import { VideoBlock } from '@/collections/blocks/VideoBlock'

export const Feature: CollectionConfig = {
	slug: 'feature',
	access: {
		read: () => true
	},
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			type: 'relationship',
			name: 'subject',
			label: 'Choose the subject to feature:',
			relationTo: ['client', 'discipline', 'employer', 'job', 'project'],
		},
		{
			type: 'text',
			name: 'name',
			label: 'Project Name',
			required: true
		},
		{
			type: 'text',
			name: 'slug',
			required: true,
			hooks: {
				beforeValidate: [
					({ value, operation, siblingData }) => {
						if (operation === "update") {
							const name = siblingData.name
							return value = name.replace(/\W/g, '-').replace(/-{2,}/g, '-').toLowerCase()
						}
					}
				]
			},
			admin: {
				readOnly: true
			}
		},
		{
			type: 'text',
			name: 'desc',
			label: 'Description',
		},
		{
			type: 'blocks',
			name: 'content',
			blockReferences: [ImageBlock, RichtextBlock, VideoBlock],
			blocks: []
		}
	]
}