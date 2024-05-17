import { EnumTheme } from '@/types/settings.types'

export const THEMES_SHOPS = {
	[EnumTheme.custom]: {
		title: 'Кастомная тема',
		price: 500,
	},

	[EnumTheme.dark]: {
		title: 'Темная тема',
		price: 50,
	},

	[EnumTheme.light]: {
		title: 'Светлая тема',
		price: 50,
	},

	[EnumTheme.green]: {
		title: 'Зеленая тема',
		price: 50,
	},

	[EnumTheme.pink]: {
		title: 'Розовая тема',
		price: 50,
	},

	[EnumTheme.purple]: {
		title: 'Фиолетовая тема',
		price: 75,
	},

	[EnumTheme.yellow]: {
		title: 'Желтая тема',
		price: 50,
	},
}

export type TypeThemeShop = keyof typeof THEMES_SHOPS
export const themeShopKeys = Object.keys(THEMES_SHOPS)
