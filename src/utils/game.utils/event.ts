import toast from 'react-hot-toast'

import { EnumDices, EnumSoraTaskAction, User } from '@/types/game.types'

import { getDrop } from './drop'
import { upgradeLevel } from './level'

interface ISoraActionEvent extends Event {
	detail: {
		action: EnumSoraTaskAction
		value: number
	}
}
export class SoraActionEvent extends Event implements ISoraActionEvent {
	constructor(
		action: EnumSoraTaskAction,
		value?: number,
		eventInitDict?: CustomEventInit,
	) {
		super('soraTaskAction', eventInitDict)
		this.detail.action = action
		if (value) this.detail.value = value
	}

	detail = {
		action: EnumSoraTaskAction.dash,
		value: 0,
	}
}
export const sendSoraActionEvent = (
	action: EnumSoraTaskAction,
	value: number,
) => {
	const newEvent = new SoraActionEvent(action, value)

	document.dispatchEvent(newEvent)
}
export const acceptSoraActionEvent = (
	user: User,
	detail: {
		action: EnumSoraTaskAction
		value: number
		otherData?: { diceType?: EnumDices }
	},
) => {
	if (user.face < 4) return false
	const { tasks } = user
	const { action, value } = detail

	if (!tasks.some(task => task.action === action)) return false
	if (tasks.every(task => task.isDone)) return false

	const task = tasks.find(task => task.action === action && !task.isDone)

	if (!task) return
	task.currValue += value
	if (task.currValue >= task.value) {
		task.isDone = true
		toast('Вы выполнили задание Соры!', { icon: '🎉' })
		for (const reward of task.rewards) {
			getDrop(user, reward)
		}
	}

	return true
}

interface IUpgradeLevelEvent extends Event {
	detail: {
		exp: number
	}
}
export class UpgradeLevelEvent extends Event implements IUpgradeLevelEvent {
	constructor(exp: number, eventInitDict?: CustomEventInit) {
		super('upgradeLevel', eventInitDict)

		this.detail.exp = exp
	}

	detail = {
		exp: 0,
	}
}
export const sendUpgradedLevelEvent = (exp: number) => {
	const newEvent = new UpgradeLevelEvent(exp)
	document.dispatchEvent(newEvent)
}
export const acceptUpgradedLevelEvent = (user: User, exp: number) => {
	upgradeLevel(user, exp)
}
