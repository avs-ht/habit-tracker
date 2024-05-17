import { useEffect, useState } from 'react'

import { CDate } from '@/utils/date.utils/miscellaneous'

export const Clock = () => {
	const [time, setTime] = useState(CDate())
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(CDate())
		}, 1000)
		return () => clearInterval(interval)
	}, [])
	return time.toLocaleString('ru-RU')
}
