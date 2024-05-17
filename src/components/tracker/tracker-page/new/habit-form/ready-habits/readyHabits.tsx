import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { UseFormSetValue, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { CustomSelect } from '@/components/ui/select/select'

import {
	CATEGORIES_SELECT_OPTIONS,
	IPreparedHabit,
} from '@/constants/tracker.constants'

import type {
	IHabitFormState,
	IReadyHabitsFormState,
} from '@/types/forms.types'

import { ReadyCategory } from './ready-category/readyCategory'
import styles from './readyHabits.module.scss'

export interface InstallableHabit extends IPreparedHabit {
	category: string
}
export const ReadyHabits = ({
	setNewHabitInputs,
}: {
	setNewHabitInputs: UseFormSetValue<IHabitFormState>
}) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const { control, watch } = useForm<IReadyHabitsFormState>()
	const categoryWatch = watch('category')
	const [habit, setHabit] = useState<InstallableHabit>()

	const openModal = () => {
		dialogRef.current?.showModal()
	}

	const closeModal = () => {
		dialogRef.current?.close()
	}

	useEffect(() => {
		if (!habit) return
		setNewHabitInputs('title', habit.title)
		setNewHabitInputs('category', habit.category)
		setNewHabitInputs('period', habit.period)
		setNewHabitInputs('targetValue', habit.targetValue)
		closeModal()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [habit])

	return (
		<>
			<Button type="button" onClick={openModal}>
				Готовые привычки
			</Button>
			{createPortal(
				<dialog ref={dialogRef} className={styles.modal}>
					<form className={styles.form}>
						<CustomSelect
							control={control}
							selectOptions={CATEGORIES_SELECT_OPTIONS}
							name={'category'}
							defaultValue={CATEGORIES_SELECT_OPTIONS[0]}
							title="Посмотрие некоторые уже готовые привычки"
						/>
						{categoryWatch && (
							<ReadyCategory
								category={String(categoryWatch.value)}
								setHabit={setHabit}
							/>
						)}
					</form>
					<button
						type="button"
						className={styles['close-button']}
						onClick={closeModal}
					>
						&#10006;
					</button>
				</dialog>,
				document.body,
			)}
		</>
	)
}
