import { Button } from '@/components/ui/button/button'

import { TypeHref } from '@/types/nav.types'

interface IProps {
	href: TypeHref
	extraClass?: string
}

export const ReturnButton = ({ extraClass = '', href }: IProps) => {
	return (
		<>
			<Button className={extraClass} href={href}>
				<b>&#8592;</b>
				<span>Вернуться обратно</span>
			</Button>
		</>
	)
}
