import { createFileRoute } from '@tanstack/react-router'

import { redirectTo } from '@/middlewares/throw'

export const Route = createFileRoute('/')({
	beforeLoad: () => {
		redirectTo('/habits', true)
	},
})
