import { Outlet, createFileRoute } from '@tanstack/react-router'

import { ActionsSelect } from '@/components/test/test-layout/actionsSelect/actionsSelect'
import { Title } from '@/components/ui/title/title'

import styles from './_layout.module.scss'

export const Route = createFileRoute('/test/_layout')({
	component: TestLayout,
})

function TestLayout() {
	return (
		<>
			<Title htmlTitle="h2">Тестим</Title>
			<ActionsSelect />
			<div className={styles.container}>
				<Outlet />
			</div>
		</>
	)
}
