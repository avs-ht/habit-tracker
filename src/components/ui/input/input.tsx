import clsx from 'clsx'

import { IInput } from '@/types/ui.types'

import { ErrorMessage } from '../error-message/errorMessage'

import styles from './input.module.scss'

export const Input = ({
	register,
	error,
	className,
	onBlur,
	label,
	...props
}: IInput) => {
	return (
		<div className={styles.container}>
			{label && <label htmlFor={register.name}>{label}</label>}
			<input
				id={register.name}
				{...props}
				autoComplete="off"
				{...register}
				onBlur={onBlur}
				className={clsx(styles.input, className)}
			/>
			<ErrorMessage showCondition={!!error}>{error?.message}</ErrorMessage>
		</div>
	)
}
