import { REQUIERED_EXPIRIENCE_FOR_LEVELS } from '@/constants/game.constants'

import { useUserInfo } from '@/hooks/user/useUserInfo'

import { Text } from '../ui/text/text'

import { ChangableName } from './changable-name/changableName'
import styles from './profileInfo.module.scss'

export const ProfileInfo = () => {
	const { experience, face, bons, freeSlots, habits } = useUserInfo()

	const expirienceText = `(${experience.toString()}/${REQUIERED_EXPIRIENCE_FOR_LEVELS[face].toString()})`
	return (
		<div className={styles.info}>
			<ChangableName />
			<Text>
				Грань:{' '}
				<b>
					{face.toString()} {expirienceText}
				</b>
			</Text>
			<Text>
				Бонов: <b>{bons.toString()}</b>
			</Text>
			<Text>
				Свободных слотов: <b>{freeSlots.toString()}</b>
			</Text>
			<Text>
				Привычек: <b>{habits.length.toString()}</b>
			</Text>
		</div>
	)
}
