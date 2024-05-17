import { useForm } from 'react-hook-form'

import type { IShowFixedButtonsFormState } from '@/types/forms.types'

import { CheckboxSetting } from '../checkbox-setting/checkboxSetting'

export const ShowFixedButtonsForm = () => {
	const form = useForm<IShowFixedButtonsFormState>()
	return (
		<CheckboxSetting
			form={form}
			settingName="showFixedButtons"
			checkboxText="Показывать фиксированные кнопки"
		/>
	)
}
