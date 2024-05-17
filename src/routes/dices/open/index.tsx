import { createFileRoute } from '@tanstack/react-router'

import { EnumDices } from '@/types/game.types'

import { dicesMiddleware } from '@/middlewares/dices.middleware'
import { DicesOpenPage } from '@/pages/dices/openPage'

export const Route = createFileRoute('/dices/open/')({
	component: DicesOpenComponent,
	validateSearch: dicesMiddleware.validateSearch,
	beforeLoad: dicesMiddleware.beforeLoad,
})

function DicesOpenComponent() {
	const { dice } = Route.useSearch()
	return <DicesOpenPage dice={dice as EnumDices} />
}
