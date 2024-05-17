import { createFileRoute } from '@tanstack/react-router'

import { redirectTo } from '@/middlewares/throw'
import { SoraTasksPage } from '@/pages/sora/tasks'
import { getCurrUser } from '@/storage/local.storage'

export const Route = createFileRoute('/sora/tasks/')({
	component: SoraTasksPage,
	beforeLoad: () => {
		const user = getCurrUser()
		redirectTo(`/sora`, !user)
		redirectTo(`/sora`, user.face < 4)
	},
})
