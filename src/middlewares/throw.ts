import { redirect } from '@tanstack/react-router'

import { TypeHref } from '@/types/nav.types'

export const redirectTo = (to: TypeHref, condition: boolean) => {
	if (condition) {
		throw redirect({
			to,
		})
	}
}
