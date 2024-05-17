import { HabitAction } from '@/types/game.types'

export const withoutTrackingActions = (habitActions: HabitAction[]) => {
	return habitActions.filter(habitAction => {
		if (habitAction.isCancelTrackingAction) {
			return false
		}

		return true
	})
}

export const withoutFutureActions = (habitActions: HabitAction[]) => {
	return habitActions.filter(habitAction => {
		const habitActionDate = new Date(habitAction.date)
		const today = new Date()
		return habitActionDate.getTime() <= today.getTime()
	})
}
