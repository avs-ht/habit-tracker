import { Link } from '@tanstack/react-router'
import { Store } from 'lucide-react'

import styles from './shopButton.module.scss'

export const ShopButton = ({ iconSize }: { iconSize: number }) => (
	<div title="Открыть магазин">
		<Link className={styles.button} to="/shop" aria-label="Открыть магазин">
			<Store size={iconSize} />
		</Link>
	</div>
)
