import styles from './shopPage.module.scss'
import { Shop } from '@/components/shop/shop'
import { Title } from '@/components/ui/title/title'

export const ShopPage = () => {
	return (
		<>
			<Title htmlTitle="h2" className={styles.title}>
				Магазин
			</Title>
			<Shop />
		</>
	)
}
