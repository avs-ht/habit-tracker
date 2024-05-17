import { useEffect } from 'react'

import { DAY } from '@/constants/date.constants'

import { User } from '@/types/game.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'

import { CDate } from '@/utils/date.utils/miscellaneous'
import { getStartOfDay } from '@/utils/date.utils/startAndEnd'

import { useUserStore } from '@/storage/user.store'

interface IProps {
	children: React.ReactNode
	pageLoadFns?: ((user: User, interval: number) => void)[]
}
export const TimelineProvider = ({ children, pageLoadFns }: IProps) => {
	const { updateUser } = useManageUsers()
	const currUserId = useUserStore(state => state.currIdUser)
	const user = useUserStore(state =>
		state.users.find(user => user.id === currUserId),
	)

	const currDate = CDate()
	const currNight = getStartOfDay(currDate).getTime()
	const lastEnter = new Date(user?.lastEnter || currDate.getTime())
	const lastEnterNight = getStartOfDay(lastEnter).getTime()
	const interval = (currNight - lastEnterNight) / DAY
	useEffect(() => {
		if (!user || !pageLoadFns) return
		if (interval >= 1) {
			for (const pageLoadFn of pageLoadFns) {
				pageLoadFn(user, interval)
			}
		}

		user.lastEnter = currDate.getTime()
		updateUser(user)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return <>{children}</>
}
