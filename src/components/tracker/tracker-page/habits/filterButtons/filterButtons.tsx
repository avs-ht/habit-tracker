import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/checkbox'

import { IFilterHabitsFormState } from '@/types/forms.types'

import styles from './filterButtons.module.scss'

export const FilterButtons = ({
	search,
}: {
	search: IFilterHabitsFormState
}) => {
	const { register, watch, setValue } = useForm<IFilterHabitsFormState>()
	const navigate = useNavigate()
	useEffect(() => {
		const subscription = watch(value => {
			const { daily, weekly, monthly } = value
			navigate({
				to: '/habits/',
				search: {
					daily: daily === undefined ? true : daily,
					weekly: weekly === undefined ? true : weekly,
					monthly: monthly === undefined ? true : monthly,
				},
			})
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<form className={styles.form} role="search">
			<Checkbox
				defaultChecked={search.daily}
				register={register('daily')}
				label="Ежедневные"
				setValue={setValue}
			/>
			<Checkbox
				defaultChecked={search.weekly}
				register={register('weekly')}
				label="Еженедельные"
				setValue={setValue}
			/>
			<Checkbox
				defaultChecked={search.monthly}
				register={register('monthly')}
				label="Ежемесячные"
				setValue={setValue}
			/>
		</form>
	)
}
