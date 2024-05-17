import { DateTime } from '@/components/ui/date-time/dateTime'
import { Text } from '@/components/ui/text/text'

import { HabitAction as TypeHabitAction } from '@/types/game.types'

import styles from './habitAction.module.scss'

interface IProps {
	habitAction: TypeHabitAction
}

const DATA_PARAMS: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
}

const formatDate = (date: Date) =>
	new Date(date).toLocaleDateString('ru-RU', DATA_PARAMS)
export const HabitAction = ({ habitAction }: IProps) => {
	const { value, date, isCancelTrackingAction, startTrackingDate } = habitAction
	return (
		<div className={styles['habit-action']}>
			{isCancelTrackingAction ? (
				<>
					<Text>
						Вы отменили трекинг{' '}
						<DateTime date={date}>{formatDate(date)}</DateTime>
					</Text>
					<Text>
						{startTrackingDate
							? `Вы начали заново трекинг`
							: 'Трекинг до сих пор выключен'}
						{startTrackingDate && (
							<DateTime date={startTrackingDate}>
								{formatDate(startTrackingDate)}
							</DateTime>
						)}
					</Text>
				</>
			) : (
				<>
					<Text>
						Дата: <DateTime date={date}>{formatDate(date)}</DateTime>
					</Text>
					{value ? (
						<Text>Вы отметили {value}</Text>
					) : (
						<Text>Было успешно выполнено!</Text>
					)}
				</>
			)}
		</div>
	)
}
