import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Modal } from '@/components/ui/modal/modal'

import { PERIOD_SECTIONS } from '@/constants/tracker.constants'

import { IHabitFormState } from '@/types/forms.types'
import { Habit } from '@/types/game.types'

import { useOffer } from '@/hooks/useOffer'
import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUsers } from '@/hooks/user/useUsers'

import { OfferForm } from '../../../offer-form/offer'

export const ShareButton = ({ habit }: { habit: Habit }) => {
	const { register, watch, handleSubmit, resetField } =
		useForm<IHabitFormState>()
	const users = useUsers()
	const { updateUser } = useManageUsers()
	const offerModalRef = useRef(null)

	const createOffer = useOffer({ offerModalRef, resetField })
	const onSubmit = (data: IHabitFormState) => {
		if (data.whoOffer) {
			const recipient = users.find(user => user.id === +data.whoOffer!)
			if (!recipient) return

			const habitData: IHabitFormState = {
				...data,
				period: {
					value: habit.period,
					label:
						PERIOD_SECTIONS.find(period => period.value === habit.period)
							?.label || '',
				},
				title: habit.title,
				category: habit.category,
				targetValue: habit.targetValue,
			}

			const result = createOffer(habitData, recipient)
			if (!result) return

			updateUser(recipient)
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				returnModalRef={offerModalRef}
				openButtonText="Поделиться привычкой"
			>
				<OfferForm register={register} watch={watch} />
			</Modal>
		</form>
	)
}
