import { NewProfileForm } from '@/components/profile/new-page/newProfileForm'
import { Title } from '@/components/ui/title/title'

import styles from './newPage.module.scss'

export const NewProfilePage = () => {
	return (
		<div className={styles.container}>
			<Title htmlTitle="h2">Новый профиль</Title>
			<NewProfileForm />
		</div>
	)
}
