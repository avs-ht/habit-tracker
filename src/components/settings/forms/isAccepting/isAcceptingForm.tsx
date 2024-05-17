import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/checkbox'

import type { IIsAcceptingFormState } from '@/types/forms.types'

import { useCurrId } from '@/hooks/user/useCurrId'

import { useSettingsStore } from '@/storage/settings.store'

export const IsAcceptingForm = () => {
	const { watch, register, setValue } = useForm<IIsAcceptingFormState>()

	const currId = useCurrId()
	const currSettings = useSettingsStore(state => state.settings[currId])
	const updateSettings = useSettingsStore(state => state.setSettings)
	const chekboxChecked = watch(
		'isRequestsAccepting',
		currSettings.isRequestsAccepting,
	)

	useEffect(() => {
		currSettings.isRequestsAccepting = chekboxChecked
		updateSettings(currSettings, currId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chekboxChecked])
	return (
		<Checkbox
			checked={chekboxChecked}
			label="Принимать совместные привычки"
			register={register('isRequestsAccepting')}
			setValue={setValue}
		/>
	)
}
