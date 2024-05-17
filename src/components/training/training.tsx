import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { TRAINING_BUTTON, TRAINING_TEXT } from '@/constants/game.constants'

import { EnumDices } from '@/types/game.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'

import { Modal } from '../ui/modal/modal'

import { Bubble } from './bubble'
import styles from './training.module.scss'

export const Training = () => {
	const user = useUserInfo()
	const { updateUser } = useManageUsers()
	const [trainingOrder, setTrainingOrder] = useState(0)
	const ref = useRef<HTMLDialogElement>(null)
	const navigate = useNavigate()
	useEffect(() => {
		ref.current?.showModal()
	}, [ref])

	useEffect(() => {
		switch (trainingOrder) {
			case 0:
				navigate({
					to: '/habits',
					search: {},
				})
				break
			case 4:
				navigate({
					to: '/habits/new',
				})
				break
			case 6:
				navigate({
					to: '/shop',
				})
				break
			case 8:
				navigate({
					to: '/dices',
				})
				break
			case 9:
				navigate({
					to: '/dices/open',
					search: { dice: EnumDices.daily },
				})
				break
			case 10:
				navigate({
					to: '/sora',
				})
				break
			case 13:
				navigate({
					to: '/profile',
				})
				break
			case 16:
				navigate({
					to: '/habits/new',
				})
				user.trainingCompleted = true
				updateUser(user)
				break
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trainingOrder, navigate])

	const bubbleText: string = TRAINING_TEXT[trainingOrder]
	return (
		<Modal
			returnModalRef={ref}
			isOpenButtonNeed={false}
			isCloseButtonNeed={false}
			classNameDialog={styles.dialog}
		>
			<div className={styles.sora} data-order={trainingOrder}>
				<img
					fetchPriority="high"
					alt="сора"
					srcSet="/sora/sora-training.webp, /sora/sora-training.png"
				/>
				<div className={styles['bubble-container']}>
					<Bubble className={styles.bubble}>{bubbleText}</Bubble>
					<button
						className={styles.button}
						onClick={() => setTrainingOrder(trainingOrder + 1)}
					>
						{TRAINING_BUTTON[trainingOrder]}
					</button>
				</div>
			</div>
		</Modal>
	)
}
