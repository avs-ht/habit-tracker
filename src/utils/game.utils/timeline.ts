import toast from 'react-hot-toast'

import { SORA_NORMAL_CALMNESS } from '@/constants/game.constants'

import { EnumDices, User } from '@/types/game.types'

import { calcExcitmentForUser } from './excitment.'
import { generateTask } from './tasks'

export const rewardFn = (user: User) => {
	user.dices[EnumDices.daily]++
	setTimeout(() => toast('Награда за вход!\n+ Еженедельный дайс'), 0)
}
export const giveSoraTasks = (user: User) => {
	const currTasks = user.tasks.map(task => task.action)
	user.tasks = []
	if (user.face < 4 || user.soraCalmness < SORA_NORMAL_CALMNESS) return
	while (user.tasks.length < 2) {
		const excludedTasks = [...currTasks, ...user.tasks.map(task => task.action)]

		user.tasks.unshift(generateTask(user, excludedTasks))
		toast('У вас появилось задание Соры!', { icon: '❗' })
	}
}
export const updateSoraExcitment = (user: User, interval: number) => {
	const messages = {
		lossCalmness: 0,
		goCrazy: 0,
		getCalmness: 0,
	}
	for (let i = 0; i < interval; i++) {
		if (user.excitment < user.soraExcitment) {
			user.soraCalmness -= 1
			user.soraExcitment = user.excitment
			messages.lossCalmness++
			if (user.soraCalmness === 0) {
				messages.goCrazy++
				user.soraCalmness = 2
				user.experience = 0
				user.excitment = 0
				user.dices = {
					daily: 0,
					ordinary: 0,
					extraordinary: 0,
					special: 0,
					gold: 0,
					infinity: 0,
					save: 0,
					slot: 0,
				}
				user.soraExcitment =
					Math.round((Number(calcExcitmentForUser(user)) / 2) * 100) / 100
				user.bons = 0
				break
			}
		} else {
			messages.getCalmness++
			if (user.soraCalmness !== 5) user.soraCalmness++
		}

		user.excitment -= user.soraExcitment
		user.excitment = Math.round(user.excitment * 100) / 100
		user.soraExcitment =
			Math.round(Number(calcExcitmentForUser(user)) * 100) / 100
	}

	if (messages.goCrazy === 1) {
		setTimeout(
			() =>
				toast.error(
					'Сора сошел с ума. Он отобрал у вас все боны, дайсы и опыт. Теперь он спокоен',
					{
						duration: 4000,
						icon: '😵',
					},
				),
			0,
		)

		return
	}

	if (messages.lossCalmness > messages.getCalmness) {
		messages.lossCalmness -= messages.getCalmness
		setTimeout(
			() =>
				toast.error(
					`За время пока вас не было Сора ${messages.lossCalmness} раз потерял спокойствие`,
					{
						duration: 4000,
						icon: '😰',
					},
				),
			0,
		)
	} else if (messages.lossCalmness <= messages.getCalmness) {
		setTimeout(
			() =>
				toast.error(
					`За время пока вас не было Сора смог сохранить свое спокойство`,
					{
						duration: 4000,
						icon: '😀',
					},
				),
			0,
		)
	}
}
