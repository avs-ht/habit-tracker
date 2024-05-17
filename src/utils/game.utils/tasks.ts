import {
	DICES_INFO,
	REQUIERED_EXPIRIENCE_FOR_LEVELS,
} from '@/constants/game.constants'

import {
	EnumDices,
	EnumDrop,
	EnumSoraTaskAction,
	ISoraTask,
	User,
} from '@/types/game.types'

import { CDate, nullDate } from '../date.utils/miscellaneous'

const allTasks = Object.values(EnumSoraTaskAction)

const generateValue = (user: User, action: EnumSoraTaskAction) => {
	switch (action) {
		case EnumSoraTaskAction.dash:
			return user.habits.filter(habit => habit.period === 'daily').length + 1
		case EnumSoraTaskAction.getAcceptedHabit:
		case EnumSoraTaskAction.createWeeklyHabit:
		case EnumSoraTaskAction.getNewFace:
		case EnumSoraTaskAction.shopBuy:
			return 1
		default:
			return 999999999
	}
}

const generateRewards = (user: User, action: EnumSoraTaskAction) => {
	const exp = Math.round(REQUIERED_EXPIRIENCE_FOR_LEVELS[user.face] / 5)
	switch (action) {
		case EnumSoraTaskAction.dash:
			return [
				{
					type: EnumDrop.addExp,
					amount: 15 <= exp ? 15 : exp,
				},
			]
		case EnumSoraTaskAction.shopBuy:
			return [
				{
					type: EnumDrop.addBon,
					amount: 15,
				},
			]
		case EnumSoraTaskAction.getAcceptedHabit:
			return [
				{
					type: EnumDrop.addBon,
					amount: 10,
				},
				{
					type: EnumDrop.addDice,
					amount: 1,
					diceType: EnumDices.extraordinary,
				},
				{
					type: EnumDrop.addSlot,
					amount: 1,
				},
			]
		case EnumSoraTaskAction.createWeeklyHabit:
			return [
				{
					type: EnumDrop.addBon,
					amount: 3,
				},
				{
					type: EnumDrop.addExp,
					amount: 5,
				},
			]
		case EnumSoraTaskAction.getNewFace:
			return [
				{
					type: EnumDrop.addBon,
					amount: 10,
				},
			]
	}
}
export const generateTask = (
	user: User,
	excludedTasks: EnumSoraTaskAction[],
) => {
	const avaibleTasks = allTasks.filter(task => !excludedTasks.includes(task))
	const newTask: ISoraTask = {
		action: avaibleTasks[Math.floor(Math.random() * avaibleTasks.length)],
		currValue: 0,
		value: 0,
		endDate: CDate(),
		isDone: false,
		rewards: [],
	}

	nullDate(newTask.endDate)
	newTask.endDate.setDate(newTask.endDate.getDate() + 1)

	newTask.value = generateValue(user, newTask.action)
	newTask.rewards = generateRewards(user, newTask.action)

	return newTask
}

const generateRewardText = (reward: {
	type: EnumDrop
	amount: number
	diceType?: EnumDices
}) => {
	switch (reward.type) {
		case EnumDrop.addSlot:
			return `+1 слот`
		case EnumDrop.addBon:
			return `+${reward.amount} бон(ов)`
		case EnumDrop.addExp:
			return `+${reward.amount} опыт(a)`
		case EnumDrop.addDice:
			return `+${reward.amount} ${DICES_INFO[reward.diceType!].name} дайс`
	}
}
export const generateTaskText = (task: ISoraTask) => {
	const text = {
		title: '',
		value: '',
		rewards: '',
	}

	switch (task.action) {
		case EnumSoraTaskAction.dash:
			text.title = `Совершить дэш ${task.value} раз(a)`
			break
		case EnumSoraTaskAction.shopBuy:
			text.title = `Совершить покупку в магазине`

			break
		case EnumSoraTaskAction.getAcceptedHabit:
			text.title = `Получить согласие на совместную привычку`
			break
		case EnumSoraTaskAction.createWeeklyHabit:
			text.title = `Cоздайте еженедельную привычку`
			break
		case EnumSoraTaskAction.getNewFace:
			text.title = `Получите новый уровень`
			break
	}

	text.rewards = `${task.rewards.map(reward => generateRewardText(reward)).join(', ')}`
	text.value = `${task.currValue}/${task.value}`
	return text
}
