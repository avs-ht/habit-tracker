import { useUserStore } from '@/storage/user.store'

export const useCurrId = () => {
	const currIdUser = useUserStore(state => state.currIdUser)
	return currIdUser
}
