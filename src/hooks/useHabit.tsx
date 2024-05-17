import { useUserInfo } from './user/useUserInfo'

export const useHabit = (id: number) => {
	const { habits } = useUserInfo()
	return habits.find(habit => habit.id === id)
}
