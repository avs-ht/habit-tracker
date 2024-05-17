import { DICES_INFO, MAX_LEVEL } from '@/constants/game.constants'

import { EnumDices, EnumDrop, IMinMax, User } from '@/types/game.types'

import { randomNumberFromInterval } from '@/utils/other.utils'

import { upgradeLevel } from '../level'

import { getStringDrop } from './getStringDrop'

const createMinBorder = (min: number) => {
	const borders: IMinMax = {
		min,
		max: 0,
	}
	return borders
}
export const dash = (user: User, dice: EnumDices) => {
	const { excitment: diceExcitment, drop: diceDrop } = DICES_INFO[dice]
	const dropped: { [key: string]: IMinMax } = {}
	const addExp = () => {
		const exp = randomNumberFromInterval(
			diceDrop[EnumDrop.addExp].min,
			diceDrop[EnumDrop.addExp].max,
		)

		const { totalBons, totalExp } = upgradeLevel(user, exp)

		if (totalBons.atFirst !== 0) {
			dropped[EnumDrop.expToBons] = {
				min: totalBons.atFirst,
				max: totalBons.end,
			}
		}
		if (totalExp !== 0) {
			dropped[EnumDrop.addExp] = createMinBorder(totalExp)
		}
	}

	const addBons = () => {
		const bons = randomNumberFromInterval(
			diceDrop[EnumDrop.addBon].min,
			diceDrop[EnumDrop.addBon].max,
		)
		user.bons += bons
		dropped[EnumDrop.addBon] = createMinBorder(bons)
	}
	const reduceExp = () => {
		if (user.face === MAX_LEVEL) return

		const exp = randomNumberFromInterval(
			diceDrop[EnumDrop.removeExp].min,
			diceDrop[EnumDrop.removeExp].max,
		)
		user.experience -= exp
		if (user.experience < 0) user.experience = 0
		dropped[EnumDrop.removeExp] = createMinBorder(exp - user.experience)
	}

	const reduceBons = () => {
		const bons = randomNumberFromInterval(
			diceDrop[EnumDrop.removeBon].min,
			diceDrop[EnumDrop.removeBon].max,
		)
		user.bons -= bons
		if (user.bons < 0) user.bons = 0
		dropped[EnumDrop.removeBon] = createMinBorder(bons - user.bons)
	}

	user.dices[dice] -= 1
	user.dashes += 1
	user.excitment += diceExcitment

	switch (dice) {
		case EnumDices.daily:
			addExp()
			break
		case EnumDices.gold:
			addBons()
			break
		case EnumDices.slot:
			user.freeSlots += randomNumberFromInterval(
				diceDrop[EnumDrop.addSlot].min,
				diceDrop[EnumDrop.addSlot].max,
			)
			dropped[EnumDrop.addSlot] = createMinBorder(0)
			break
		case EnumDices.infinity:
			addExp()
			addBons()
			reduceExp()
			reduceBons()
			break
		case 'ordinary':
		case 'extraordinary':
		case 'special':
			addExp()
			addBons()
	}

	return Object.entries(dropped)
		.map(([drop, amount]) => {
			return getStringDrop(drop as EnumDrop, amount)
		})
		.join('\n')
}
