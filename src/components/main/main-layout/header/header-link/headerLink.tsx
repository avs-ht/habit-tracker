import { Link, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'

import type { INavLink } from '@/types/nav.types'

import { isRightPathname } from '@/utils/nav.utils/isRightPathname'

import styles from './headerLink.module.scss'

export const HeaderLink = ({ link }: { link: INavLink }) => {
	const { href, title } = link
	const pathName = useRouterState().location.pathname
	const isRightPath = isRightPathname(pathName, href)
	return (
		<li>
			<Link
				className={clsx(styles.link, isRightPath && styles.active)}
				to={href}
			>
				{title}
			</Link>
		</li>
	)
}
