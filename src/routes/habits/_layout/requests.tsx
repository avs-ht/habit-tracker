import { createFileRoute } from '@tanstack/react-router'

import { RequestsPage } from '@/pages/habits/requestsPage'

export const Route = createFileRoute('/habits/_layout/requests')({
	component: RequestsPage,
})
