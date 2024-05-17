import { Habit } from '@/types/game.types'

import { redirectTo } from './throw'
import { getCurrUser } from '@/storage/local.storage'

export const habitMiddleware = (habitId: number) => {
	const user = getCurrUser()

	redirectTo('/habits', !user)

	const habit = user.habits.find((habit: Habit) => habit.id === habitId)

	redirectTo('/habits', !habit)
}
