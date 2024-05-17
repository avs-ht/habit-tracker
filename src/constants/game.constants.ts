import { EnumDices, EnumDrop, IDiceInfo } from '@/types/game.types'

import {
	giveSoraTasks,
	rewardFn,
	updateSoraExcitment,
} from '@/utils/game.utils/timeline'

export const SHOP_DICES: {
	[key: string]: {
		price: number
		description: string
		donate?: {
			price: number
		}
	}
} = {
	[EnumDices.infinity]: {
		price: 500,
		description: 'Достаточно опасный...',
		donate: {
			price: 20,
		},
	},
	[EnumDices.slot]: {
		price: 40,
		description: 'Добавляет слот',
	},
	[EnumDices.special]: {
		price: 20,
		description: 'Улучшенная версия обычного дайса',
	},
}
// Cколько опыта нужно чтоб перейти на следующий уровень
export const REQUIERED_EXPIRIENCE_FOR_LEVELS: {
	[key: number]: number
} = {
	1: 5,
	2: 6,
	3: 7,
	4: 8,
	5: 9,
	6: 10,
	7: 11,
	8: 12,
	9: 13,
	10: 20, // point
	11: 15,
	12: 17,
	13: 19,
	14: 21,
	15: 23,
	16: 25,
	17: 27,
	18: 29,
	19: 31,
	20: 40, // point
	21: 31,
	22: 34,
	23: 37,
	24: 40,
	25: 43,
	26: 46,
	27: 49,
	28: 52,
	29: 55,
	30: 65, // point
	31: 55,
	32: 59,
	33: 63,
	34: 67,
	35: 71,
	36: 75,
	37: 79,
	38: 83,
	39: 87,
	40: 100, // point
	41: 0,
}

export const MAX_LEVEL = Object.keys(REQUIERED_EXPIRIENCE_FOR_LEVELS).length

export const LEVEL_REWARDS: {
	[key: number]: {
		type: EnumDrop
		amount: number
		diceType?: EnumDices
	}[]
} = {
	2: [{ type: EnumDrop.addSlot, amount: 1 }],
	3: [{ type: EnumDrop.addBon, amount: 5 }],
	4: [{ type: EnumDrop.addSlot, amount: 1 }],
	5: [
		{
			type: EnumDrop.addDice,
			amount: 1,
			diceType: EnumDices.extraordinary,
		},
	],
	8: [
		{ type: EnumDrop.addSlot, amount: 1 },
		{ type: EnumDrop.addBon, amount: 10 },
	],
	15: [{ type: EnumDrop.addSlot, amount: 1 }],
	29: [
		{ type: EnumDrop.addSlot, amount: 1 },
		{ type: EnumDrop.addBon, amount: 25 },
	],
	40: [{ type: EnumDrop.addSlot, amount: 1 }],
}
export const CHANCE_REPLACE_ORDINARY_WITH_GOLD = 0.02
export const DICES_INFO: { [key in EnumDices]: IDiceInfo } = {
	[EnumDices.daily]: {
		name: 'Ежедневный',
		description: 'Можно получить, заходя каждый день в игру',

		excitment: 0.5,
		drop: {
			[EnumDrop.addExp]: {
				min: 1,
				max: 2,
			},
		},
	},
	[EnumDices.ordinary]: {
		name: '6-гранный',
		description: 'Можно получить за выполнение привычки',
		excitment: 1,
		drop: {
			[EnumDrop.addExp]: {
				min: 1,
				max: 3,
			},
			[EnumDrop.addBon]: {
				min: 0,
				max: 2,
			},
		},
	},
	[EnumDices.extraordinary]: {
		name: '12-гранный',
		description: 'Можно получить, если сделать недельный страйк',
		excitment: 6,
		drop: {
			[EnumDrop.addExp]: {
				min: 6,
				max: 10,
			},
			[EnumDrop.addBon]: {
				min: 1,
				max: 4,
			},
		},
	},
	[EnumDices.special]: {
		name: '18-гранный',
		description: 'Можно получить, если сделать месячный страйк',
		excitment: 24,
		drop: {
			[EnumDrop.addExp]: {
				min: 24,
				max: 36,
			},
			[EnumDrop.addBon]: {
				min: 1,
				max: 4,
			},
		},
	},
	[EnumDices.slot]: {
		name: 'Слот',
		description: 'Можно получить, купив в магазине',
		excitment: 0,
		drop: {
			[EnumDrop.addSlot]: {
				min: 1,
				max: 0,
			},
		},
	},
	[EnumDices.save]: {
		name: 'Save',
		description: 'Можно получить, купив в магазине',
		excitment: -10,
		drop: {
			[EnumDrop.removeExp]: {
				min: 10,
				max: 0,
			},
			[EnumDrop.saveSlot]: {
				min: 1,
				max: 0,
			},
		},
	},
	[EnumDices.gold]: {
		name: 'Золотой',
		description: 'Можно получить с малой вероятностью вместо 6гранного',
		excitment: 10,
		drop: {
			[EnumDrop.addBon]: {
				min: 1,
				max: 100,
			},
		},
	},
	[EnumDices.infinity]: {
		name: 'Infinity',
		description:
			'Достаточно рисковый кубик, но Электрону не терпиться его кинуть!',
		excitment: 100,
		drop: {
			[EnumDrop.removeBon]: {
				min: 100,
				max: 1000,
			},
			[EnumDrop.addBon]: {
				min: 100,
				max: 1000,
			},
			[EnumDrop.addExp]: {
				min: 100,
				max: 1000,
			},
			[EnumDrop.removeExp]: {
				min: 100,
				max: 1000,
			},
		},
	},
}

export const DAILY_FUNCTIONS = [rewardFn, giveSoraTasks]
export const INTERVAL_FUNCTIONS = [updateSoraExcitment]

export const TRAINING_TEXT: { [key: number]: string } = {
	0: 'Привет, я Сора!',
	1: 'Я очень сильно зависим от игр, особенно азартных. Недавно я играл в VR игру и упал со 2 этажа дома.\n Обошлось переломом рук. Но теперь я не могу играть в игры 😞',
	2: 'Чтоб мне не было скучно, я прошу тебя кидать кубики. Взамен, я тебе дам собственную систему трекинга привычек',
	3: 'Сейчас мы на панели создания привычек, тут ты сможешь создавать привычки. Чтоб их создать тебе нужно будет иметь свободные слоты',
	4: 'Как видишь, ты можешь выбрать имя, категорию, периодичность. Также я заранее создал тебе уже готовые привычки, если тебе лень их делать', // /habits/new
	5: 'Слоты можно будет купить или получить за повышения твоей грани. Грань - показатель твоего уровня.', // /shop
	6: 'Валюту, которую ты будешь использовать - боны. Её можно получить за броски дайсов (дэши)',
	7: 'Кроме слотов ты можешь купить кастомизацию и другие дайсы. Дайсы - кубики, которые ты будешь бросать. В течение трекинга своих привычек ты будешь собирать разные кубики 🎲',
	8: 'Дайс, которым ты уже обладаешь - ежедневный. Хоть и с него маленькая награда, но зато ты будешь получать его каждый день', // /dices
	9: 'За трекинг привычек ты будешь получать дайсы: 6, 12, 18-гранные. С повышением грани будут расти и награда, и азарт.', // /dices/open?dice=daily
	10: 'Как я раньше сказал, я азартный человек. Каждый день я тебе буду давать требуемое количество азарта. Если его будет недосаточно, то я начну терять спокойствие, а потом вовсе сойду с ума', // /sora
	11: 'При достижении определенной грани я буду давать тебя задания. За их выполнение я тебе будут давать награды.',
	12: 'Например: Трекать еженедельную привычку 4 недели.',
	13: 'В профиле ты можешь посмотреть боны, грань, и статистику своего трекинга', // /profile
	14: 'Кроме того, ты можешь позвать своих друзей. Они могут создать свой профиль, и тогда вы сможете вместе соревноваться, трекать совместные привычки',
	15: 'Удачи тебе! О других недосказаных механиках ты узнаешь в течение трекинга! (И не забудь, не дай мне сойти с ума...)',
	16: '',
}

export const SORA_NORMAL_CALMNESS = 3
export const TRAINING_BUTTON: { [key: number]: string } = {
	0: 'Далее',
	1: 'Понятно',
	2: 'Отлично, то что мне нужно!',
	3: 'Далее',
	4: 'Понял',
	5: 'Далее',
	6: 'Интересно',
	7: 'Ясно',
	8: 'Класс',
	9: 'Невероятно',
	10: 'Сумашедший...',
	11: 'Спасибо',
	12: 'Я и так понял',
	13: 'Ага',
	14: 'У меня нет друзей',
	15: 'Наконец-то',
	16: '',
}
