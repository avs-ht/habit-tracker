import { IThemeFormState } from '@/types/forms.types'
import {
	EnumCustomThemeProperties,
	TypeKeyOfCustomTheme,
} from '@/types/ui.types'

export const clearCustomTheme = () => {
	for (const property in EnumCustomThemeProperties) {
		document.documentElement.style.removeProperty(
			EnumCustomThemeProperties[property as TypeKeyOfCustomTheme],
		)
	}
}

export const setCustomTheme = ({
	customTheme,
}: Pick<IThemeFormState, 'customTheme'>) => {
	if (!customTheme) return
	document.documentElement.style.setProperty('--custom-button-c', '#fff')
	for (const property in EnumCustomThemeProperties) {
		document.documentElement.style.setProperty(
			EnumCustomThemeProperties[property as TypeKeyOfCustomTheme],
			customTheme[property as TypeKeyOfCustomTheme],
		)
	}
}
