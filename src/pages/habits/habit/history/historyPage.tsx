import { useRouterState } from '@tanstack/react-router'

import { FilterButtons } from '@/components/tracker/tracker-page/habit-history/filter-buttons/filterButtons'
import { HabitHistory } from '@/components/tracker/tracker-page/habit-history/habitHistory'
import { ReturnButton } from '@/components/ui/button/return-button/returnButton'
import { Title } from '@/components/ui/title/title'

import { IHistoryFilterFormState } from '@/types/forms.types'
import { TypeHref } from '@/types/nav.types'

import styles from './historyPage.module.scss'

export const HistoryPage = ({
	searchParams,
}: {
	searchParams: IHistoryFilterFormState
}) => {
	const pathName: string = useRouterState().location.pathname
	const pathNameWithoutHistory = pathName.slice(
		0,
		pathName.lastIndexOf('/'),
	) as TypeHref

	return (
		<>
			<ReturnButton href={pathNameWithoutHistory} extraClass={styles.button} />
			<Title htmlTitle="h2">История действий</Title>
			<FilterButtons searchParams={searchParams} />
			<HabitHistory searchParams={searchParams} />
		</>
	)
}
