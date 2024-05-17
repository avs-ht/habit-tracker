import { useEffect, useRef } from 'react'

import { Text } from '@/components/ui/text/text'

import styles from './progressBar.module.scss'

interface IProps {
	currValue: number
	maxValue: number
}

const BAR_COLORS_BORDERS = {
	bad: 0.4,
	middle: 0.8,
	good: 1,
}
const BAR_COLORS = {
	good: 'var(--progress-bar-good-c)',
	middle: 'var(--progress-bar-middle-c)',
	bad: 'var(--progress-bar-bad-c)',
}
export const ProgressBar = ({ currValue, maxValue }: IProps) => {
	const scaleValue = currValue / maxValue
	const progressBarRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		progressBarRef.current?.style.setProperty('--scale', `${scaleValue}`)
		const barColor =
			scaleValue < BAR_COLORS_BORDERS.bad
				? BAR_COLORS.bad
				: scaleValue < BAR_COLORS_BORDERS.middle
					? BAR_COLORS.middle
					: BAR_COLORS.good

		progressBarRef.current?.style.setProperty('--bar-color', barColor)
	}, [scaleValue])

	return (
		<div className={styles.container}>
			<div ref={progressBarRef} className={styles['progress-bar']}></div>

			<Text>
				{currValue}/{maxValue}
			</Text>
		</div>
	)
}
