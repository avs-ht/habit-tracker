import { UploadHabit, UploadHabitAction } from './upload.types'

export enum EnumDices {
	daily = 'daily',
	ordinary = 'ordinary',
	extraordinary = 'extraordinary',
	special = 'special',
	slot = 'slot',
	save = 'save',
	gold = 'gold',
	infinity = 'infinity',
}
export enum EnumDrop {
	addExp = 'addExp',
	addBon = 'addBon',
	removeBon = 'removeBon',
	removeExp = 'removeExp',
	addSlot = 'addSlot',
	saveSlot = 'saveSlot',
	expToBons = 'expToBons',
	addDice = 'addDice',
}

export interface IReward {
	type: EnumDrop
	amount: number
}
export interface IMinMax {
	min: number
	max: number
}
export interface IDiceInfo {
	name: string
	description: string
	excitment: number
	drop: Record<string, IMinMax>
}

export enum EnumSoraTaskAction {
	dash = 'dash',
	shopBuy = 'shopBuy',
	getAcceptedHabit = 'getAcceptedHabit',
	createWeeklyHabit = 'createWeeklyHabit',
	getNewFace = 'getNewFace',
}

export interface ISoraTask {
	action: EnumSoraTaskAction
	value: number
	endDate: Date
	isDone: boolean
	currValue: number
	rewards: IReward[]
}
export interface User {
	id: number
	name: string
	freeSlots: number
	experience: number
	face: number
	bons: number
	dashes: number
	habits: Habit[]
	excitment: number
	soraExcitment: number
	soraCalmness: number
	lastEnter: number
	trainingCompleted: boolean
	tasks: ISoraTask[]
	dices: { [key in EnumDices]: number }
	isHasInputRequst: boolean
}
export interface Habit extends UploadHabit {
	habitActions: HabitAction[]
	isTracking: boolean
}

export interface HabitAction extends UploadHabitAction {
	isCancelTrackingAction?: boolean
	startTrackingDate?: Date
	isWeeklyAction?: boolean
	isMonthlyAction?: boolean
}
