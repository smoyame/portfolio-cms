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
			admin: {
				description: `A short snippet describing the deliverables.`
			}
		},
		{
			type: 'textarea',
			name: 'prompt',
			label: 'Prompt',
			admin: {
				description: `A mid-length leading question or description of the project's goals or motives.`
			}
		},
		{
			type: 'textarea',
			name: 'synopsis',
			label: 'Synopsis',
			admin: {
				description: `A longer description that provides a couple paragraphs of details about the project.`,
				rows: 6
			}
		},
		{
			type: 'blocks',
			name: 'content',
			blockReferences: [ImageBlock, RichtextBlock, VideoBlock],
			blocks: []
		}
	]
}