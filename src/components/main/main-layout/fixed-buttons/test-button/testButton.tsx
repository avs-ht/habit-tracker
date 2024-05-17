import { Link } from '@tanstack/react-router'
import { Hammer } from 'lucide-react'

import styles from './testButton.module.scss'

export const TestButton = ({ iconSize }: { iconSize: number }) => (
	<div title="Открыть тестовую систему">
		<Link
			className={styles.button}
			to="/test"
			aria-label="Открыть тестовую систему"
		>
			<Hammer size={iconSize} />
		</Link>
	</div>
)
