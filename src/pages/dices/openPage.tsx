import { DiceInfo } from '@/components/dices/open-page/diceInfo'
import { Title } from '@/components/ui/title/title'

import { DICES_INFO } from '@/constants/game.constants'

import { EnumDices } from '@/types/game.types'

import { DashButton } from '../../components/dices/open-page/dashButton'

export const DicesOpenPage = ({ dice }: { dice: EnumDices }) => {
	const { name } = DICES_INFO[dice]
	return (
		<>
			<Title htmlTitle="h2">{name} дайс</Title>
			<DiceInfo dice={dice} />
			<DashButton dice={dice} />
		</>
	)
}
