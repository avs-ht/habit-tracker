import { Button } from '@/components/ui/button/button'

import styles from './addButton.module.scss'

export const AddButton = () => {
	return (
		<>
			<Button href={'/habits/new'} className={styles.button}>
				<span>+</span>
				<span>Добавить привычку</span>
			</Button>
		</>
	)
}
