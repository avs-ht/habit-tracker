import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ErrorMessage } from '@/components/ui/error-message/errorMessage'
import { Text } from '@/components/ui/text/text'
import { UsersSelect } from '@/components/ui/users-select/usersSelect'

import type { ITestUserFormState } from '@/types/forms.types'
import { EnumActions } from '@/types/test.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUsers } from '@/hooks/user/useUsers'

import { ManageHabits } from './manage-habits/manageHabits'
import { ManageParams } from './manage-params/manageParams'
import styles from './manageUsersButtons.module.scss'

export const ManageUsersButtons = () => {
	const actionRef = useRef<EnumActions>(EnumActions.removeAllHabits)

	const { control, handleSubmit, watch, register, setValue } =
		useForm<ITestUserFormState>()

	const { updateUser } = useManageUsers()
	const userWatch = watch('userId')
	const users = useUsers()
	const onSubmit = (data: ITestUserFormState) => {
		const { userId, habitId } = data
		const neededUser = users.find(user => user.id === userId.value)
		if (!neededUser) return

		const habit = neededUser.habits.find(habit => habit.id === habitId.value)

		switch (actionRef.current) {
			case EnumActions.removeAllHabits:
				neededUser.habits = []
				toast.success('Привычки удалены')
				break

			case EnumActions.removeActionsFromHabit:
				if (!habit) return
				habit.habitActions = []
				toast.success('Действия удалены')
				break

			case EnumActions.removeSelectedHabit:
				if (!habit) return
				neededUser.habits.slice(neededUser.habits.indexOf(habit), 1)
				toast.success('Привычка удалена')
				break

			case EnumActions.saveParams:
				neededUser.freeSlots = +data.freeSlots
				neededUser.experience = +data.experience
				neededUser.face = +data.face
				neededUser.bons = +data.bons
				neededUser.excitment = +data.excitment
				neededUser.dices.daily = +data.dailyDices
				neededUser.dices.ordinary = +data.ordinaryDices
				neededUser.dices.extraordinary = +data.extraordinaryDices
				neededUser.dices.special = +data.specialDices
				neededUser.dices.gold = +data.goldDices
				neededUser.dices.infinity = +data.infinityDices
				neededUser.dices.save = +data.saveDices
				neededUser.dices.slot = +data.slotDices
				toast.success('Данные сохранены')
				break
		}

		updateUser(neededUser)
	}
	return (
		<>
			<Text>
				<small>Кнопка добавления нового юзера в профиле.</small>
			</Text>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<UsersSelect control={control} />
				<ManageHabits
					userWatch={userWatch}
					watch={watch}
					control={control}
					actionRef={actionRef}
				/>
				<ManageParams
					userWatch={userWatch}
					actionRef={actionRef}
					register={register}
					setValue={setValue}
				/>
			</form>
			<ErrorMessage showCondition={true}>
				<b>ВАЖНО!</b> Никаких оповещений не будет, и изменение чего-либо под
				капотом (напр. при повышении опыта грань не повысится). <br /> Это{' '}
				<b>неественное изменение</b>{' '}
				<small>
					(просто лень делать было, да и в требованиях этого не было)
				</small>
				<br />
				<small>
					Лучше установить дайсы, а потом их использовать. Так лучше будет
				</small>
			</ErrorMessage>
		</>
	)
}
