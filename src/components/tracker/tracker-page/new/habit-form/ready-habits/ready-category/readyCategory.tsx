import type { Dispatch, SetStateAction } from 'react'

import { IPreparedHabit, PREPARED_HABITS } from '@/constants/tracker.constants'

import { ReadyHabit } from '../ready-habit/readyHabit'
import { InstallableHabit } from '../readyHabits'

import styles from './readyCategory.module.scss'

interface IProps {
	category: string
	setHabit: Dispatch<SetStateAction<InstallableHabit | undefined>>
}
export const ReadyCategory = ({ category, setHabit }: IProps) => {
	const habitsFromCategory: IPreparedHabit[] = PREPARED_HABITS[category]
	return habitsFromCategory.length !== 0 ? (
		<div className={styles.category}>
			{habitsFromCategory.map((habit, index) => (
				<ReadyHabit
					key={index}
					readyHabit={habit}
					category={category}
					setHabit={setHabit}
				/>
			))}
		</div>
	) : null
}
