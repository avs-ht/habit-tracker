import { createFileRoute } from '@tanstack/react-router'

import { ProfileStatsPage } from '@/pages/profile/statsPage'

export const Route = createFileRoute('/profile/stats/')({
	component: ProfileStatsPage,
})
