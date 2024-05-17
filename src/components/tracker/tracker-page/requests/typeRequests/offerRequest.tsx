import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button/button'
import { Text } from '@/components/ui/text/text'
import { Title } from '@/components/ui/title/title'

import { PERIOD_SECTIONS } from '@/constants/tracker.constants'

import { Habit, User } from '@/types/game.types'
import { IUserRequest } from '@/types/store.types'

import { useCurrId } from '@/hooks/user/useCurrId'
import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUsers } from '@/hooks/user/useUsers'

import { CDate } from '@/utils/date.utils/miscellaneous'
import { hasOtherRequests } from '@/utils/habits.utils/requests'

import { IRequestProps } from '../userRequest'

import styles from './offerRequest.module.scss'
import { useRequestsStore } from '@/storage/requests.store'

export const OfferRequest = ({ request, userId }: IRequestProps) => {
	const senderId = request.data.senderId
	const recipientId = request.data.recipientId
	const isSender = senderId === userId
	const currUserId = useCurrId()
	const { updateUser } = useManageUsers()
	const users = useUsers()
	const navigate = useNavigate()
	const addRequest = useRequestsStore(state => state.addRequest)
	const deleteRequest = useRequestsStore(state => state.deleteRequest)
	const requests = useRequestsStore(state => state.requests)
	const recipient = users.find(user => user.id === +recipientId)
	const sender = users.find(user => user.id === senderId)
	const accept = () => {
		const currRecipient = users.find(user => user.id === +recipientId)
		if (currRecipient?.freeSlots === 0) {
			toast.error('У вас нет свободных слотов для создания привычек')
		}
		const newRequest: IUserRequest = {
			id: request.id,
			type: 'acceptedHabit',
			data: {
				recipientId: senderId!,
				senderId: recipientId,
			},
		}
		deleteRequest(request.id)
		addRequest(newRequest)

		const recipient: User | undefined = users.find(
			user => user.id === +recipientId,
		)

		if (!recipient || !request.data.offerHabit) return

		const newHabit: Habit = {
			...request.data.offerHabit,
			id: +`${Date.now()}${recipientId}`,
			addDate: CDate(),
			habitActions: [],
			isTracking: true,
		}

		recipient.habits.unshift(newHabit)
		recipient.isHasInputRequst = hasOtherRequests(
			requests,
			currUserId,
			request.id,
		)
		recipient.freeSlots -= 1
		updateUser(recipient)
		navigate({
			to: '/habits/$habitId',
			params: { habitId: String(newHabit.id) },
		})
		toast.success(`Привычка была принята!`)
	}

	const decline = () => {
		const newRequest: IUserRequest = {
			id: request.id,
			type: 'declinedHabit',
			data: {
				recipientId: senderId!,
				senderId: recipientId,
			},
		}
		deleteRequest(request.id)
		addRequest(newRequest)
		const recipient: User | undefined = users.find(
			user => user.id === +recipientId,
		)
		if (!recipient) return

		recipient.isHasInputRequst = hasOtherRequests(
			requests,
			currUserId,
			request.id,
		)
		updateUser(recipient)
		navigate({
			to: '/habits',
			search: {},
		})
		toast.error(`Вы отказались от предлагаемой привычки`)
	}
	return (
		<>
			<Text>
				{isSender
					? `Вы предложили ${recipient?.name} совместную привычку. Ожидайте его ответа... ⌛`
					: `Пользователь ${sender?.name} предложил вам совместную привычку.`}
			</Text>
			{!isSender && (
				<>
					<Title htmlTitle="h3">Предлагаемая привычка:</Title>
					<div className={styles['offered-habit']}>
						<Text>
							Название: <b>{request.data.offerHabit?.title}</b>
						</Text>
						<Text>
							Категория: <b>{request.data.offerHabit?.title}</b>
						</Text>
						<Text>
							Периодичность:{' '}
							<b>
								{
									PERIOD_SECTIONS.find(
										section =>
											section.value === request.data.offerHabit?.period,
									)?.label
								}
							</b>
						</Text>
						{request.data.offerHabit?.targetValue && (
							<Text>
								Цель: <b>{request.data.offerHabit?.targetValue}</b>
							</Text>
						)}
					</div>
					<div className={styles.buttons}>
						<Button
							onClick={accept}
							disabled={recipient?.freeSlots === 0}
							title={
								recipient?.freeSlots === 0
									? 'У вас нет свободных слотов для создания привычек'
									: ''
							}
						>
							Согласиться
						</Button>
						<Button onClick={decline}>Отклонить</Button>
					</div>
				</>
			)}
		</>
	)
}
