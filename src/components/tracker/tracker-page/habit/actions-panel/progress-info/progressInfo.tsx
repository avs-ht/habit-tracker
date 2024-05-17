import { Text } from '@/components/ui/text/text'

interface IProps {
	time: string
}
export const ProgressInfo = ({ time }: IProps) => (
	<Text>Вы еще не выполнили {time} </Text>
)
