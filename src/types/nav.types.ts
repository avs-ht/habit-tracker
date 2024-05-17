export type TypeHref =
	| '/'
	| '/sora'
	| '/shop'
	| '/test'
	| '/dices'
	| '/habits'
	| '/profile'
	| '/settings'
	| '/habits/new'
	| '/habits/$habitId'
	| '/habits/$habitId/history'
	| '/test/users'
	| '/test/time'
	| '/test/upload'
	| '/profile/stats'
	| '/profile/new'
	| '/rating'
	| '/sora/tasks'
export interface INavLink {
	title: string
	href: TypeHref
	img?: JSX.Element
}
