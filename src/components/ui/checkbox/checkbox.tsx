import { ICheckbox } from '@/types/ui.types'

import styles from './checkbox.module.scss'

export const Checkbox = ({
	label,
	register,
	setValue,
	...props
}: ICheckbox) => {
	return (
		<>
			<div
				className={styles.label}
				tabIndex={0}
				onKeyDown={e => {
					if (e.code === 'Enter') {
						setValue(
							register.name,
							props.defaultChecked
								? !props.defaultChecked
								: props.checked
									? !props.checked
									: true,
						)
					}
				}}
			>
				<input
					id={register.name}
					type="checkbox"
					className={styles.checkbox}
					{...register}
					{...props}
					tabIndex={-1}
				/>
				<span className={styles.checkmark} aria-hidden></span>
				<label htmlFor={register.name}>{label}</label>
			</div>
		</>
	)
}
