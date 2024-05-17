import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button/button'

import { useHabitId } from '@/hooks/usesHabitId'

export const HistoryButton = () => {
	const habitId: string = useHabitId().habitId.toString()
	const navigate = useNavigate()
	const onClick = () => {
		navigate({
			to: `/habits/$habitId/history`,
			params: { habitId },
			search: {
				commonActions: true,
				cancelTrackingActions: true,
			},
		})
	}
	return (
		<Button onClick={onClick}>
			<span>Просмотреть историю действий</span>
		</Button>
	)
}
