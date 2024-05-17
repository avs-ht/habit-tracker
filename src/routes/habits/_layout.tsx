import {
	Link,
	Outlet,
	createFileRoute,
	useRouterState,
} from '@tanstack/react-router'

import { Title } from '@/components/ui/title/title'

import { useCurrId } from '@/hooks/user/useCurrId'

import { filterRequest } from '@/utils/habits.utils/requests'
import { isRightPathname } from '@/utils/nav.utils/isRightPathname'

import styles from './_layout.module.scss'
import { useRequestsStore } from '@/storage/requests.store'

export const Route = createFileRoute('/habits/_layout')({
	component: TestLayout,
})

function TestLayout() {
	const pathName: string = useRouterState().location.pathname
	const isRequestsActive = isRightPathname(pathName, '/habits/requests')
	const currId = useCurrId()
	const requests = useRequestsStore(state => state.requests).filter(request =>
		filterRequest(request, currId),
	)
	return (
		<>
			<Title htmlTitle="h2" className={styles.title}>
				<Link
					data-active={!isRequestsActive}
					className={styles.choice}
					to="/habits"
					search={{ daily: true, weekly: true, monthly: true }}
				>
					Трекер
				</Link>{' '}
				|{' '}
				<Link
					data-tag={requests.length === 0 ? '' : requests.length}
					data-active={isRequestsActive}
					className={`${styles.choice} ${styles.requests}`}
					to="/habits/requests"
				>
					Запросы
				</Link>
			</Title>
			<div>
				<Outlet />
			</div>
		</>
	)
}
