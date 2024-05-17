import { Title } from '@/components/ui/title/title'

import styles from './smallStat.module.scss'

export interface IProps {
	title: string
	value: number
}
export const SmallStat = ({ title, value }: IProps) => (
	<div className={styles.stat}>
		<Title htmlTitle="h3" className={styles.title}>
			{title}
		</Title>
		<Title htmlTitle="h4">{value.toString()}</Title>
	</div>
)
