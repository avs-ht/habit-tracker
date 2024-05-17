import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/checkbox'

import type { TypeСustomizableSetting } from '@/types/settings.types'

import { useCurrId } from '@/hooks/user/useCurrId'

import { useSettingsStore } from '@/storage/settings.store'

interface IProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: UseFormReturn<any, any, undefined>
	settingName: TypeСustomizableSetting
	checkboxText: string
}
export const CheckboxSetting = ({
	form,
	settingName,
	checkboxText,
}: IProps) => {
	const { watch, register, setValue } = form

	const currId = useCurrId()
	const currSettings = useSettingsStore(state => state.settings[currId])
	const updateSettings = useSettingsStore(state => state.setSettings)
	const chekboxChecked = watch(settingName, currSettings[settingName])

	useEffect(() => {
		currSettings[settingName] = chekboxChecked
		updateSettings(currSettings, currId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chekboxChecked])
	return (
		<Checkbox
			checked={chekboxChecked}
			label={checkboxText}
			register={register(settingName)}
			setValue={setValue}
		/>
	)
}
