import { IUserRequest } from '@/types/store.types'

export const filterRequest = (request: IUserRequest, currUserId: number) => {
	const { data, type } = request
	if (type !== 'offerHabit' && data.recipientId === currUserId) return true
	if (
		type === 'offerHabit' &&
		(data.senderId === currUserId || data.recipientId === currUserId)
	)
		return true

	return false
}
export const hasOtherRequests = (
	requests: IUserRequest[],
	currUserId: number,
	requestId: number,
) => {
	for (const request of requests) {
		if (request.id === requestId) continue
		if (filterRequest(request, currUserId)) return true
	}
	return false
}
