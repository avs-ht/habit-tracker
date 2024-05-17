import { BigStats } from '@/components/profile/profile-stats/big-stats/bigStats'
import { SmallStats } from '@/components/profile/profile-stats/small-stats/smallStats'
import { ReturnButton } from '@/components/ui/button/return-button/returnButton'
import { Title } from '@/components/ui/title/title'

import styles from './statsPage.module.scss'

const MARGIN_STYLE = { marginBottom: '10px' }
export const ProfileStatsPage = () => {
	return (
		<>
			<ReturnButton href="/profile" extraClass={styles.button} />
			<Title htmlTitle="h2" style={MARGIN_STYLE}>
				Статистика
			</Title>
			<SmallStats />
			<BigStats />
		</>
	)
}
