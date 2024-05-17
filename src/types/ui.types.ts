import type {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	DialogHTMLAttributes,
	Dispatch,
	HTMLAttributes,
	InputHTMLAttributes,
	RefObject,
	SetStateAction,
} from 'react'
import type {
	Control,
	FieldError,
	FieldValues,
	UseFormRegisterReturn,
	UseFormSetValue,
} from 'react-hook-form'

import type { TypeHref } from './nav.types'
import type { EnumTheme } from './settings.types'

export type TypeTitle = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
export interface IText {
	children: string | React.ReactNode
	// Коффициент отсупа (0 - 1). Отсутуп будет равен кофф * TEXT_MARGIN_BOTTOM
	marginBottomCoef?: number
	maxWidth?: number
}
export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	register: UseFormRegisterReturn
	error?: FieldError | undefined
	label?: string
}

export interface ITitle extends HTMLAttributes<HTMLHeadingElement> {
	htmlTitle: TypeTitle
	children: React.ReactNode
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	shouldBreak?: boolean
	href?: TypeHref | ''
	extraClass?: string
}

export interface ICheckbox extends IInput {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValue: UseFormSetValue<any>
	label: string
}

export interface ISelectOption {
	value: number | string | EnumTheme
	label: string
}
export interface ISelect<T extends FieldValues> {
	selectOptions: ISelectOption[]
	name: string
	defaultValue: ISelectOption
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<T, any>
	title?: string
}

export interface IModal
	extends Omit<
		DetailedHTMLProps<
			DialogHTMLAttributes<HTMLDialogElement>,
			HTMLDialogElement
		>,
		'className'
	> {
	children: React.ReactNode
	returnModalRef: RefObject<HTMLDialogElement>
	isOpenButtonNeed?: boolean
	isCloseButtonNeed?: boolean
	openButtonText?: string
	classNameButton?: string
	classNameDialog?: string
	closeFunction?: () => void
}

export enum EnumCustomThemeProperties {
	background = '--bg-c',
	nav = '--nav-bg-c',
	text = '--primary-c',
	title = '--title-c',
	link = '--link-c',
}

export type TypeKeyOfCustomTheme = keyof typeof EnumCustomThemeProperties

export interface IPAginationButtons {
	setIndex: Dispatch<SetStateAction<number>>
	index: number
	step: number
	maxIndex: number
}

export interface ITimeText {
	date: Date
	children: string
}

export interface IDonateFormState {
	cardNumber: number
	cvc: number
	expDate: string
}
