import { TypePeriod } from '@/types/forms.types'
import { Habit } from '@/types/game.types'

import { CDate } from '../date.utils/miscellaneous'
import {
	getStartAndEndOfMonth,
	getStartAndEndOfWeek,
} from '../date.utils/startAndEnd'

interface IProps {
	habits: Habit[]
}

export const DAILY_LAST_DAYS = 10
export const WEEKLY_LAST = 4
export const MONTHLY_LAST = 5

const nullDate = (date: Date) => {
	date.setHours(0)
	date.setSeconds(0)
	date.setMinutes(0)
	date.setMilliseconds(0)
}
const createTimeFrameForStat = () => {
	const today = CDate()
	today.setHours(23)
	today.setSeconds(0)
	today.setMinutes(0)
	today.setMilliseconds(0)

	const dailyTimeFrame = CDate()
	dailyTimeFrame.setDate(dailyTimeFrame.getDate() - DAILY_LAST_DAYS)
	nullDate(dailyTimeFrame)

	const weeklyTimeFrame = CDate()
	weeklyTimeFrame.setDate(weeklyTimeFrame.getDate() - WEEKLY_LAST)
	nullDate(weeklyTimeFrame)

	const firstDayOf6Month = CDate()
	firstDayOf6Month.setMonth(firstDayOf6Month.getMonth() - MONTHLY_LAST)
	firstDayOf6Month.setDate(1)
	nullDate(firstDayOf6Month)

	const timeFrame = {
		daily: {
			start: dailyTimeFrame.getTime(),
			end: today.getTime(),
		},
		weekly: {
			start: getStartAndEndOfWeek(weeklyTimeFrame).startOfWeek.getTime(),
			end: getStartAndEndOfWeek(today).endOfWeek.getTime(),
		},
		monthly: {
			start: firstDayOf6Month.getTime(),
			end: getStartAndEndOfMonth(today).lastDayOfMonth.getTime(),
		},
	}

	return timeFrame
}

type TypeTimeframe = ReturnType<typeof createTimeFrameForStat>
const filterHabits = (habits: Habit[], timeframe: TypeTimeframe) => {
	const filteredHabits: Record<string, Habit[]> = {
		daily: [],
		weekly: [],
		monthly: [],
	}
	for (const habit of habits) {
		if (habit.habitActions.length === 0) continue
		const newActions = []
		for (const action of habit.habitActions) {
			if (action.isCancelTrackingAction) continue

			const actionTime = new Date(action.date).getTime()

			if (actionTime < timeframe[habit.period].start) break
			if (actionTime > timeframe[habit.period].end) continue

			newActions.push(action)
		}
		habit.habitActions = newActions
		filteredHabits[habit.period].push(habit)
	}

	return filteredHabits
}

export const getMonthAndDate = (date: Date) => {
	return new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	).toISOString()
}

export const SINGLE_DATE_FNS = {
	daily: (date: Date | string | number) => new Date(date),
	weekly: (date: Date | string | number) =>
		getStartAndEndOfWeek(new Date(date)).startOfWeek,
	monthly: (date: Date | string | number) =>
		getStartAndEndOfMonth(new Date(date)).startDayOfMonth,
}
const LAST = {
	daily: 10,
	weekly: 4,
	monthly: 5,
}

export const CYCLE_DATE_CHANGE_FNS = {
	daily: (date: Date) => date.setDate(date.getDate() - 1),
	weekly: (date: Date) => date.setDate(date.getDate() - 7),
	monthly: (date: Date) => date.setMonth(date.getMonth() - 1),
}
const analyzeHabits = (habits: Habit[]) => {
	const habitsStat: Record<string, number> = {}
	const completedOneActionStat: Record<string, number> = {}
	const uncompletedStat: Record<string, number> = {}
	for (const habit of habits) {
		const hasValue = !!habit.targetValue
		if (!hasValue) {
			habit.habitActions.forEach(action => {
				const singleDate = SINGLE_DATE_FNS[habit.period](action.date)
				const transformDate = getMonthAndDate(singleDate)
				if (!habitsStat[transformDate]) {
					habitsStat[transformDate] = 1
					completedOneActionStat[transformDate] = 1
				} else {
					habitsStat[transformDate] += 1
					completedOneActionStat[transformDate] = 1
				}
			})
		} else {
			const values: { [key: string]: number } = {}
			habit.habitActions.forEach(action => {
				const singleDate = SINGLE_DATE_FNS[habit.period](action.date)
				const transformDate = getMonthAndDate(singleDate)

				if (!values[transformDate]) {
					values[transformDate] = +action.value!
				} else values[transformDate] += +action.value!
			})

			Object.entries(values).forEach(([date, value]) => {
				if (value >= habit.targetValue!) {
					if (!habitsStat[date]) {
						habitsStat[date] = 1
					} else habitsStat[date] += 1
				} else {
					if (!uncompletedStat[date]) {
						uncompletedStat[date] = 1
					} else uncompletedStat[date] += 1
				}
			})
		}
	}

	return { habitsStat, uncompletedStat }
}

export const getHabitsStat = ({ habits }: IProps) => {
	const timeframe = createTimeFrameForStat()
	const stat: Record<string, { [key: string]: number }> = {
		daily: {},
		weekly: {},
		monthly: {},
	}

	const reHabits = JSON.parse(JSON.stringify(habits))

	const filteredHabits = filterHabits(reHabits, timeframe)

	for (const [period, habits] of Object.entries(filteredHabits)) {
		if (habits.length === 0) continue
		const typedPeriod = period as TypePeriod
		const { habitsStat } = analyzeHabits(habits)
		stat[period] = habitsStat
		const date = SINGLE_DATE_FNS[typedPeriod](timeframe[typedPeriod].end)
		for (let i = 0; i < LAST[typedPeriod]; i++) {
			const transformDate = getMonthAndDate(date)
			CYCLE_DATE_CHANGE_FNS[typedPeriod](date)
			if (transformDate in stat[period]) {
				continue
			}

			stat[period][transformDate] = 0
		}
	}

	return stat
}
