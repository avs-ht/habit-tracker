import { CSSProperties } from 'react'

import type { IText } from '@/types/ui.types'

import styles from './text.module.scss'

const TEXT_MARGIN_BOTTOM = 100
export const Text = ({
	children,
	marginBottomCoef = 0,
	maxWidth = 0,
}: IText) => {
	const marginBottom = marginBottomCoef * TEXT_MARGIN_BOTTOM
	const style: CSSProperties = {
		marginBottom: `${marginBottom}px`,
		maxWidth: maxWidth ? `${maxWidth}px` : `100%`,
	}
	return (
		<p style={style} className={styles.text}>
			{children}
		</p>
	)
}
