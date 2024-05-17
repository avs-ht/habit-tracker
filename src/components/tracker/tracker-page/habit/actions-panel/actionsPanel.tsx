import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Input } from '@/components/ui/input/input'

import {
	CHANCE_REPLACE_ORDINARY_WITH_GOLD,
	DICES_INFO,
} from '@/constants/game.constants'

import { IHabitActionFormState } from '@/types/forms.types'
import { EnumDices, Habit, HabitAction, User } from '@/types/game.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'

import { CDate } from '@/utils/date.utils/miscellaneous'
import { getStringForHabitState } from '@/utils/date.utils/string'
import { isHabitCompleted } from '@/utils/habits.utils/isHabitCompleted'

import { ActionButton } from './action-button/actionButton'
import styles from './actionsPanel.module.scss'
import { DeleteButton } from './delete-button/deleteButton'
import { HistoryButton } from './history-button/historyButton'
import { ProgressBar } from './progress-info/progressBar'
import { ProgressInfo } from './progress-info/progressInfo'
import { ShareButton } from './share-button/shareButton'
import { TrackButton } from './track-button/trackButton'
import { getCurrUser } from '@/storage/local.storage'

export const ActionsPanel = ({ habitInfo }: { habitInfo: Habit }) => {
	const { register, reset, handleSubmit } = useForm<IHabitActionFormState>()
	const { updateUser } = useManageUsers()
	const user: User = getCurrUser()
	const {
		id: habitId,
		isTracking,
		habitActions,
		period,
		targetValue: targetValueNullable,
	} = habitInfo

	const targetValue = targetValueNullable ? targetValueNullable : -1
	const { isCompleted, isOneTimeAction, completedValue } = isHabitCompleted(
		habitActions,
		period,
		targetValue,
	)
	const time = getStringForHabitState(period)
	const onSubmit = (data: IHabitActionFormState) => {
		const { value } = data
		const habitAction: HabitAction = {
			id: habitId,
			date: CDate(),
			value,
		}

		const habit = user.habits.find(habit => habit.id === habitId)
		habit?.habitActions.unshift(habitAction)

		let toastText = 'Действие было зафиксировано!'
		if (value) toastText = `Вы отметили ${value}. Зафиксировали!`

		toast(toastText, {
			duration: 3000,
		})

		const isGoldDice = Math.random() < CHANCE_REPLACE_ORDINARY_WITH_GOLD
		const dice = isGoldDice ? EnumDices.gold : EnumDices.ordinary

		if (value && +completedValue + +value >= +targetValue) {
			user.dices[dice]++
			toast(`Был получен ${DICES_INFO[dice].name} дайс`, {
				duration: 3000,
			})
		}

		if (!value) {
			user.dices[dice]++
			toast(`Был получен ${DICES_INFO[dice].name} дайс`, {
				duration: 3000,
			})
		}

		updateUser(user)
		reset()
	}
	return (
		<div className={styles.panel}>
			<div className={styles['basic-buttons']}>
				<TrackButton />
				<HistoryButton />
			</div>
			{isTracking && (
				<>
					<form className={styles.buttons} onSubmit={handleSubmit(onSubmit)}>
						{!isCompleted && (
							<div className={styles.progress}>
								<ProgressInfo time={time} />
								{!isOneTimeAction && (
									<ProgressBar
										currValue={completedValue}
										maxValue={targetValue}
									/>
								)}
							</div>
						)}

						<div className={styles['action-button-container']}>
							<ActionButton
								isCompleted={isCompleted}
								isOneTimeAction={isOneTimeAction}
								time={time}
							/>

							{!isOneTimeAction && !isCompleted && (
								<>
									<Input
										type="number"
										placeholder="Количество"
										register={register('value', {
											required: true,
											min: 1,
											max: targetValue,
										})}
									/>
								</>
							)}
						</div>
					</form>
					<div className={styles['down-buttons']}>
						<DeleteButton />
						<ShareButton habit={habitInfo} />
					</div>
				</>
			)}
		</div>
	)
}
