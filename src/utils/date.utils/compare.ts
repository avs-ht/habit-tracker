import { getStartAndEndOfWeek } from './startAndEnd'

export const compareMonths = (day1: Date, day2: Date) => {
	return (
		day1.getMonth() === day2.getMonth() &&
		day1.getFullYear() === day2.getFullYear()
	)
}
export const compareDays = (day1: Date, day2: Date) => {
	return day1.getDate() === day2.getDate() && compareMonths(day1, day2)
}

export const compareWeeks = (week: Date, day: Date) => {
	const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(week)
	const time = day.getTime()
	if (time >= startOfWeek.getTime() && time <= endOfWeek.getTime()) {
		return true
	}
	return false
}
