import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type isB = (args: AccessArgs<User>) => boolean

export const isB: isB = ({ req: { user } }) => {
	return Boolean(user)
}