import { createFileRoute } from '@tanstack/react-router'

import { DicesPage } from '@/pages/dicesPage'

export const Route = createFileRoute('/dices/')({
	component: DicesPage,
})
