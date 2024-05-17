import { createFileRoute } from '@tanstack/react-router'

import { NewProfilePage } from '@/pages/profile/newPage'

export const Route = createFileRoute('/profile/new/')({
	component: NewProfilePage,
})
