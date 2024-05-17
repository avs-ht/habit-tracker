import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button/button'

import { EnumDices, EnumSoraTaskAction } from '@/types/game.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'

import { dash } from '@/utils/game.utils/dash'
import { sendSoraActionEvent } from '@/utils/game.utils/event'

export const DashButton = ({ dice }: { dice: EnumDices }) => {
	const currUser = useUserInfo()
	const { updateUser } = useManageUsers()
	const navigate = useNavigate()
	const onClick = () => {
		const droppedText = dash(currUser, dice)
		sendSoraActionEvent(EnumSoraTaskAction.dash, 1)
		toast(droppedText, {
			duration: 6000,
		})
		updateUser(currUser)
		navigate({
			to: '/dices',
		})
	}
	return <Button onClick={onClick}>Использовать дайс (дэш)</Button>
}
