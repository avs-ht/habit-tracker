import { Outlet, createRootRoute } from '@tanstack/react-router'

import { MainLayout } from '../components/main/main-layout/mainLayout'
import { Wrapper } from '../components/ui/containers/wrapper/wrapper'

export const Route = createRootRoute({
	component: () => (
		<Wrapper>
			<MainLayout>
				<Outlet />
			</MainLayout>
		</Wrapper>
	),
})
