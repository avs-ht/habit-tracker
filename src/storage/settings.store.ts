import { create } from 'zustand'
import { createJSONStorage } from 'zustand/middleware'
import { persist } from 'zustand/middleware'

import { EnumTheme, ISettings } from '@/types/settings.types'
import { ISettingsStore } from '@/types/store.types'

export const defaultSettings: ISettings = {
	theme: EnumTheme.blue,
	purchasedThemes: [EnumTheme.blue, EnumTheme.dark],
	showFixedButtons: true,
	customTheme: undefined,
	isRequestsAccepting: true,
	allowNotifications: true,
}

export const useSettingsStore = create<ISettingsStore>()(
	persist(
		set => ({
			settings: {
				0: defaultSettings,
			},
			setSettings: (settings: ISettings, id: number) =>
				set(state => ({ settings: { ...state.settings, [id]: settings } })),
		}),
		{
			name: 'settings',
			storage: createJSONStorage(() => localStorage),
		},
	),
)
