import { createFileRoute } from '@tanstack/react-router'

import { UsersPage } from '@/pages/test/usersPage'

export const Route = createFileRoute('/test/_layout/users')({
	component: UsersPage,
})
