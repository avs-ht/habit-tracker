import { SHOP_DICES } from '@/constants/game.constants'
import { themeShopKeys } from '@/constants/shop.constants'

import { EnumDices } from '@/types/game.types'
import { EnumTheme } from '@/types/settings.types'

import { useCurrId } from '@/hooks/user/useCurrId'

import { ShopCategory } from './category/category'
import { DiceCard } from './shop-card/shopCards/diceCard/diceCard'
import { ThemeCard } from './shop-card/shopCards/themeCard/themeCard'
import { useSettingsStore } from '@/storage/settings.store'

export const Shop = () => {
	const currUserId = useCurrId()
	const purchasedThemes = useSettingsStore(
		state => state.settings[currUserId].purchasedThemes,
	)
	const filteredThemes = themeShopKeys.filter(
		theme => !purchasedThemes.includes(theme as EnumTheme),
	)

	return (
		<>
			{filteredThemes.length !== 0 && (
				<ShopCategory category="Кастомизация интерфейса">
					{filteredThemes.map(theme => (
						<ThemeCard key={theme} theme={theme as EnumTheme} />
					))}
				</ShopCategory>
			)}

			<ShopCategory category="Дайсы">
				{Object.keys(SHOP_DICES).map(dice => (
					<DiceCard key={dice} dice={dice as EnumDices} />
				))}
			</ShopCategory>
		</>
	)
}
