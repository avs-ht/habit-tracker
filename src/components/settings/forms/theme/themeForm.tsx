import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'
import { CustomSelect } from '@/components/ui/select/select'

import type { IThemeFormState } from '@/types/forms.types'
import { EnumTheme } from '@/types/settings.types'

import { useCurrId } from '@/hooks/user/useCurrId'

import { ColorInput } from './colorInput'
import styles from './themeForm.module.scss'
import { useSettingsStore } from '@/storage/settings.store'

const themeOptions = [
	{
		value: EnumTheme.dark,
		label: 'Тёмная тема',
	},
	{
		value: EnumTheme.light,
		label: 'Светлая тема',
	},
	{
		value: EnumTheme.blue,
		label: 'Голубая тема',
	},
	{
		value: EnumTheme.green,
		label: 'Зеленая тема',
	},
	{
		value: EnumTheme.yellow,
		label: 'Желтая тема',
	},
	{
		value: EnumTheme.pink,
		label: 'Розовая тема',
	},
	{
		value: EnumTheme.purple,
		label: 'Фиолетовая тема',
	},
	{
		value: EnumTheme.custom,
		label: 'Пользовательская тема',
	},
]

export const ThemeForm = () => {
	const modalRef = useRef(null)
	const currId = useCurrId()
	const currSettings = useSettingsStore(state => state.settings[currId])
	const purchasedThemes = currSettings.purchasedThemes
	const purchasedThemesOptions = themeOptions.filter(option =>
		purchasedThemes.includes(option.value),
	)
	const updateSettings = useSettingsStore(state => state.setSettings)

	const { watch, control, register, handleSubmit } = useForm<IThemeFormState>()
	const themeWatch = watch(
		'theme',
		purchasedThemesOptions.find(
			option => option.value === currSettings.theme,
		) || themeOptions[0],
	)

	useEffect(() => {
		currSettings.theme = themeWatch.value
		updateSettings(currSettings, currId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [themeWatch])

	const onSubmit = (data: IThemeFormState) => {
		if (!data.customTheme) return
		currSettings.customTheme = {
			background: data.customTheme.background,
			nav: data.customTheme.nav,
			text: data.customTheme.text,
			title: data.customTheme.title,
			link: data.customTheme.link,
		}

		updateSettings(currSettings, currId)
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<CustomSelect
				title="Выберите тему"
				control={control}
				name={'theme'}
				defaultValue={themeWatch}
				selectOptions={purchasedThemesOptions}
			/>
			{themeWatch.value === EnumTheme.custom && (
				<>
					<Modal
						openButtonText="Настроить"
						classNameDialog={styles.modal}
						returnModalRef={modalRef}
					>
						<ColorInput
							label="Цвет фона"
							register={register('customTheme.background')}
							defaultValue={currSettings.customTheme?.background || '#fff'}
						/>
						<ColorInput
							label="Цвет навигации"
							register={register('customTheme.nav')}
							defaultValue={currSettings.customTheme?.nav || '#fff'}
						/>
						<ColorInput
							label="Цвет обычного текста"
							register={register('customTheme.text')}
							defaultValue={currSettings.customTheme?.text}
						/>
						<ColorInput
							label="Цвет заголовков"
							register={register('customTheme.title')}
							defaultValue={currSettings.customTheme?.title}
						/>
						<ColorInput
							label="Цвет ссылок"
							register={register('customTheme.link')}
							defaultValue={currSettings.customTheme?.link}
						/>
						<Button type="submit" className={styles.button}>
							Установить цвета
						</Button>
					</Modal>
				</>
			)}
		</form>
	)
}
