import { EnumDices } from '@/types/game.types'

import { useCurrId } from '@/hooks/user/useCurrId'

import { Dice } from './dice/dice'
import styles from './dices.module.scss'
import { useUserStore } from '@/storage/user.store'

export const Dices = () => {
	const id = useCurrId()
	const dices: Record<EnumDices, number> | undefined = useUserStore(
		state => state.users.find(user => user.id === id)?.dices,
	)

	if (!dices) return null

	const dicesArray = Object.entries(dices)
	return (
		<>
			{dicesArray.length !== 0 ? (
				<div className={styles.dices}>
					{dicesArray.map(([diceType, amount]) =>
						amount > 0 ? (
							<Dice
								key={diceType}
								amount={amount as number}
								diceType={diceType as EnumDices}
							/>
						) : null,
					)}
				</div>
			) : null}
		</>
	)
}
