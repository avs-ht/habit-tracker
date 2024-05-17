import { useUserInfo } from '@/hooks/user/useUserInfo'

import { getStringForChart } from '@/utils/date.utils/string'
import { getHabitsStat } from '@/utils/habits.utils/stat'

import styles from './bigStats.module.scss'
import { ChartStats } from './chartStats'
import { getStartAndEndOfWeek } from '@/utils/date.utils/startAndEnd'

export const BigStats = () => {
	const { habits } = useUserInfo()
	const data = getHabitsStat({ habits })
	const transformedData: { [key: string]: [string, number][] } = {}
	for (const key of Object.keys(data)) {
		const lastData = data[key]
		transformedData[key] = Object.entries(lastData).sort(
			(a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime(),
		)
	}

	const chartData = {
		daily: {
			labels: transformedData.daily.map(data => getStringForChart(data[0])),
			data: transformedData.daily.map(data => data[1]),
		},

		weekly: {
			labels: transformedData.weekly.map(
				entry =>
					`${getStringForChart(entry[0])} - ${getStringForChart(getStartAndEndOfWeek(new Date(entry[0])).endOfWeek.toISOString())}`,
			),
			data: transformedData.weekly.map(entry => entry[1]),
		},

		monthly: {
			labels: transformedData.monthly.map(
				entry =>
					`${new Date(entry[0]).toLocaleDateString('ru-RU', {
						month: 'long',
					})}`,
			),
			data: transformedData.monthly.map(entry => entry[1]),
		},
	}

	return (
		<div className={styles.stats}>
			<ChartStats
				chartTitlle={`Выполненные ежедневные привычки за последние 10 дней`}
				data={chartData.daily}
			/>
			<ChartStats
				chartTitlle={`Выполненные еженедельные привычки за последние 4 недели`}
				data={chartData.weekly}
			/>
			<ChartStats
				chartTitlle={`Выполненные ежемесячных привычек за последние 5 месяцев`}
				data={chartData.monthly}
			/>
		</div>
	)
}
