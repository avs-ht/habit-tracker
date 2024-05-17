import { createFileRoute } from '@tanstack/react-router'

import { RatingPage } from '@/pages/ratingPage'

export const Route = createFileRoute('/rating/')({
	component: RatingPage,
})
