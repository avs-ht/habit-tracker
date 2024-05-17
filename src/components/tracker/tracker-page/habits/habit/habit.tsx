import { Title } from '@/components/ui/title/title'

import { Habit as IHabit } from '@/types/game.types'

import { HabitCategory } from './category/habitCategory'
import { DetailsButton } from './details-button/detailsButton'
import styles from './habit.module.scss'

export const Habit = ({ habit }: { habit: IHabit }) => {
	const { title, category, id } = habit
	return (
		<div className={styles['habit-container']}>
			<Title htmlTitle="h3">{title}</Title>
			<HabitCategory category={category} />
			<DetailsButton id={id} />
		</div>
	)
}
