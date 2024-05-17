import { useForm } from 'react-hook-form'

import { Text } from '@/components/ui/text/text'

import type { IShowFixedButtonsFormState } from '@/types/forms.types'

import { CheckboxSetting } from '../checkbox-setting/checkboxSetting'

export const NotificationForm = () => {
	const form = useForm<IShowFixedButtonsFormState>()
	return (
		<>
			<Text>
				<small>Нужно включить уведомления на сайте</small>
			</Text>
			<CheckboxSetting
				form={form}
				settingName="allowNotifications"
				checkboxText="Присылать уведомления-напоминания"
			/>
		</>
	)
}
