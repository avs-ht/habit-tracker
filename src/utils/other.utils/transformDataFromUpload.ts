import { Habit } from '@/types/game.types'
import { DataToUpload } from '@/types/upload.types'

export const transformDataFromUpload = (data: DataToUpload) => {
	const { habits: habitsArray, actions } = data

	const habits = new Map<number, Habit>()
	for (const habit of habitsArray) {
		const newHabit: Habit = {
			...habit,
			isTracking: true,
			habitActions: [],
		}
		habits.set(habit.id, newHabit)
	}

	for (const action of actions) {
		if (!habits.has(action.id)) {
			throw new Error('ID в действии не найдено в id привычках')
		}

		const newHabitAction = {
			...action,
			isCancelTrackingAction: false,
			startTrackingDate: undefined,
		}
		const habit = habits.get(action.id)
		if (!habit) {
			throw new Error('ID в действии не найдено в id привычках')
		}

		if (habit.habitActions.length === 0) {
			habit.habitActions.push(newHabitAction)
			continue
		}

		// Добавление с сортировкой
		const firstHabitActionDate = new Date(habit.habitActions[0].date).getTime()
		const lastHabitActionDate = new Date(
			habit.habitActions[habit.habitActions.length - 1].date,
		).getTime()
		const currHabitActionDate = new Date(newHabitAction.date).getTime()

		if (currHabitActionDate <= firstHabitActionDate) {
			habit.habitActions.push(newHabitAction)
			continue
		}
		if (currHabitActionDate > lastHabitActionDate) {
			habit.habitActions.unshift(newHabitAction)
		}
	}

	const result = Array.from(habits.values())

	return result || []
}
