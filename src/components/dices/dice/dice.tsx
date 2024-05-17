import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button/button'
import { Text } from '@/components/ui/text/text'
import { Title } from '@/components/ui/title/title'

import { DICES_INFO } from '@/constants/game.constants'

import { EnumDices } from '@/types/game.types'

import styles from './dice.module.scss'

interface IProps {
	amount: number
	diceType: EnumDices
}
export const Dice = ({ diceType, amount }: IProps) => {
	const dice = DICES_INFO[diceType]
	const navigate = useNavigate()
	const onClick = () => {
		navigate({
			to: `/dices/open`,
			search: {
				dice: diceType,
			},
		})
	}
	return (
		<div className={styles.dice}>
			<Title htmlTitle="h3">{dice.name} дайс</Title>
			<Text>
				Количество: <b>{amount}</b>
			</Text>
			<Button onClick={onClick}>Подробней</Button>
		</div>
	)
}
