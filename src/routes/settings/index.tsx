import { createFileRoute } from '@tanstack/react-router'

import { SettingsPage } from '@/pages/settingsPage'

export const Route = createFileRoute('/settings/')({
	component: () => <SettingsPage />,
})
