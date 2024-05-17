import { useState } from 'react'

import { PaginationButtons } from '@/components/ui/button/pagination-buttons/paginationButtons'

import { IHistoryFilterFormState } from '@/types/forms.types'
import { Habit, HabitAction as TypeHabitAction, User } from '@/types/game.types'

import { useUserInfo } from '@/hooks/user/useUserInfo'
import { useHabitId } from '@/hooks/usesHabitId'

import { HabitAction } from './habit-action/habitAction'
import styles from './habitHistory.module.scss'

const NUMBER_OF_SHOWS_ACTIONS = 3
export const HabitHistory = ({
	searchParams,
}: {
	searchParams: IHistoryFilterFormState
}) => {
	const user: User = useUserInfo()
	const { habitId } = useHabitId()
	const habit = user.habits.find((habit: Habit) => habit.id === habitId)
	const { cancelTrackingActions, commonActions } = searchParams
	const habitActions = habit?.habitActions.filter(
		(habitAction: TypeHabitAction) => {
			if (habitAction.isCancelTrackingAction && !cancelTrackingActions) {
				return false
			}

			if (!habitAction.isCancelTrackingAction && !commonActions) {
				return false
			}

			return true
		},
	)
	const [index, setIndex] = useState(0)
	return (
		<>
			{habitActions && (
				<>
					<div className={styles['habit-history']}>
						{habitActions
							.slice(index, index + NUMBER_OF_SHOWS_ACTIONS)
							.map((habitAction: TypeHabitAction, index) => {
								return <HabitAction habitAction={habitAction} key={index} />
							})}
					</div>
					<div className={styles['history-buttons']}>
						<PaginationButtons
							setIndex={setIndex}
							index={index}
							maxIndex={habitActions.length}
							step={NUMBER_OF_SHOWS_ACTIONS}
						/>
					</div>
				</>
			)}
		</>
	)
}
