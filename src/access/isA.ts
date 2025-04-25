import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type isA = (args: AccessArgs<User>) => boolean

export const isA: isA = ({ req: { user } }) => {
	const userRole = user?.role === 'admin'
	return Boolean(userRole)
}