import { useEffect } from 'react'

import { User } from '@/types/game.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'

import { CDate } from '@/utils/date.utils/miscellaneous'
import { getStartOfDay } from '@/utils/date.utils/startAndEnd'

import { useUserStore } from '@/storage/user.store'

interface IProps {
	children: React.ReactNode
	pageLoadFns?: ((user: User) => void)[]
}
export const DailyProvider = ({ children, pageLoadFns }: IProps) => {
	const { updateUser } = useManageUsers()
	const currUserId = useUserStore(state => state.currIdUser)
	const user = useUserStore(state =>
		state.users.find(user => user.id === currUserId),
	)

	const currDate = CDate()
	const currNight = getStartOfDay(currDate).getTime()
	const lastEnter = user?.lastEnter || currDate.getTime()

	useEffect(() => {
		if (!user) return

		if (lastEnter <= currNight) {
			if (!pageLoadFns) return
			for (const pageLoadFn of pageLoadFns) {
				pageLoadFn(user)
			}
		}
		user.lastEnter = currDate.getTime()
		updateUser(user)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return <>{children}</>
}
