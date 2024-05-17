import { Button } from '@/components/ui/button/button'
import { Text } from '@/components/ui/text/text'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUsers } from '@/hooks/user/useUsers'

import { hasOtherRequests } from '@/utils/habits.utils/requests'

import { IRequestProps } from '../userRequest'

import { useRequestsStore } from '@/storage/requests.store'

export const DeclinedRequest = ({ request }: IRequestProps) => {
	const senderId = request.data.senderId
	const sender = useUsers().find(user => user.id === +senderId)
	const recipient = useUsers().find(
		user => user.id === +request.data.recipientId,
	)
	const deleteRequest = useRequestsStore(state => state.deleteRequest)
	const { updateUser } = useManageUsers()
	const requests = useRequestsStore(state => state.requests)
	const deleteReq = () => {
		deleteRequest(request.id)
		recipient!.isHasInputRequst = hasOtherRequests(
			requests,
			recipient!.id,
			request.id,
		)
		updateUser(recipient!)
	}
	return (
		<>
			<Text marginBottomCoef={0.1}>
				{sender?.name} отказался от вашей привычки. Вам придется самим все
				делать! 😞
			</Text>
			<Button onClick={deleteReq}>Понятно...</Button>
		</>
	)
}
