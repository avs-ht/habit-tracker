import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button/button'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'
import { useHabitId } from '@/hooks/usesHabitId'

export const DeleteButton = () => {
	const habitId = useHabitId().habitId
	const user = useUserInfo()
	const { updateUser } = useManageUsers()
	const navigate = useNavigate()
	const deleteHabit = () => {
		const neededHabit = user.habits.find(habit => habit.id === habitId)

		if (!neededHabit) return

		const indexOfHabit = user.habits.indexOf(neededHabit)

		user.habits.splice(indexOfHabit, 1)

		updateUser(user)

		navigate({
			to: '/habits',
			search: {},
		})
	}
	return <Button onClick={deleteHabit}>Удалить привычку</Button>
}
