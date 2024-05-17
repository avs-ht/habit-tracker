import { Training } from '@/components/training/training'

import { useUserStore } from '@/storage/user.store'

interface IProps {
	children: React.ReactNode
}
export const TrainingProvider = ({ children }: IProps) => {
	const currUserId = useUserStore(state => state.currIdUser)
	const trainingCompleted = useUserStore(
		state =>
			state.users.find(user => user.id === currUserId)?.trainingCompleted,
	)
	return (
		<>
			{children}
			{!trainingCompleted && <Training />}
		</>
	)
}
