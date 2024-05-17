import { useRef } from 'react'

import { LINKS } from '@/constants/nav.constants'

import type { INavLink } from '@/types/nav.types'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import { LogoTitle } from '../../../ui/logo-title/logoTitle'

import { CloseButton } from './close-button/closeButton'
import { HeaderLink } from './header-link/headerLink'
import styles from './header.module.scss'
import { MenuButton } from './menu-button/menuButton'

export const Header = () => {
	const navRef = useRef(null)
	const isPhone = useMediaQuery(`(max-width: 520px)`)
	return (
		<header className={styles.header}>
			<LogoTitle isBig={false} />
			<div className={styles['nav-container']} ref={navRef}>
				<nav ref={navRef} className={styles.nav}>
					<ul className={styles.links}>
						{LINKS.filter((link: INavLink) => link.href !== '/').map(link => (
							<HeaderLink key={link.href} link={link} />
						))}
					</ul>
				</nav>
				{isPhone ? <CloseButton navContainerRef={navRef} /> : null}
			</div>
			{isPhone ? <MenuButton navContainerRef={navRef} /> : null}
		</header>
	)
}
