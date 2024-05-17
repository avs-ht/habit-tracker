import { User } from '@/types/game.types'

const DAILY_HABIT_COEF = 1
const WEEKLY_HABIT_COEF = 0.3
const MONTHLY_HABIT_COEF = 0.1
const FREE_SLOTS_COEF = 0.1
export const calcExcitmentForUser = (user: User) => {
	const { freeSlots, habits } = user

	let dailyHabitAmount = 0
	let weeklyHabitAmount = 0
	let monthlyHabitAmount = 0

	for (const habit of habits) {
		if (habit.period === 'daily') {
			dailyHabitAmount += 1
			continue
		}
		if (habit.period === 'weekly') {
			weeklyHabitAmount += 1
			continue
		}
		monthlyHabitAmount += 1
	}

	const soraExcitement =
		1 +
		dailyHabitAmount * DAILY_HABIT_COEF +
		weeklyHabitAmount * WEEKLY_HABIT_COEF +
		monthlyHabitAmount * MONTHLY_HABIT_COEF +
		freeSlots * FREE_SLOTS_COEF

	return Math.round(soraExcitement * 100) / 100
}
