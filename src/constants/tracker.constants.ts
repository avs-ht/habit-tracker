import { IHabitFormState, TypePeriodState } from '@/types/forms.types'
import { ISelectOption } from '@/types/ui.types'

export const PERIOD_SECTIONS: TypePeriodState[] = [
	{ value: 'daily', label: 'Ежедневно' },
	{ value: 'weekly', label: 'Еженедельно' },
	{ value: 'monthly', label: 'Ежемесячно' },
]

export interface IPreparedHabit
	extends Omit<IHabitFormState, 'habitActions' | 'category'> {}
export const PREPARED_HABITS: { [key: string]: IPreparedHabit[] } = {
	Здоровье: [
		{
			title: 'Проходить 10км в день',
			period: PERIOD_SECTIONS[0],
			targetValue: 10,
		},
		{
			title: 'Пить 2 литра воды в день',
			period: PERIOD_SECTIONS[0],
			targetValue: 2,
		},
		{
			title: 'Употреблять 5 порций фруктов и овощей в день',
			period: PERIOD_SECTIONS[0],
			targetValue: 5,
		},
		{
			title: 'Посещать тренажерный зал 3 раза в неделю',
			period: PERIOD_SECTIONS[1],
			targetValue: 3,
		},
		{
			title: 'Практиковать йогу каждый день',
			period: PERIOD_SECTIONS[0],
		},
	],
	Творчество: [
		{
			title: 'Рисовать акварельный пейзаж каждую неделю',
			period: PERIOD_SECTIONS[1],
		},
		{
			title: 'Участвовать в ежемесячных художественных конкурсах',
			period: PERIOD_SECTIONS[2],
		},
		{
			title: 'Раз в неделю делать фотографии в новом стиле',
			period: PERIOD_SECTIONS[1],
		},
		{
			title: 'Создавать еженедельные блог-посты о своем творчестве',
			period: PERIOD_SECTIONS[1],
		},
	],
	Саморазвитие: [
		{
			title: 'Читать 30 минут в день',
			period: PERIOD_SECTIONS[0],
			targetValue: 30,
		},
		{
			title: 'Учить 10 новых слов каждый день',
			period: PERIOD_SECTIONS[0],
			targetValue: 10,
		},
		{
			title: 'Прослушивать аудиокниги в дороге',
			period: PERIOD_SECTIONS[2],
		},
	],
	// :)
	Геншин: [
		{
			title: 'Не выбить последнюю консту на ке цин :(',
			period: PERIOD_SECTIONS[2],
		},
		{
			title: 'Забрасывать каждый месяц помидорами miHoYo',
			period: PERIOD_SECTIONS[2],
		},
		{
			title: 'Успешно заскамиться на оружейке',
			period: PERIOD_SECTIONS[2],
			targetValue: 2,
		},
		{
			title: 'Поиграть со мной в геншин 720445490',
			period: PERIOD_SECTIONS[2],
		},
	],
	'Аниме/Манга': [
		{
			title: 'Ждать завершения Хиатуса Х Хиатуса',
			period: PERIOD_SECTIONS[0],
		},
		{
			title: 'Посмотреть типичный сёнен',
			period: PERIOD_SECTIONS[2],
		},
		{
			title: 'Кэнтаро Миура...',
			period: PERIOD_SECTIONS[0],
		},
	],
	Программирование: [
		{
			title: 'Посмотреть ролики Хауди Хо',
			period: PERIOD_SECTIONS[1],
			targetValue: 3,
		},
		{
			title: 'Остаться живым',
			period: PERIOD_SECTIONS[0],
		},
		{
			title: 'Получить хотя бы 101 балл на закле прода :)',
			period: PERIOD_SECTIONS[2],
		},
	],
}

export const PREPARED_CATEGORIES = Object.keys(PREPARED_HABITS)

export const CATEGORIES_SELECT_OPTIONS: ISelectOption[] =
	PREPARED_CATEGORIES.map(category => ({
		value: category,
		label: category,
	}))
