import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { ErrorMessage } from '@/components/ui/error-message/errorMessage'
import { Title } from '@/components/ui/title/title'
import { UsersSelect } from '@/components/ui/users-select/usersSelect'

import type { IChangeProfileFormState } from '@/types/forms.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'

import styles from './changeProfileForm.module.scss'

export const ChangeProfileForm = () => {
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IChangeProfileFormState>()
	const { setCurrIdUser } = useManageUsers()
	const navigate = useNavigate()
	const onSubmit = ({ userId }: IChangeProfileFormState) => {
		if (+userId.value === -1) {
			setError('userId', { type: 'custom', message: 'Выберите пользователя!' })
			return
		}
		setCurrIdUser(+userId.value)
		navigate({ to: '/profile' })
	}
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Title htmlTitle="h3">Сменить профиль</Title>
			<UsersSelect control={control} includeCurrUser={false} />
			<ErrorMessage showCondition={!!errors.userId}>
				{errors.userId?.message}
			</ErrorMessage>
			<Button type="submit">Сменить</Button>
		</form>
	)
}
