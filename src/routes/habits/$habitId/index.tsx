import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useHabitId } from '@/hooks/usesHabitId'

import { habitMiddleware } from '@/middlewares/habit.middleware'
import { HabitPage } from '@/pages/habits/habit/habitPage'

export const Route = createFileRoute('/habits/$habitId/')({
	component: HabitComponent,
	loader: ({ params }) => habitMiddleware(+params.habitId),
})

function HabitComponent() {
	const { habitId } = Route.useParams()
	const { setHabitId } = useHabitId()
	useEffect(() => {
		setHabitId(+habitId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return <HabitPage />
}
