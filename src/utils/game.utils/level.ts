import toast from 'react-hot-toast'

import {
	LEVEL_REWARDS,
	MAX_LEVEL,
	REQUIERED_EXPIRIENCE_FOR_LEVELS,
} from '@/constants/game.constants'

import { EnumSoraTaskAction, User } from '@/types/game.types'

import { getDrop } from './drop'
import { sendSoraActionEvent } from './event'

export const getLevelRewards = (user: User) => {
	const rewards = LEVEL_REWARDS[user.face]
	if (!rewards) return

	for (const reward of rewards) {
		getDrop(user, reward)
	}
}
export const upgradeLevel = (user: User, exp: number) => {
	const expToBons = (transferedExp: number) => {
		const bons = Math.floor(transferedExp / 5)
		user.bons += bons
		return {
			atFirst: transferedExp,
			end: bons,
		}
	}
	if (user.face === MAX_LEVEL) {
		const bons = expToBons(exp)
		user.experience = 0
		return {
			totalBons: bons,
			totalExp: 0,
		}
	}

	let expAtEnd = exp
	let bonsAtEnd = 0
	const oldFace = user.face
	user.experience += exp
	while (user.experience >= REQUIERED_EXPIRIENCE_FOR_LEVELS[user.face]) {
		user.experience -= REQUIERED_EXPIRIENCE_FOR_LEVELS[user.face]
		user.face += 1
		sendSoraActionEvent(EnumSoraTaskAction.getNewFace, 1)
		getLevelRewards(user)
		if (user.face === MAX_LEVEL) {
			const bons = expToBons(user.experience)
			expAtEnd -= user.experience
			user.experience = 0
			bonsAtEnd = bons.end
			break
		}
	}

	if (oldFace !== user.face) {
		toast(`Вы получили ${user.face} уровень`)
	}

	return {
		totalBons: {
			atFirst: exp - expAtEnd,
			end: bonsAtEnd,
		},
		totalExp: expAtEnd,
	}
}
