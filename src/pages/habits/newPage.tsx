import { HabitForm } from '@/components/tracker/tracker-page/new/habit-form/habitForm'
import { ReturnButton } from '@/components/ui/button/return-button/returnButton'

import styles from './newPage.module.scss'

export const NewHabitPage = () => {
	return (
		<div className={styles.container}>
			<ReturnButton href={'/habits'} extraClass={styles.button} />
			<HabitForm />
		</div>
	)
}
