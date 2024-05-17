import { Text } from '@/components/ui/text/text'
import { Title } from '@/components/ui/title/title'

import type { ISoraTask } from '@/types/game.types'

import { generateTaskText } from '@/utils/game.utils/tasks'

import styles from './soraTask.module.scss'

export const SoraTask = ({ task }: { task: ISoraTask }) => {
	const taskText = generateTaskText(task)
	return (
		<div className={styles.task}>
			<Title htmlTitle="h3">
				{taskText.title}{' '}
				{task.isDone && <span className={styles.checkmark}>✔</span>}
			</Title>
			<Text marginBottomCoef={0.1}>{taskText.value}</Text>
			<Text>
				{task.isDone ? (
					<>
						<s>
							Награды: <b>{taskText.rewards}</b>
						</s>{' '}
					</>
				) : (
					<>
						Награды: <b>{taskText.rewards}</b>
					</>
				)}
				<></>
			</Text>
		</div>
	)
}
