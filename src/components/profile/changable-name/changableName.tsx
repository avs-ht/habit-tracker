import { Pencil } from 'lucide-react'
import { FocusEventHandler, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'

import { Input } from '../../ui/input/input'
import { Title } from '../../ui/title/title'

import styles from './changableName.module.scss'

export const ChangableName = () => {
	const { register, setFocus } = useForm<{ name: string }>()
	const [isNameEditing, setNameEdit] = useState(false)
	const { updateUser } = useManageUsers()
	const titleColor = getComputedStyle(
		document.documentElement,
	).getPropertyValue('--title-c')
	const user = useUserInfo()
	const onBlur: FocusEventHandler<HTMLInputElement> = e => {
		setNameEdit(false)
		const newName = e.target.value
		if (newName.length <= 2) {
			toast.error('Имя должно содержать больше двух букв')
			return
		}

		user.name = newName
		updateUser(user)
	}
	useEffect(() => {
		setFocus('name')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isNameEditing])
	return (
		<>
			{!isNameEditing ? (
				<div
					className={styles.name}
					onClick={() => {
						setNameEdit(true)
					}}
				>
					<Title htmlTitle="h3">
						{user.name}&nbsp;(ID: {user.id.toString()})
					</Title>
					<Pencil color={titleColor} />
				</div>
			) : (
				<Input
					defaultValue={user.name}
					className={styles.input}
					register={register('name')}
					onBlur={onBlur}
				/>
			)}
		</>
	)
}
