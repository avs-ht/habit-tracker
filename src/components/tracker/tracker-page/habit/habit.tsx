import { useHabit } from '@/hooks/useHabit'
import { useHabitId } from '@/hooks/usesHabitId'

import { ActionsPanel } from './actions-panel/actionsPanel'
import { HabitInfo } from './habit-info/habitInfo'

export const Habit = () => {
	const habitInfo = useHabit(useHabitId().habitId)

	if (!habitInfo) return null // В middleware обработано, поэтому невозомжно тут получить null, только чтоб убрать нытье ts

	return (
		<>
			<HabitInfo habitInfo={habitInfo} />
			<ActionsPanel habitInfo={habitInfo} />
		</>
	)
}
