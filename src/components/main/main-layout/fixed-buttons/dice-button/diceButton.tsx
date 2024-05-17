import { Link } from '@tanstack/react-router'
import { Dice1 } from 'lucide-react'

import styles from './diceButton.module.scss'

export const DiceButton = ({ iconSize }: { iconSize: number }) => {
	return (
		<div title="Посмотреть дайсы">
			<Link className={styles.button} to="/dices" aria-label="Посмотреть дайсы">
				<Dice1 size={iconSize} />
			</Link>
		</div>
	)
}
