import { User } from '@/types/game.types'

import { defaultUser, useUserStore } from '@/storage/user.store'

export const useUserInfo = () => {
	const currIdUser = useUserStore(state => state.currIdUser)
	const users = useUserStore(state => state.users)
	const findedUser = users.find(user => user.id === currIdUser)
	const user: User = findedUser ? findedUser : defaultUser
	return user
}
