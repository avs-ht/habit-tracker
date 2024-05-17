import { useEffect } from 'react'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'

import {
	SoraActionEvent,
	UpgradeLevelEvent,
	acceptSoraActionEvent,
	acceptUpgradedLevelEvent,
} from '@/utils/game.utils/event'

interface IProps {
	children: React.ReactNode
}
export const EventProvider = ({ children }: IProps) => {
	const { updateUser } = useManageUsers()
	const user = useUserInfo()

	useEffect(() => {
		document.addEventListener('soraTaskAction', (e: Event) => {
			const detail = (e as SoraActionEvent).detail
			if (!detail.action) return

			const isSuccess = acceptSoraActionEvent(user, detail)
			if (isSuccess) {
				updateUser(user)
			}
		})

		document.addEventListener('upgradeLevel', (e: Event) => {
			const detail = (e as UpgradeLevelEvent).detail
			if (!detail) return

			acceptUpgradedLevelEvent(user, detail.exp)
			updateUser(user)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return <>{children}</>
}
