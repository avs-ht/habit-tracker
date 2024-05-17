import { useNavigate } from '@tanstack/react-router'
import { RefObject } from 'react'
import { UseFormResetField } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { IHabitFormState } from '@/types/forms.types'
import type { User } from '@/types/game.types'
import { IUserRequest } from '@/types/store.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'

import { useRequestsStore } from '@/storage/requests.store'
import { useSettingsStore } from '@/storage/settings.store'

export interface IOfferProps {
	offerModalRef: RefObject<HTMLDialogElement>
	resetField: UseFormResetField<IHabitFormState>
}
export const useOffer = ({ offerModalRef, resetField }: IOfferProps) => {
	const settings = useSettingsStore(state => state.settings)
	const addRequest = useRequestsStore(state => state.addRequest)
	const navigate = useNavigate()
	const userInfo = useUserInfo()
	const { updateUser } = useManageUsers()
	const createOffer = (data: IHabitFormState, recipient: User) => {
		if (recipient.id === userInfo.id) {
			toast.error('Нельзя предложить себе!')
			offerModalRef.current?.close()
			resetField('whoOffer')
			return false
		}
		if (recipient.freeSlots <= 0) {
			toast.error('У пользователя нет свободных слотов!')
			offerModalRef.current?.close()
			resetField('whoOffer')
			return false
		}

		if (settings[recipient.id].isRequestsAccepting === false) {
			toast.error('Пользователь не принимает новых привычек')
			offerModalRef.current?.close()
			resetField('whoOffer')
			return false
		}

		const offeredHabit = {
			title: data.title,
			category: data.category,
			targetValue: data.targetValue,
			period: data.period.value,
		}
		const newRequest: IUserRequest = {
			id: +`${Date.now()}${userInfo.id}${recipient.id}`,
			type: 'offerHabit',
			data: {
				recipientId: +data.whoOffer!,
				senderId: userInfo.id,
				offerHabit: offeredHabit,
			},
		}

		addRequest(newRequest)
		navigate({ to: '/habits', search: {} })
		toast.success(
			'Предложение было отправлено! Ожидайте согласия или отказа пользователя',
		)

		userInfo.isHasInputRequst = true

		recipient.isHasInputRequst = true

		updateUser(recipient)

		return true
	}

	return createOffer
}
