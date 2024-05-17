import { Rating } from '@/components/profile/rating-page/rating'
import { ReturnButton } from '@/components/ui/button/return-button/returnButton'
import { Title } from '@/components/ui/title/title'

export const RatingPage = () => {
	return (
		<>
			<ReturnButton href={'/profile'} />
			<Title htmlTitle="h2">Рейтинг</Title>
			<Rating />
		</>
	)
}
