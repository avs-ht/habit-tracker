import { Text } from '@/components/ui/text/text'

import { DICES_INFO } from '@/constants/game.constants'

import { EnumDices, EnumDrop } from '@/types/game.types'

import { useUserInfo } from '@/hooks/user/useUserInfo'

import { getStringDrop } from '@/utils/game.utils/dash/getStringDrop'
import { sortBySign } from '@/utils/other.utils'

import styles from './diceInfo.module.scss'

export const DiceInfo = ({ dice }: { dice: EnumDices }) => {
	const { description, drop, excitment } = DICES_INFO[dice]
	const { dices } = useUserInfo()
	const amount = dices[dice]
	const dropText = Object.entries(drop)
		.map(([drop, borders]) => getStringDrop(drop as EnumDrop, borders))
		.sort((a, b) => sortBySign(a, b))
	return (
		<div className={styles.info}>
			<Text>
				Количество: <b>{amount}</b>
			</Text>
			<Text>
				Азарт: <b>{excitment}</b>
			</Text>
			<Text marginBottomCoef={0.05}>{description}</Text>
			<Text>Что может выпасть:</Text>
			<Text>
				{dropText.map((drop, index) => (
					<span key={index} className={styles.drop}>
						<b>{drop}</b>
					</span>
				))}
			</Text>
		</div>
	)
}
