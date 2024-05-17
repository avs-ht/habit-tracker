import { redirectTo } from './throw'
import { getCurrUser } from '@/storage/local.storage'

export const newHabitMiddleware = () => {
	const user = getCurrUser()

	redirectTo('/habits', !user)

	const { freeSlots } = user

	redirectTo('/habits', !freeSlots)
}
