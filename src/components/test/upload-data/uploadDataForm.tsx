import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { UsersSelect } from '@/components/ui/users-select/usersSelect'

import { IUploadFileFormState } from '@/types/forms.types'
import { Habit } from '@/types/game.types'
import { DataToUpload } from '@/types/upload.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUsers } from '@/hooks/user/useUsers'

import { transformDataFromUpload } from '@/utils/other.utils/transformDataFromUpload'

import styles from './uploadDataForm.module.scss'

export const UploadDataForm = () => {
	const { register, handleSubmit, control, reset } =
		useForm<IUploadFileFormState>()
	const users = useUsers()
	const [jsonData, setJsonData] = useState<DataToUpload>()
	const { updateUser } = useManageUsers()

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const reader = new FileReader()
		reader.onload = () => {
			const json = JSON.parse(reader.result as string)
			setJsonData(json)
		}
		reader.readAsText(file)
	}

	const onSubmit = (data: IUploadFileFormState) => {
		if (!jsonData) return

		const transformedData: Habit[] | undefined =
			transformDataFromUpload(jsonData)

		if (!transformedData) return

		const neededUser = users.find(user => user.id === data.userId.value)
		if (!neededUser) return

		neededUser.habits.push(...transformedData)
		updateUser(neededUser)

		reset()
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.inputs}>
				<input
					type="file"
					className={styles.input}
					{...register('files', { required: true })}
					onChange={onChange}
				/>
				<UsersSelect control={control} />
			</div>

			<Button>Загрузить</Button>
		</form>
	)
}
