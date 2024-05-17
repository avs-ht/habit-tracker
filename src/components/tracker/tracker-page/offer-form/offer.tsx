import type { UseFormRegister, UseFormWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Text } from '@/components/ui/text/text'

import type { IHabitFormState } from '@/types/forms.types'

import styles from './offer.module.scss'
import { OfferUser } from './offerUser'
import { useUserStore } from '@/storage/user.store'

interface IProps {
	register: UseFormRegister<IHabitFormState>
	watch: UseFormWatch<IHabitFormState>
}
export const OfferForm = ({ register, watch }: IProps) => {
	const watchWhoOffer = watch('whoOffer')
	const offerUser = useUserStore(state =>
		state.users.find(user => user.id === +(watchWhoOffer || -1)),
	)
	return (
		<div className={styles.offer}>
			<div className={styles['who-offer']}>
				<div className={styles.input}>
					<Text marginBottomCoef={0.1}>
						Введите id пользователя,
						<br />
						которому хотите предложить
					</Text>
					<Input
						type="number"
						register={register('whoOffer')}
						placeholder="id пользователя"
					/>
				</div>
				<OfferUser user={offerUser} />
			</div>
			{offerUser && (
				<>
					<Button type="submit">Предложить {offerUser.name}</Button>
				</>
			)}
		</div>
	)
}
