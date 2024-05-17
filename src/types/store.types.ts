import type { User } from './game.types'
import type { ISettings } from './settings.types'
import type { UploadHabit } from './upload.types'

export interface IUserStore {
	users: User[]
	addUser: (user: User) => void
	removeUser: (id: number) => void
	currIdUser: number
	setCurrIdUser: (id: number) => void
	updateUser: (user: User) => void
}

export interface IHabitIdStore {
	habitId: number
	setHabitId: (id: number) => void
}

export interface ISettingsStore {
	settings: { [key: number]: ISettings }
	setSettings: (settings: ISettings, id: number) => void
}

export interface IUserRequest {
	id: number
	type: 'offerHabit' | 'acceptedHabit' | 'declinedHabit'
	data: {
		recipientId: number
		senderId: number
		offerHabit?: Omit<UploadHabit, 'id' | 'addDate'>
	}
}
export interface IRequestsStore {
	requests: IUserRequest[]
	addRequest: (request: IUserRequest) => void
	deleteRequest: (requestId: number) => void
}
