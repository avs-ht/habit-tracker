import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'

import type { IDonateFormState } from '@/types/ui.types'

import styles from './cardForm.module.scss'

const CardForm = ({ donateFn }: { donateFn?: () => void }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IDonateFormState>()

	const onSubmit = () => {
		if (donateFn) {
			donateFn()
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles['input-field']}>
				<label>Номер карты:</label>
				<Input
					error={errors.cardNumber}
					register={register('cardNumber', {
						required: 'Номер карты нужен!',
						minLength: {
							value: 16,
							message: 'Номер должен содержать 16 цифр',
						},
						maxLength: {
							value: 16,
							message: 'Номер должен содержать 16 цифр',
						},
					})}
				/>
			</div>
			<div className={styles['input-field']}>
				<label>CVC:</label>
				<Input
					error={errors.cvc}
					register={register('cvc', { required: 'Введите данные' })}
				/>
			</div>
			<div className={styles['input-field']}>
				<label>Срок действия:</label>
				<Input
					error={errors.expDate}
					register={register('expDate', {
						required: 'Введите данные',
					})}
				/>
			</div>

			<Button>Списать деньги</Button>
		</form>
	)
}

export default CardForm
