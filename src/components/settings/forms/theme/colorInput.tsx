import type { IInput } from '@/types/ui.types'

import styles from './colorInput.module.scss'

type TypeProps = Omit<IInput, 'type'> & { label: string }
export const ColorInput = ({ register, label, ...props }: TypeProps) => {
	return (
		<div className={styles.container}>
			<input type="color" className={styles.input} {...register} {...props} />
			<label className={styles.label}>{label}</label>
		</div>
	)
}
