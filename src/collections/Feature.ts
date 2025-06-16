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