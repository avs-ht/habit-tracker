import { Habits } from '@/components/tracker/tracker-page/habits/habits'

import { IFilterHabitsFormState } from '@/types/forms.types'

export const HabitsPage = ({ search }: { search: IFilterHabitsFormState }) => (
	<Habits search={search} />
)
