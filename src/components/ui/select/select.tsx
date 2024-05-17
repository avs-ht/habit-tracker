import { Controller, FieldValues, Path, PathValue } from 'react-hook-form'
import Select from 'react-select'

import { Text } from '@/components/ui/text/text'

import { ISelect, ISelectOption } from '@/types/ui.types'

import styles from './select.module.scss'

export const CustomSelect = <T extends FieldValues>({
	selectOptions,
	name,
	control,
	defaultValue,
	title = '',
}: ISelect<T>) => {
	return (
		<div className={styles.select}>
			{title && <Text>{title}</Text>}
			<Controller
				control={control}
				defaultValue={defaultValue as PathValue<T, Path<T>>}
				name={name as Path<T>}
				rules={{ required: true }}
				render={({ field: { onChange, value, ref } }) => (
					<Select
						value={selectOptions.find(
							(option: ISelectOption) => option.value === value,
						)}
						placeholder="Выберите элемент"
						onChange={onChange}
						ref={ref}
						options={selectOptions}
					/>
				)}
			/>
		</div>
	)
}
