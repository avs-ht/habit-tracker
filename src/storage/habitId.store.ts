import { create } from 'zustand'

import { IHabitIdStore } from '@/types/store.types'

export const useHabitIdStore = create<IHabitIdStore>()(set => ({
	habitId: 0,
	setHabitId: (id: number) => set({ habitId: id }),
}))
