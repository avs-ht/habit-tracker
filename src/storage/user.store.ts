import { create } from 'zustand'
import { createJSONStorage } from 'zustand/middleware'
import { persist } from 'zustand/middleware'

import { EnumDices, User } from '@/types/game.types'
import { IUserStore } from '@/types/store.types'

import { CDate } from '@/utils/date.utils/miscellaneous'

export const defaultUser: User = {
	id: 0,
	name: 'User',
	freeSlots: 1,
	face: 1, // Уровень
	experience: 0,
	habits: [],
	dashes: 0,
	bons: 0, // Валюта
	dices: {
		[EnumDices.daily]: 1,
		[EnumDices.ordinary]: 0,
		[EnumDices.extraordinary]: 0,
		[EnumDices.special]: 0,
		[EnumDices.slot]: 0,
		[EnumDices.save]: 0,
		[EnumDices.gold]: 0,
		[EnumDices.infinity]: 0,
	},
	excitment: 0,
	soraExcitment: 0,
	soraCalmness: 5,
	lastEnter: CDate().getTime(),
	trainingCompleted: false,
	isHasInputRequst: false,
	tasks: [],
}

export const useUserStore = create<IUserStore>()(
	persist(
		set => ({
			currIdUser: 0,
			setCurrIdUser: (id: number) => set({ currIdUser: id }),
			users: [defaultUser],
			addUser: (user: User) =>
				set(state => {
					return { users: [...state.users, user] }
				}),
			removeUser: (id: number) =>
				set(state => ({ users: state.users.filter(user => user.id !== id) })),
			updateUser: (user: User) =>
				set(state => ({
					users: state.users.map(u => (u.id === user.id ? user : u)),
				})),
		}),
		{
			name: 'users',
			storage: createJSONStorage(() => localStorage),
		},
	),
)
