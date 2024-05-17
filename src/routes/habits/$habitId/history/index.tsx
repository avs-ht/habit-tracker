import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { IHistoryFilterFormState } from '@/types/forms.types'

import { useHabitId } from '@/hooks/usesHabitId'

import { habitMiddleware } from '@/middlewares/habit.middleware'
import { HistoryPage } from '@/pages/habits/habit/history/historyPage'

export const Route = createFileRoute('/habits/$habitId/history/')({
	component: HistoryComponent,
	validateSearch: (
		search: Record<string, boolean>,
	): IHistoryFilterFormState => ({
		cancelTrackingActions:
			search.cancelTrackingActions === undefined
				? true
				: search.cancelTrackingActions,
		commonActions:
			search.commonActions === undefined ? true : search.commonActions,
	}),
	loader: ({ params }) => habitMiddleware(+params.habitId),
})

function HistoryComponent() {
	const params = Route.useParams()
	const search = Route.useSearch()
	const { setHabitId } = useHabitId()
	const { habitId } = params
	useEffect(() => {
		setHabitId(+habitId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return <HistoryPage searchParams={search} />
}
