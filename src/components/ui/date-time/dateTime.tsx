import type { ITimeText } from '@/types/ui.types'

export const DateTime = ({ date, children }: ITimeText) => {
	return <time dateTime={new Date(date).toISOString()}>{children}</time>
}
