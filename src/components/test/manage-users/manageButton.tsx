import { MutableRefObject } from 'react'

import { Button } from '@/components/ui/button/button'

import type { EnumActions } from '@/types/test.types'

interface IProps {
	actionRef: MutableRefObject<EnumActions>
	action: EnumActions
	children: string
}
export const ManageButton = ({ actionRef, action, children }: IProps) => {
	return (
		<Button type="submit" onClick={() => (actionRef.current = action)}>
			{children}
		</Button>
	)
}
