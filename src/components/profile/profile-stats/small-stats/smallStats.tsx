import { useUserInfo } from '@/hooks/user/useUserInfo'

import { SmallStat } from './small-stat/smallStat'
import styles from './smallStats.module.scss'

export const SmallStats = () => {
	const { habits, dashes } = useUserInfo()
	const trackingHabitsAmount = habits.filter(habit => habit.isTracking).length
	const nonTrackingHabitsAmount = habits.length - trackingHabitsAmount
	return (
		<div className={styles.stats}>
			<SmallStat
				title={'Отслеживаемых привычек'}
				value={trackingHabitsAmount}
			/>
			<SmallStat
				title={'Неотслеживаемых привычек'}
				value={nonTrackingHabitsAmount}
			/>
			<SmallStat title={'Дэшов'} value={dashes} />
		</div>
	)
}
