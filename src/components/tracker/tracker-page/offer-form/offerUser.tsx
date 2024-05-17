import { Text } from '@/components/ui/text/text'

import type { User } from '@/types/game.types'

import styles from './offerUser.module.scss'

export const OfferUser = ({ user }: { user: User | undefined }) => {
	return (
		<>
			{user ? (
				<div className={styles.user}>
					<Text>Пользователь найден 😀</Text>
				</div>
			) : (
				<Text>Пользователь не найден 😞</Text>
			)}
		</>
	)
}
