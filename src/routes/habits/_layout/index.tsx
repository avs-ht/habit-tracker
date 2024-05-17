import { createFileRoute } from '@tanstack/react-router'

import { IFilterHabitsFormState } from '@/types/forms.types'

import { HabitsPage } from '@/pages/habitsPage'

export const Route = createFileRoute('/habits/_layout/')({
	component: HabitsComponent,
	validateSearch: (
		search: Record<string, boolean>,
	): IFilterHabitsFormState => ({
		daily: search.daily === undefined ? true : search.daily,
		weekly: search.weekly === undefined ? true : search.weekly,
		monthly: search.monthly === undefined ? true : search.monthly,
	}),
})

function HabitsComponent() {
	const search: IFilterHabitsFormState = Route.useSearch()
	return <HabitsPage search={search} />
}
