import clsx from 'clsx'

import styles from './bubble.module.scss'

interface IBubble {
	children: React.ReactNode
	className?: string
}
export const Bubble = ({ children, className }: IBubble) => {
	return (
		<div className={clsx(styles.bubble, className && className)}>
			{children}
		</div>
	)
}
