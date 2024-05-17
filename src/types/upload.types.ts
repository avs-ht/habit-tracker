import { TypePeriod } from './forms.types'

export interface DataToUpload {
	// данные о самих привычках
	habits: UploadHabit[]

	// данные о выполнении
	actions: UploadHabitAction[]
}

export interface UploadHabit {
	// у каждой привычки уникальный id
	id: number

	title: string

	category: string

	// дата, начиная с которой Вася трекает эту привычку
	addDate: Date

	period: TypePeriod

	// необязательное поле – целевое значение для численных привычек,
	// например, пройти 10000 шагов
	targetValue?: number
}

export interface UploadHabitAction {
	// id привычки, чтобы связать с объектами Habit
	id: number

	// дата и время, когда это действие отмечено как выполненное
	date: Date

	// необязательное поле – значение для численных привычек,
	// например, 12000 для привычки "пройти 10000 шагов"
	value?: number
}
