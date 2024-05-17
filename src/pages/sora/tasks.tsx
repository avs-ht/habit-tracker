import { SoraTasks } from '@/components/sora/tasks-page/soraTasks'
import { ReturnButton } from '@/components/ui/button/return-button/returnButton'
import { Title } from '@/components/ui/title/title'

export const SoraTasksPage = () => {
	return (
		<>
			<ReturnButton href="/sora" />
			<Title htmlTitle="h2">Задания Соры</Title>
			<SoraTasks />
		</>
	)
}
