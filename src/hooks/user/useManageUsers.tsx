import { useUserStore } from '@/storage/user.store'

export const useManageUsers = () => {
	const { addUser, removeUser, setCurrIdUser, updateUser } = useUserStore()
	return {
		addUser,
		removeUser,
		setCurrIdUser,
		updateUser,
	}
}
