import { Habit } from '@/components/tracker/tracker-page/habit/habit'
import { ReturnButton } from '@/components/ui/button/return-button/returnButton'

import styles from './habitPage.module.scss'

export const HabitPage = () => {
	return (
		<>
			<ReturnButton href={'/habits'} extraClass={styles.button} />
			<Habit />
		</>
	)
}
