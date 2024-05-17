import clsx from 'clsx'

import { ITitle } from '@/types/ui.types'

import styles from './title.module.scss'

export const Title = ({ htmlTitle, children, className, ...props }: ITitle) => {
	const generatedClassName = clsx(className, `${styles.title}`)
	switch (htmlTitle) {
		case 'h1':
			return (
				<h1 className={generatedClassName} {...props}>
					{children}
				</h1>
			)
		case 'h2':
			return (
				<h2 className={generatedClassName} {...props}>
					{children}
				</h2>
			)
		case 'h3':
			return (
				<h3 className={generatedClassName} {...props}>
					{children}
				</h3>
			)
		case 'h4':
			return (
				<h4 className={generatedClassName} {...props}>
					{children}
				</h4>
			)
		case 'h5':
			return (
				<h5 className={generatedClassName} {...props}>
					{children}
				</h5>
			)
	}
}
