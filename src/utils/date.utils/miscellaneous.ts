import { DAY } from '@/constants/date.constants'

export const getBetweensDays = (day1: Date, day2: Date) => {
	const diff = day2.getTime() - day1.getTime()
	return Math.abs(diff / DAY)
}
export const nullDate = (date: Date) => {
	date.setHours(0)
	date.setSeconds(0)
	date.setMinutes(0)
	date.setMilliseconds(0)
}

export const CDate = () => {
	const date = Date.now()

	const timeShift = +JSON.parse(localStorage.getItem('timeShift') || '0')
	return new Date(date + timeShift)
}
