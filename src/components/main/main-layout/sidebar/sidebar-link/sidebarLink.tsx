import { Link, useRouterState } from '@tanstack/react-router'
import clsx from 'clsx'

import type { INavLink } from '@/types/nav.types'

import { isRightPathname } from '@/utils/nav.utils/isRightPathname'

import styles from './sidebarLink.module.scss'

export const SidebarLink = ({ link }: { link: INavLink }) => {
	const { img: Img, href, title } = link
	const pathName: string = useRouterState().location.pathname
	const isRightPath = isRightPathname(pathName, href)
	return (
		<li>
			<Link
				className={clsx(styles.link, isRightPath && styles.active)}
				to={href}
			>
				{Img ? Img : title}
			</Link>
		</li>
	)
}
