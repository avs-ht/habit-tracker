import { DAILY_FUNCTIONS, INTERVAL_FUNCTIONS } from '@/constants/game.constants'

import { DailyProvider } from './providers/daily'
import { EventProvider } from './providers/event'
import { NotificationProvider } from './providers/notification'
import { ReloadMessageProvider } from './providers/reloadMessage'
import { ThemeProvider } from './providers/theme'
import { TimelineProvider } from './providers/timeline'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider>
			<ReloadMessageProvider>
				<TimelineProvider pageLoadFns={INTERVAL_FUNCTIONS}>
					<DailyProvider pageLoadFns={DAILY_FUNCTIONS}>
						<EventProvider>
							<NotificationProvider>{children}</NotificationProvider>
						</EventProvider>
					</DailyProvider>
				</TimelineProvider>
			</ReloadMessageProvider>
		</ThemeProvider>
	)
}
