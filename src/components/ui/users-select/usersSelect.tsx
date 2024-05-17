import { Control, FieldValues, Path, PathValue } from 'react-hook-form'

import { useUserOptions } from '@/hooks/user/useUserOptions'

import { CustomSelect } from '../select/select'

export const UsersSelect = <T extends FieldValues>({
	includeCurrUser = true,
	control,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<T, any>
	includeCurrUser?: boolean
}) => {
	const { userOptions, defaultValue } = useUserOptions(includeCurrUser)
	return (
		<CustomSelect
			selectOptions={userOptions}
			control={control}
			defaultValue={defaultValue as PathValue<T, Path<T>>}
			name={'userId'}
			title="Выберите пользователя"
		/>
	)
}
