export enum EnumTheme {
	light = 'light',
	dark = 'dark',
	custom = 'custom',
	blue = 'blue',
	green = 'green',
	yellow = 'yellow',
	pink = 'pink',
	purple = 'purple',
}

export interface ISettings {
	theme: EnumTheme
	isRequestsAccepting: boolean
	allowNotifications: boolean
	purchasedThemes: EnumTheme[]
	showFixedButtons: boolean
	customTheme?: {
		background: string
		nav: string
		text: string
		title: string
		link: string
	}
}
export type TypeСustomizableSetting =
	| 'showFixedButtons'
	| 'isRequestsAccepting'
	| 'allowNotifications'
