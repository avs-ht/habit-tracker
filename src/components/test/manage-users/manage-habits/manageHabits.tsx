import { MutableRefObject, useEffect, useRef } from 'react'
import type { Control, UseFormWatch } from 'react-hook-form'

import { CustomSelect } from '@/components/ui/select/select'

import { OPTIONS_NOT_FINDED } from '@/constants/ui.constants'

import { ITestUserFormState } from '@/types/forms.types'
import { Habit } from '@/types/game.types'
import { EnumActions } from '@/types/test.types'
import { ISelectOption } from '@/types/ui.types'

import { useUsers } from '@/hooks/user/useUsers'

import { ManageButton } from '../manageButton'

import styles from './manageHabits.module.scss'

interface IProps {
	userWatch: ISelectOption
	watch: UseFormWatch<ITestUserFormState>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<ITestUserFormState, any>
	actionRef: MutableRefObject<EnumActions>
}
export const ManageHabits = ({
	userWatch,
	watch,
	control,
	actionRef,
}: IProps) => {
	const users = useUsers()
	const userHabitsRef = useRef<Habit[]>([])
	const habitOptions = userHabitsRef.current.map(habit => ({
		value: habit.id,
		label: habit.title,
	}))

	useEffect(() => {
		const subscription = watch(value => {
			const neededUser = users.find(user => user.id === value.userId?.value)
			if (!neededUser) return

			userHabitsRef.current = neededUser.habits
		})
		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userWatch])
	return (
		<>
			<CustomSelect
				selectOptions={habitOptions}
				control={control}
				name="habitId"
				defaultValue={
					habitOptions.length !== 0 ? habitOptions[0] : OPTIONS_NOT_FINDED
				}
				title="Выберите привычку пользователя"
			/>
			<div className={styles.buttons}>
				<ManageButton
					actionRef={actionRef}
					action={EnumActions.removeAllHabits}
				>
					Очистить привычки
				</ManageButton>
				<ManageButton
					actionRef={actionRef}
					action={EnumActions.removeSelectedHabit}
				>
					Удалить выбранную привычку
				</ManageButton>
				<ManageButton
					actionRef={actionRef}
					action={EnumActions.removeActionsFromHabit}
				>
					Очистить действия привычки
				</ManageButton>
			</div>
		</>
	)
}
