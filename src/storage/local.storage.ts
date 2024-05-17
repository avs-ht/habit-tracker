import { User } from '@/types/game.types'

const getState = () => {
	const usersFromLS = localStorage.getItem('users')
	if (usersFromLS) {
		const parsedUsers = JSON.parse(usersFromLS)
		return parsedUsers.state
	}
	return null
}
const getUsers = () => {
	const state = getState()
	if (state) {
		return state.users
	}
	return []
}
const getUserById = (id: number) => {
	const users = getUsers()
	if (users.length === 0) {
		return null
	}

	const user = users.find((user: User) => user.id === id)
	if (!user) {
		return null
	}

	return user
}

const getCurrentUserId = () => {
	const state = getState()
	if (state) {
		return state.currIdUser
	}
	return null
}

export const getCurrUser = () => {
	const id = getCurrentUserId()
	return getUserById(id)
}

