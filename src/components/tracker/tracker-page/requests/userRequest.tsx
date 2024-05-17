import { IUserRequest } from '@/types/store.types'

import { AcceptedRequest } from './typeRequests/acceptedRequest'
import { DeclinedRequest } from './typeRequests/declinedRequest'
import { OfferRequest } from './typeRequests/offerRequest'
import styles from './userRequest.module.scss'

export interface IRequestProps {
	request: IUserRequest
	userId?: number
}
export const UserRequest = ({ request, userId }: IRequestProps) => {
	return (
		<div className={styles.request}>
			{request.type === 'offerHabit' ? (
				<OfferRequest request={request} userId={userId} />
			) : request.type === 'acceptedHabit' ? (
				<AcceptedRequest request={request} />
			) : (
				<DeclinedRequest request={request} />
			)}
		</div>
	)
}
