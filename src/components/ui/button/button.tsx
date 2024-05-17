import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

import { IButton } from '@/types/ui.types'

import styles from './button.module.scss'

export const Button = ({
	children,
	href = '',
	className,
	shouldBreak = false,
	...props
}: IButton) => {
	const generatedClassName = clsx(
		styles.button,
		className,
		shouldBreak && styles.breakable,
	)

	return href ? (
		<Link to={href} className={generatedClassName}>
			{children}
		</Link>
	) : (
		<button {...props} className={generatedClassName}>
			{children}
		</button>
	)
}
