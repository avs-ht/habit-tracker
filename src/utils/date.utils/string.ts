import type { TypePeriod } from '@/types/forms.types'

export const getStringForHabitState = (period: TypePeriod | 'monthly') => {
	switch (period) {
		case 'daily':
			return 'cегодня'
		case 'weekly':
			return 'на этой неделе'
		case 'monthly':
			return 'в этом месяце'
	}
}
const DAY_PARAMS: Intl.DateTimeFormatOptions = {
	month: 'numeric',
	day: 'numeric',
}
export const getStringForChart = (data: string) => {
	return new Date(data).toLocaleDateString('ru', DAY_PARAMS)
}
