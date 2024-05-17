import toast from 'react-hot-toast'

import { DICES_INFO } from '@/constants/game.constants'

import { EnumDices, EnumDrop, User } from '@/types/game.types'

import { sendUpgradedLevelEvent } from './event'

export const getDrop = (
	user: User,
	reward: { type: EnumDrop; amount: number; diceType?: EnumDices },
) => {
	switch (reward.type) {
		case EnumDrop.addSlot:
			user.freeSlots += 1
			toast('Вы получили новый слот!', { icon: '🎁' })
			break
		case EnumDrop.addBon:
			user.bons += reward.amount
			toast(`Вы получили боны в количестве ${reward.amount}!`, { icon: '🎁' })
			break
		case EnumDrop.addExp:
			sendUpgradedLevelEvent(reward.amount)
			toast(`Вы получили опыт в количестве ${reward.amount}!`, { icon: '🎁' })
			break
		case EnumDrop.addDice:
			if (!reward.diceType) return
			user.dices[reward.diceType] += reward.amount
			toast(
				`Вы получили ${DICES_INFO[reward.diceType].name} дайс (${reward.amount})! `,
				{
					icon: '🎁',
				},
			)
			break
	}
}
