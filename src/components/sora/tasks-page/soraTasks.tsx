import { Text } from '@/components/ui/text/text'

import { SORA_NORMAL_CALMNESS } from '@/constants/game.constants'

import { useUserInfo } from '@/hooks/user/useUserInfo'

import styles from './soraTasks.module.scss'
import { SoraTask } from './task/soraTask'

export const SoraTasks = () => {
	const { tasks, soraCalmness } = useUserInfo()
	return (
		<>
			{tasks.length !== 0 && tasks.some(task => !task.isDone) ? (
				<div className={styles.tasks}>
					{tasks.map((task, i) => (
						<SoraTask key={i} task={task} />
					))}
				</div>
			) : soraCalmness >= SORA_NORMAL_CALMNESS ? (
				<Text>Сора готов дать вам задания завтра, если он будет спокоен!</Text>
			) : (
				<Text>
					Сора не хочет давать вам задания, его уровень беспокойтва мал
				</Text>
			)}
		</>
	)
}
