import { EnumDices } from '@/types/game.types'

import { redirectTo } from './throw'
import { getCurrUser } from '@/storage/local.storage'

export const dicesMiddleware = {
	validateSearch: (search: { dice: string }) => {
		return {
			dice: search.dice ? search.dice : undefined,
		}
	},
	beforeLoad: ({ search }: { search: { dice: string } }) => {
		redirectTo('/dices', !search.dice)

		const { dices } = getCurrUser()

		redirectTo('/dices', dices[search.dice as EnumDices] <= 0)
	},
}
