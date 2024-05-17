import { RefObject } from 'react'

import styles from './menuButton.module.scss'

export const MenuButton = ({
	navContainerRef: navRef,
}: {
	navContainerRef: RefObject<HTMLDivElement>
}) => {
	return (
		<button
			aria-label="Открыть меню"
			className={styles.burger}
			onClick={() => {
				navRef.current!.dataset.opened = 'true'
			}}
		>
			<div className={styles.line} />
			<div className={styles.line} />
			<div className={styles.line} />
		</button>
	)
}
