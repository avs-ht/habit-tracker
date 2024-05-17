import { CircleChevronLeft } from 'lucide-react'
import { useState } from 'react'

import { CLOSED_SIDEBAR_WIDTH as ICON_SIZE } from '@/constants/style.constants'

import { IHideSettings } from '../sidebar'

import styles from './hideButton.module.scss'

export const HideButton = ({
	hideSettings,
}: {
	hideSettings: IHideSettings
}) => {
	const { asideRef } = hideSettings
	const [hidden, setHidden] = useState(false)

	if (!asideRef) {
		return
	}
	const onClick = () => {
		setHidden(!hidden)
		asideRef.current!.dataset.hidden = String(!hidden)
	}

	const activeLinkColor =
		document.documentElement.style.getPropertyValue('--link-c') ||
		getComputedStyle(document.documentElement).getPropertyValue('--link-c')
	const title = hidden ? 'Открыть боковое меню' : 'Закрыть боковое меню'
	return (
		<button
			data-hidden={hidden}
			className={styles.button}
			onClick={onClick}
			title={title}
			aria-label={title}
		>
			<CircleChevronLeft
				className={styles.icon}
				size={ICON_SIZE}
				color={activeLinkColor}
			/>
		</button>
	)
}
