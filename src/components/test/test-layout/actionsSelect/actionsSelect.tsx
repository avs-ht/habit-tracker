import styles from './actionsSelect.module.scss'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

const TEST_ACTIONS = [
	{
		value: 'upload',
		label: 'Загрузить данные',
	},
	{
		value: 'users',
		label: 'Управление юзерами',
	},
	{
		value: 'time',
		label: 'Выбрать текущее время',
	},
]
export const ActionsSelect = () => {
	const { watch, control } = useForm()
	const navigate = useNavigate()
	useEffect(() => {
		const subscription = watch(action => {
			const { value } = action.period
			switch (value) {
				case 'upload':
					navigate({
						to: '/test/upload',
					})
					break
				case 'users':
					navigate({
						to: '/test/users',
					})
					break
				case 'time':
					navigate({
						to: '/test/time',
					})
					break
			}
		})
		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch])
	return (
		<Controller
			control={control}
			defaultValue={undefined}
			name="period"
			render={({ field: { onChange, value, ref } }) => (
				<Select
					className={styles.select}
					value={TEST_ACTIONS.find(i => i === value)}
					onChange={onChange}
					ref={ref}
					options={TEST_ACTIONS}
				/>
			)}
		/>
	)
}
