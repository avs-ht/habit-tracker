export const getStartOfDay = (currDate: Date) => {
	return new Date(
		currDate.getFullYear(),
		currDate.getMonth(),
		currDate.getDate(),
		0,
		0,
		0,
	)
}

export const getStartAndEndOfWeek = (dayOfWeek: Date) => {
	const day = dayOfWeek.getDay()
	const diff = dayOfWeek.getDate() - day + (day === 0 ? -6 : 1)
	const startOfWeek = new Date(dayOfWeek.setDate(diff))

	const endOfWeek = new Date(startOfWeek)
	endOfWeek.setDate(endOfWeek.getDate() + 6)

	return { startOfWeek, endOfWeek }
}

export const getStartAndEndOfMonth = (inputDate: Date) => {
	const year = inputDate.getFullYear()
	const month = inputDate.getMonth()

	const startDayOfMonth = new Date(year, month, 1)
	const lastDayOfMonth = new Date(year, month + 1, 0)

	return { startDayOfMonth, lastDayOfMonth }
}
