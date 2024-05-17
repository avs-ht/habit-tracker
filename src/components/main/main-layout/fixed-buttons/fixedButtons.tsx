import { useRouterState } from '@tanstack/react-router'

import { isRightPathname } from '@/utils/nav.utils/isRightPathname'

import { DiceButton } from './dice-button/diceButton'
import styles from './fixedButtons.module.scss'
import { ShopButton } from './shop-button/shopButton'
import { TestButton } from './test-button/testButton'

const ICON_SIZE = 40
export const FixedButtons = () => {
	const pathname = useRouterState().location.pathname
	const isDicePage = isRightPathname(pathname, '/dices')
	const isTestPage = isRightPathname(pathname, '/test')
	const isShopPage = isRightPathname(pathname, '/shop')
	return (
		<div className={styles.buttons}>
			{!isDicePage && <DiceButton iconSize={ICON_SIZE} />}
			{!isShopPage && <ShopButton iconSize={ICON_SIZE} />}
			{!isTestPage && <TestButton iconSize={ICON_SIZE} />}
		</div>
	)
}
