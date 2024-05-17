import { useNavigate } from '@tanstack/react-router'

import { Button } from '@/components/ui/button/button'

export const DetailsButton = ({ id }: { id: number }) => {
	const navigate = useNavigate()
	const onClick = () => {
		navigate({
			to: '/habits/$habitId',
			params: { habitId: id.toString() },
		})
	}
	return (
		<Button onClick={onClick}>
			<span>Подробней</span>
		</Button>
	)
}
