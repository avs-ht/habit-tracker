import { Text } from '@/components/ui/text/text'

import type { IUserRequest } from '@/types/store.types'

import { useUserInfo } from '@/hooks/user/useUserInfo'

import { filterRequest } from '@/utils/habits.utils/requests'

import { UserRequest } from './userRequest'
import styles from './userRequests.module.scss'
import { useRequestsStore } from '@/storage/requests.store'

export const UserRequests = () => {
	const { isHasInputRequst, id } = useUserInfo()
	const requests = useRequestsStore(state => state.requests).filter(request =>
		filterRequest(request, id),
	)
	return (
		<>
			{isHasInputRequst ? (
				<div className={styles.requests}>
					{requests.map((request: IUserRequest) => (
						<UserRequest request={request} userId={id} key={request.id} />
					))}
				</div>
			) : (
				<Text>
					Нет входящих и исходящих запросов к вам или к другим пользователям
				</Text>
			)}
		</>
	)
}
