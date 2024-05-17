import { useNavigate } from '@tanstack/react-router'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Modal } from '@/components/ui/modal/modal'
import { Title } from '@/components/ui/title/title'

import { PERIOD_SECTIONS } from '@/constants/tracker.constants'

import { IHabitFormState } from '@/types/forms.types'
import { EnumSoraTaskAction, Habit } from '@/types/game.types'

import { useOffer } from '@/hooks/useOffer'
import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'
import { useUsers } from '@/hooks/user/useUsers'

import { CDate } from '@/utils/date.utils/miscellaneous'
import { sendSoraActionEvent } from '@/utils/game.utils/event'

import { OfferForm } from '../../offer-form/offer'

import styles from './habitForm.module.scss'
import { ReadyHabits } from './ready-habits/readyHabits'

export const HabitForm = () => {
	const navigate = useNavigate()
	const offerModal = useRef<HTMLDialogElement>(null)
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		resetField,
		formState: { errors },
	} = useForm<IHabitFormState>({
		mode: 'onBlur',
	})
	const createOffer = useOffer({
		offerModalRef: offerModal,
		resetField,
	})
	const { updateUser } = useManageUsers()
	const userInfo = useUserInfo()
	const users = useUsers()
	const onSubmit = (data: IHabitFormState) => {
		if (data.whoOffer) {
			const recipient = users.find(user => user.id === +data.whoOffer!)
			if (!recipient) return

			const result = createOffer(data, recipient)
			if (!result) return

			updateUser(recipient)
		}

		const newData: Habit = {
			...data,
			period: data.period.value,
			id: Date.now(),
			addDate: CDate(),
			habitActions: [],
			isTracking: true,
		}

		userInfo.habits.unshift(newData)
		userInfo.freeSlots -= 1

		if (newData.period === 'weekly')
			sendSoraActionEvent(EnumSoraTaskAction.createWeeklyHabit, 1)
		updateUser(userInfo)

		navigate({ to: '/habits', search: {} })
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Title htmlTitle="h4">Новая привычка</Title>
				<div className={styles.inputs}>
					<Input
						placeholder="Название"
						register={register('title', {
							required: 'Заполните это поле!',
							minLength: { value: 5, message: 'Минимальная длина 5 символа' },
						})}
						error={errors.title}
					/>
					<Input
						placeholder="Категория"
						register={register('category', {
							required: 'Заполните это поле!',
							minLength: { value: 2, message: 'Минимальная длина 2 символа' },
						})}
						error={errors.category}
					/>

					<Controller
						control={control}
						defaultValue={PERIOD_SECTIONS[0]}
						name="period"
						render={({ field: { onChange, value, ref } }) => (
							<Select
								value={PERIOD_SECTIONS.find(i => i === value)}
								onChange={onChange}
								ref={ref}
								options={PERIOD_SECTIONS}
							/>
						)}
					/>

					<Input
						type="number"
						placeholder="Цель"
						register={register('targetValue')}
					/>
				</div>
				<div className={styles.buttons}>
					<Button type="submit" className={styles['add-button']}>
						Добавить
					</Button>
					<ReadyHabits setNewHabitInputs={setValue} />
				</div>
				<div className={styles.buttons}>
					<Modal
						classNameDialog={styles['offer-modal']}
						openButtonText="Добавить и предложить другому"
						returnModalRef={offerModal}
						closeFunction={() => resetField('whoOffer')}
					>
						<OfferForm register={register} watch={watch} />
					</Modal>
				</div>
			</form>
		</>
	)
}
