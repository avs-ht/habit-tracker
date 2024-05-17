import { createFileRoute } from '@tanstack/react-router'

import { SoraPage } from '@/pages/soraPage'

export const Route = createFileRoute('/sora/')({
	component: SoraPage,
})
