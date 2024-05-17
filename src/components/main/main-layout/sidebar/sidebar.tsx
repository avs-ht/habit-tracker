import { Settings2, Star, TrainTrack, User } from 'lucide-react'
import { RefObject, useRef } from 'react'

import { LINKS } from '@/constants/nav.constants'
import { CLOSED_SIDEBAR_WIDTH as ICON_SIZE } from '@/constants/style.constants'

import type { INavLink, TypeHref } from '@/types/nav.types'

import { LogoTitle } from '../../../ui/logo-title/logoTitle'

import { HideButton } from './hide-button/hideButton'
import { SidebarLink } from './sidebar-link/sidebarLink'
import styles from './sidebar.module.scss'

export interface IHideSettings {
	asideRef: RefObject<HTMLElement> | undefined
}

const ICON_LINKS = {
	'/habits': (
		<div title="Трекер">
			<TrainTrack size={ICON_SIZE} />
		</div>
	),
	'/sora': (
		<div title="Сора">
			<Star size={ICON_SIZE} />
		</div>
	),
	'/profile': (
		<div title="Профиль">
			<User size={ICON_SIZE} />
		</div>
	),
	'/settings': (
		<div title="Настройки">
			<Settings2 size={ICON_SIZE} />
		</div>
	),
}

export const Sidebar = () => {
	const asideRef = useRef(null)
	const hideSettings = {
		asideRef,
	}

	return (
		<aside ref={asideRef} className={styles.sidebar}>
			<div className={`${styles.content} ${styles.disclosed}`}>
				<LogoTitle />
				<nav className={styles.nav}>
					<ul className={styles.links}>
						{LINKS.map(link => (
							<SidebarLink key={link.href} link={link} />
						))}
					</ul>
				</nav>
			</div>
			<div className={`${styles.content} ${styles.closed}`}>
				<nav className={styles.nav}>
					<ul className={styles.links}>
						{Object.entries(ICON_LINKS).map(([hrefString, img]) => {
							const href = hrefString as TypeHref
							const link: INavLink = {
								title: LINKS.filter(link => link.href === href)[0].title,
								href,
								img,
							}
							return <SidebarLink key={href} link={link} />
						})}
					</ul>
				</nav>
			</div>
			<HideButton hideSettings={hideSettings} />
		</aside>
	)
}
