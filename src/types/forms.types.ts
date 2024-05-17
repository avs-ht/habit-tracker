import { Habit, HabitAction, User } from './game.types'
import { EnumTheme } from './settings.types'
import { ISelectOption } from './ui.types'

interface ISelectUserId {
	userId: ISelectOption
}

export type TypePeriod = 'daily' | 'weekly' | 'monthly'
export type TypePeriodState = {
	value: TypePeriod
	label: string
}
export interface IHabitFormState
	extends Omit<Habit, 'id' | 'addDate' | 'period' | 'isTracking'> {
	period: TypePeriodState
	whoOffer?: number
}

export interface IHabitActionFormState
	extends Omit<HabitAction, 'id' | 'date'> {}

export interface IHistoryFilterFormState {
	cancelTrackingActions: boolean
	commonActions: boolean
}
export interface IUploadFileFormState extends ISelectUserId {
	files: FileList
}

export interface INewProfileFormState {
	name: string
}

export interface IChangeProfileFormState extends ISelectUserId {}

export interface ITestUserFormState
	extends ISelectUserId,
		Omit<User, 'id' | 'name' | 'dashes' | 'habits' | 'lastEnter' | 'dices'> {
	habitId: ISelectOption
	dailyDices: number
	ordinaryDices: number
	extraordinaryDices: number
	specialDices: number
	slotDices: number
	saveDices: number
	goldDices: number
	infinityDices: number
}

export interface IReadyHabitsFormState {
	category: ISelectOption
}

export interface IShowFixedButtonsFormState {
	showFixedButtons: boolean
}
export interface IIsAcceptingFormState {
	isRequestsAccepting: boolean
}

export interface IThemeFormState {
	theme: {
		value: EnumTheme
		label: string
	}
	customTheme?: {
		background: string
		nav: string
		text: string
		title: string
		link: string
	}
}

export interface ITimeFormState {
	date: Date
	time: string
}

export interface IFilterHabitsFormState {
	daily: boolean
	weekly: boolean
	monthly: boolean
}
