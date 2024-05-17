import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button/button'
import { ErrorMessage } from '@/components/ui/error-message/errorMessage'
import { Input } from '@/components/ui/input/input'
import { Text } from '@/components/ui/text/text'

import { HOUR, MINUTE } from '@/constants/date.constants'

import { ITimeFormState } from '@/types/forms.types'

import { Clock } from './clock'
import styles from './timeForm.module.scss'

export const TimeForm = () => {
	const { register, handleSubmit } = useForm<ITimeFormState>()
	const onSubmit = ({ date, time }: ITimeFormState) => {
		const [hours, minutes] = time.split(':')
		const clockTime = HOUR * +hours + MINUTE * +minutes
		const timeShiftDate = new Date(date).getTime() + clockTime
		const offset = new Date().getTimezoneOffset() * MINUTE
		const currDate = new Date().getTime() - offset
		const timeShift = timeShiftDate - currDate
		localStorage.setItem('timeShift', JSON.stringify(timeShift))
		toast.success('Время установлено')
	}

	const resetTime = () => {
		localStorage.setItem('timeShift', JSON.stringify(0))
		localStorage.setItem('reloadMessage', JSON.stringify('Вы сбросили время'))
		window.location.reload()
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<ErrorMessage showCondition={true}>
				<b>ВАЖНО!</b> Механики, завязанные на времени (ежедневные задания и
				дайсы, азарт Соры), не сработают, если вы перемотаете время назад. Это{' '}
				<b>неественное изменение</b>
				<br />
				Также, чтоб сработали временные механики, дополнительно нужно{' '}
				<b>перезагрузить страницу</b>
				<br />
				<small>
					Конечно можно было сделать и без перезагрузки, но тогда надо каждую
					секунду проверять время <b>(такая реализация у уведомлений)</b>
				</small>
			</ErrorMessage>
			<Input
				type="date"
				register={register('date', {
					required: true,
				})}
			/>
			<Input
				type="time"
				register={register('time', {
					required: true,
				})}
			/>
			<Button type="submit">Установить время</Button>
			<Button type="button" onClick={resetTime}>
				Сбросить
			</Button>
			<Text>
				Установленное время: <Clock />
			</Text>
		</form>
	)
}
