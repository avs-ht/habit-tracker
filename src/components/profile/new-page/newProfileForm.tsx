import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'

import type { INewProfileFormState } from '@/types/forms.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'

import styles from './newProfileForm.module.scss'
import { defaultSettings, useSettingsStore } from '@/storage/settings.store'
import { defaultUser, useUserStore } from '@/storage/user.store'

export const NewProfileForm = () => {
	const { handleSubmit, register } = useForm<INewProfileFormState>()
	const { addUser, setCurrIdUser } = useManageUsers()
	const lastUserId = useUserStore(
		state => state.users[state.users.length - 1].id,
	)

	const updateSettings = useSettingsStore(state => state.setSettings)
	const onSubmit = ({ name }: INewProfileFormState) => {
		const newUser = JSON.parse(JSON.stringify(defaultUser))
		const newId = lastUserId + 1
		newUser.name = name
		newUser.id = newId

		updateSettings(defaultSettings, newId)

		addUser(newUser)
		setCurrIdUser(newId)

		window.location.reload()
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Input
				register={register('name', { required: true })}
				placeholder="Имя"
			/>
			<Button type="submit">Создать новый профиль</Button>
		</form>
	)
}
