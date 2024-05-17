import { useMemo } from 'react'

import { OPTIONS_NOT_FINDED } from '@/constants/ui.constants'

import { useUserInfo } from './useUserInfo'
import { useUsers } from './useUsers'

export const useUserOptions = (includeCurrUser: boolean) => {
	const { id: currIdUser } = useUserInfo()
	const users = useUsers()

	const usersWithCurrUser = useMemo(
		() =>
			includeCurrUser ? users : users.filter(user => user.id !== currIdUser),
		[includeCurrUser, users, currIdUser],
	)
	const userOptions = useMemo(() => {
		return usersWithCurrUser.map(user => ({
			value: user.id,
			label: `${user.name} (id: ${user.id})`,
		}))
	}, [usersWithCurrUser])
	const defaultValue = userOptions.find(
		userOption => userOption.value === currIdUser,
	)

	return {
		userOptions,
		defaultValue: defaultValue ? defaultValue : OPTIONS_NOT_FINDED,
	}
}
