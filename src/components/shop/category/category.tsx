import { Title } from '../../ui/title/title'

import styles from './category.module.scss'

interface IProps {
	category: string
	children?: React.ReactNode
}
export const ShopCategory = ({ category, children }: IProps) => {
	return (
		<div className={styles.category}>
			<Title htmlTitle="h3">
				<b>{category}</b>
			</Title>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
