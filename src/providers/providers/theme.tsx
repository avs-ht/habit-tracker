import { createContext, useEffect } from 'react'

import { EnumTheme } from '@/types/settings.types'

import { useCurrId } from '@/hooks/user/useCurrId'

import { clearCustomTheme, setCustomTheme } from '@/utils/other.utils/theme'

import { useSettingsStore } from '@/storage/settings.store'

const ThemeContext = createContext<EnumTheme>(EnumTheme.light)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const id = useCurrId()
	const theme = useSettingsStore(state => state.settings[id].theme)
	const customTheme = useSettingsStore(state => state.settings[id].customTheme)
	useEffect(() => {
		document.documentElement.dataset.theme = theme
		if (theme === EnumTheme.custom && customTheme) {
			setCustomTheme({ customTheme })
		} else clearCustomTheme()
	}, [theme, customTheme])

	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
