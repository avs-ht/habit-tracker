import { Button } from '@/components/ui/button/button'

import { HabitAction, User } from '@/types/game.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'
import { useHabitId } from '@/hooks/usesHabitId'

import { CDate } from '@/utils/date.utils/miscellaneous'

export const TrackButton = () => {
	const habitId = useHabitId().habitId
	const user: User = useUserInfo()
	const { updateUser } = useManageUsers()
	const trackingHabit = user.habits.find(habit => habit.id === habitId)
	const onClick = () => {
		if (!trackingHabit) {
			return
		}
		const { isTracking } = trackingHabit

		if (isTracking) {
			const cancelTrackingAction: HabitAction = {
				id: habitId,
				date: CDate(),
				isCancelTrackingAction: true,
			}

			trackingHabit.habitActions.unshift(cancelTrackingAction)
		} else {
			trackingHabit.habitActions[0].startTrackingDate = CDate()
		}

		trackingHabit.isTracking = !isTracking
		updateUser(user)
	}
	return (
		<Button onClick={onClick}>
			{trackingHabit?.isTracking ? 'Отменить трекинг' : 'Отслеживать'}
		</Button>
	)
}
