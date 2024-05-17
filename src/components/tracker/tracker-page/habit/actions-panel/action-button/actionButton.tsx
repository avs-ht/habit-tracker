import { Button } from '@/components/ui/button/button'

interface IProps {
	isCompleted: boolean
	isOneTimeAction: boolean
	time: string
}
export const ActionButton = ({
	isCompleted,
	isOneTimeAction,
	time,
}: IProps) => {
	return (
		<Button type="submit" disabled={isCompleted} aria-disabled={isCompleted}>
			{isCompleted
				? `Уже выполнено ${time} :)`
				: isOneTimeAction
					? 'Выполнить'
					: `Добавить`}
		</Button>
	)
}
