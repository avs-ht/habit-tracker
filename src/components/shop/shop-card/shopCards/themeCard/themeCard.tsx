import { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button/button'
import { Text } from '@/components/ui/text/text'

import { THEMES_SHOPS, TypeThemeShop } from '@/constants/shop.constants'

import { EnumSoraTaskAction } from '@/types/game.types'
import { EnumTheme } from '@/types/settings.types'

import { useCurrId } from '@/hooks/user/useCurrId'
import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'

import { sendSoraActionEvent } from '@/utils/game.utils/event'

import { ShopCard } from '../../shopCard/shopCard'

import styles from './themeCard.module.scss'
import { useSettingsStore } from '@/storage/settings.store'
import { useUserStore } from '@/storage/user.store'

export const ThemeCard = ({ theme }: { theme: EnumTheme }) => {
	const [isTesting, setTesting] = useState(false)
	const { title, price } = THEMES_SHOPS[theme as TypeThemeShop]
	const { bons } = useUserInfo()
	const updateSettings = useSettingsStore(state => state.setSettings)
	const { updateUser } = useManageUsers()
	const currId = useCurrId()
	const user = useUserStore(state =>
		state.users.find(user => user.id === currId),
	)
	const canBuy = bons >= price
	const [isBought, setIsBought] = useState(false)
	const currUserId = useCurrId()
	const currTheme = useSettingsStore(state => state.settings[currUserId].theme)
	const { settings } = useSettingsStore()
	const toggleTesting = () => {
		setTesting(!isTesting)
		if (!isTesting) {
			document.documentElement.dataset.theme = theme
			return
		}
		document.documentElement.dataset.theme = currTheme
	}

	const buyTheme = () => {
		if (!user) return
		if (!canBuy) return
		user.bons -= price
		settings[currUserId].purchasedThemes.push(theme as EnumTheme)
		setIsBought(true)

		toast.success('Тема успешно приобретена!')
		updateSettings(settings[currUserId], currUserId)
		updateUser(user)

		sendSoraActionEvent(EnumSoraTaskAction.shopBuy, 1)
	}

	return (
		<>
			{!isBought && (
				<ShopCard title={title}>
					<div className={styles.container}>
						<Text marginBottomCoef={0.1}>
							Цена: <b>{price} бон</b>
						</Text>
						<div className={styles.buttons}>
							<Button
								disabled={!canBuy}
								onClick={buyTheme}
								aria-disabled={!canBuy}
							>
								Приобрести
							</Button>
							{theme !== EnumTheme.custom && (
								<Button onClick={toggleTesting}>Протестировать</Button>
							)}
						</div>
					</div>
					{isTesting && (
						<div className={styles['testing-cover']}>
							<Button onClick={toggleTesting}>Перестать тестировать</Button>
						</div>
					)}
				</ShopCard>
			)}
		</>
	)
}
