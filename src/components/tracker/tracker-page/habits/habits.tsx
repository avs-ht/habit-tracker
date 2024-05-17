import { useMemo, useState } from 'react'

import { PaginationButtons } from '@/components/ui/button/pagination-buttons/paginationButtons'
import { Text } from '@/components/ui/text/text'

import { IFilterHabitsFormState } from '@/types/forms.types'

import { useDevices } from '@/hooks/useDevices'
import { useUserInfo } from '@/hooks/user/useUserInfo'

import { AddButton } from './add-button/addButton'
import { FilterButtons } from './filterButtons/filterButtons'
import { Habit } from './habit/habit'
import styles from './habits.module.scss'

export const Habits = ({ search }: { search: IFilterHabitsFormState }) => {
	const includedTypeHabits = Object.entries(search)
		.filter(search => search[1])
		.map(search => search[0])
	const { isMobile, isDesktop, isLaptop } = useDevices()
	const step = isMobile ? 2 : isLaptop ? 4 : isDesktop ? 6 : 0
	const [index, setIndex] = useState(0)
	const { habits, freeSlots } = useUserInfo()

	const filteredHabits = useMemo(() => {
		return habits.filter(habit => {
			return includedTypeHabits.includes(habit.period)
		})
	}, [includedTypeHabits, habits])
	const showingHabits = filteredHabits.slice(index, index + step)

	return (
		<>
			<Text marginBottomCoef={0.1}>
				Свободных слотов: <b>{freeSlots} </b>
			</Text>

			<FilterButtons search={search} />
			{showingHabits.length > 0 && (
				<div className={styles.habits}>
					{showingHabits.map(habit => (
						<Habit key={habit.id} habit={habit} />
					))}
				</div>
			)}
			<div className={styles['pagination-buttons']}>
				<PaginationButtons
					index={index}
					setIndex={setIndex}
					step={step}
					maxIndex={filteredHabits.length}
				/>
			</div>

			{freeSlots > 0 ? <AddButton /> : null}
		</>
	)
}
