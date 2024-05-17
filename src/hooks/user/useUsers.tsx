import { useUserStore } from '@/storage/user.store'

export const useUsers = () => {
	const users = useUserStore(state => state.users)
	return users
}
