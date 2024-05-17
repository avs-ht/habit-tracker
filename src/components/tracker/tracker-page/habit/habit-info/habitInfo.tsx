import { Text } from '@/components/ui/text/text'
import { Title } from '@/components/ui/title/title'

import { Habit } from '@/types/game.types'

const DATA_PARAMS: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}
export const HabitInfo = ({ habitInfo }: { habitInfo: Habit }) => {
	const { title, category } = habitInfo
	return (
		<>
			<Title htmlTitle="h2">{title}</Title>
			<Text marginBottomCoef={0.05}>{category}</Text>
			<Text marginBottomCoef={0.1}>
				Дата начала трекинга:&nbsp;
				<b>
					{new Date(habitInfo.addDate).toLocaleDateString('ru-RU', DATA_PARAMS)}
				</b>
			</Text>
		</>
	)
}
