import { Title } from '@/components/ui/title/title'

import styles from './shopCard.module.scss'

interface IProps {
	title: string
	children: React.ReactNode
}
export const ShopCard = ({ title, children }: IProps) => {
	return (
		<div className={styles.card}>
			<Title htmlTitle="h4">{title}</Title>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
