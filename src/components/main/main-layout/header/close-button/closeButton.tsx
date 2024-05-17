import { X as XIcon } from 'lucide-react'
import { RefObject } from 'react'

import styles from './closeButton.module.scss'

export const CloseButton = ({
	navContainerRef: navRef,
}: {
	navContainerRef: RefObject<HTMLDivElement>
}) => {
	return (
		<button
			aria-label="Закрыть меню"
			className={styles['close-button']}
			onClick={() => {
				navRef.current!.dataset.opened = 'false'
			}}
		>
			<XIcon color="#fff" size={35} />
		</button>
	)
}
