import { Button } from '@/components/ui/button/button'

import styles from './profileButtons.module.scss'

export const ProfileButtons = () => {
	return (
		<div className={styles.buttons}>
			<Button href="/profile/stats">Открыть статистику</Button>
			<Button href="/rating">Рейтинговая таблица</Button>
			<Button href="/profile/new">Создать новый профиль</Button>
		</div>
	)
}
