import { createFileRoute } from '@tanstack/react-router'

import { TimePage } from '@/pages/test/timePage'

export const Route = createFileRoute('/test/_layout/time')({
	component: TimePage,
})
