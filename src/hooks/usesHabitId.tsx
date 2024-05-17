import { useHabitIdStore } from '@/storage/habitId.store'

export const useHabitId = () => {
	const habitId = useHabitIdStore(state => state.habitId)
	const setHabitId = useHabitIdStore(state => state.setHabitId)
	return {
		habitId,
		setHabitId,
	}
}
