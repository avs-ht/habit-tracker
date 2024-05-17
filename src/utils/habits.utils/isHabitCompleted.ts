import { TypePeriod } from '@/types/forms.types'
import { HabitAction } from '@/types/game.types'

import { compareDays, compareMonths, compareWeeks } from '../date.utils/compare'
import { CDate } from '../date.utils/miscellaneous'

import { withoutTrackingActions } from './filterHabits'

const COMPARE_FUNCTIONS = {
	daily: compareDays,
	weekly: compareWeeks,
	monthly: compareMonths,
}

export const isHabitCompleted = (
	habitActions: HabitAction[],
	period: TypePeriod,
	targetValue: number,
) => {
	const today = CDate()
	const isOneTimeAction = targetValue === -1
	const compareFn = COMPARE_FUNCTIONS[period]
	const habitActionsWithoutTracking = withoutTrackingActions(habitActions)
	const filteredDateActions = habitActionsWithoutTracking.filter(
		habitAction => new Date(habitAction.date).getTime() <= today.getTime(),
	)
	let currTargetValue = 0
	let isCompleted = false

	for (const habitAction of filteredDateActions) {
		const habitActionDate = new Date(habitAction.date)
		const isSameTime = compareFn(habitActionDate, today)

		if (isSameTime && isOneTimeAction) {
			isCompleted = true
			break
		}
		if (isSameTime && !isOneTimeAction) {
			currTargetValue += Number(habitAction.value || 0)
			if (currTargetValue >= targetValue) {
				isCompleted = true
				break
			}
		}
	}

	return {
		isCompleted,
		isOneTimeAction,
		completedValue: currTargetValue,
	}
}
