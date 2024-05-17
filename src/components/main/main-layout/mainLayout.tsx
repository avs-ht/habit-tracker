import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import { TrainingProvider } from '@/providers/providers/training'

import { useCurrId } from '@/hooks/user/useCurrId'

import { FixedButtons } from './fixed-buttons/fixedButtons'
import styles from './mainLayout.module.scss'
import { Navigation } from './navigation'
import { useSettingsStore } from '@/storage/settings.store'

export const MainLayout = ({ children }: { children: ReactNode }) => {
	const id = useCurrId()
	const showFixedButtons = useSettingsStore(
		state => state.settings[id].showFixedButtons,
	)

	return (
		<TrainingProvider>
			<main className={styles.content}>{children}</main>
			<Navigation />
			{showFixedButtons && <FixedButtons />}
			<Toaster position="bottom-left" />
		</TrainingProvider>
	)
}
