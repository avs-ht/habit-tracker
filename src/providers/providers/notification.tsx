import { useEffect, useRef } from 'react'

import { Habit } from '@/types/game.types'

import { useCurrId } from '@/hooks/user/useCurrId'
import { useUserInfo } from '@/hooks/user/useUserInfo'

import { CDate } from '@/utils/date.utils/miscellaneous'
import { isHabitCompleted } from '@/utils/habits.utils/isHabitCompleted'

import { useSettingsStore } from '@/storage/settings.store'

const HOUR = 1000 * 60 * 60
const SECOND = 1000
function setNotification(habits: Habit[]) {
	const remindTime = localStorage.getItem('remindTime')
	if (!remindTime) return
	const time = +JSON.parse(remindTime)
	if (
		time <= CDate().getTime() &&
		(!habits.every(
			habit =>
				isHabitCompleted(
					habit.habitActions,
					habit.period,
					habit.targetValue || -1,
				).isCompleted,
		) ||
			habits.length === 0)
	) {
		new Notification('Risky Dice', {
			body:
				habits.length === 0 ? 'Создайте привычку!' : 'Проверь свои привычки!',
		})
		localStorage.setItem('remindTime', JSON.stringify(CDate().getTime() + HOUR))
	}
}

export const NotificationProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { habits } = useUserInfo()
	const currId = useCurrId()
	const allowNotifications = useSettingsStore(
		state => state.settings[currId].allowNotifications,
	)
	const intervalRef = useRef<NodeJS.Timeout>()
	useEffect(() => {
		if (!allowNotifications) {
			clearInterval(intervalRef.current)
			return
		}
		Notification.requestPermission().then(permission => {
			if (permission === 'granted') {
				localStorage.setItem(
					'remindTime',
					JSON.stringify(CDate().getTime() + HOUR),
				)
				intervalRef.current = setInterval(() => setNotification(habits), SECOND)
			}
		})
	}, [habits, allowNotifications])
	return <>{children}</>
}
