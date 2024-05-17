import type { Dispatch, SetStateAction } from 'react'

import { Text } from '@/components/ui/text/text'
import { Title } from '@/components/ui/title/title'

import { IPreparedHabit } from '@/constants/tracker.constants'

import { InstallableHabit } from '../readyHabits'

import styles from './readyHabit.module.scss'

interface IProps {
	readyHabit: IPreparedHabit
	category: string
	setHabit: Dispatch<SetStateAction<InstallableHabit | undefined>>
}
export const ReadyHabit = ({ readyHabit, category, setHabit }: IProps) => {
	const { title, targetValue, period } = readyHabit
	const onClick = () => {
		const installableHabit = {
			title,
			period,
			targetValue,
			category,
		}
		setHabit(installableHabit)
	}
	return (
		<button type="button" onClick={onClick} className={styles['ready-habit']}>
			<Title htmlTitle="h4">{title}</Title>
			<div className={styles.info}>
				<Text>Периодичность: {`${period.label}`}</Text>
				{targetValue ? <Text>Цель: {targetValue}</Text> : null}
			</div>
		</button>
	)
}
