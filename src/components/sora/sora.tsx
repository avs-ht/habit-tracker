import { useNavigate } from '@tanstack/react-router'

import { Text } from '@/components/ui/text/text'

import { SORA_NORMAL_CALMNESS } from '@/constants/game.constants'

import { useUserInfo } from '@/hooks/user/useUserInfo'

import { Button } from '../ui/button/button'

import styles from './sora.module.scss'

export const Sora = () => {
	const { excitment, soraExcitment, soraCalmness, face } = useUserInfo()
	const navigate = useNavigate()
	const isSoraCalm = soraCalmness >= SORA_NORMAL_CALMNESS
	const soraImg = {
		height: 150,
		srcSet: isSoraCalm
			? '/sora/sora-calm.webp, /sora/sora-calm.png'
			: '/sora/sora-not-calm.webp, /sora/sora-not-calm.png',
		alt: isSoraCalm
			? 'сора спокойный по вопросу азарта'
			: 'сора беспокоится по поводу нехватки азарта',
	}
	const isDisabledButton = face < 4

	return (
		<div className={styles.sora}>
			<Text>
				Текущий азарт: <b>{excitment}</b>
				<br />
				Сора нуждается в <b>{soraExcitment}</b> до конца этого дня <br />
				Его спокойство на <b>{soraCalmness}</b> уровне
			</Text>
			<div className={styles['sora-tasks']}>
				<img
					height={soraImg.height}
					srcSet={soraImg.srcSet}
					alt={soraImg.alt}
				/>
				<Button
					disabled={isDisabledButton}
					aria-disabled={isDisabledButton}
					shouldBreak
					onClick={() => navigate({ to: '/sora/tasks' })}
				>
					{face < 4 ? 'Сора считает вас неготовым для заданий' : 'Задания Соры'}
				</Button>
			</div>
		</div>
	)
}
