import { ChangeProfileForm } from './forms/change-profile/changeProfileForm'
import { IsAcceptingForm } from './forms/isAccepting/isAcceptingForm'
import { NotificationForm } from './forms/notification/showFixedButtonsForm'
import { ShowFixedButtonsForm } from './forms/show-fixed-buttons/showFixedButtonsForm'
import { ThemeForm } from './forms/theme/themeForm'
import styles from './settings.module.scss'

export const Settings = () => {
	return (
		<div className={styles.settings}>
			<ChangeProfileForm />
			<ShowFixedButtonsForm />
			<IsAcceptingForm />
			<NotificationForm />

			<ThemeForm />
		</div>
	)
}
