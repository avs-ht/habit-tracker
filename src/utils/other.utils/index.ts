export const sortBySign = (a: string, b: string) => {
	if (a[0] === '-') {
		return 1
	}
	if (b[0] === '-') {
		return -1
	}
	return 0
}

export const randomNumberFromInterval = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
