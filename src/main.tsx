import {
	RouterProvider,
	createHashHistory,
	createRouter,
} from '@tanstack/react-router'
import 'chart.js/auto'
import ReactDOM from 'react-dom/client'

import './main.scss'
import { Providers } from './providers/providers'
import { routeTree } from './routeTree.gen'

const hashHistory = createHashHistory()
const router = createRouter({ routeTree, history: hashHistory })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Providers>
		<RouterProvider router={router} />
	</Providers>,
)
