import { useDevices } from '@/hooks/useDevices'

import { Header } from './header/header'
import { Sidebar } from './sidebar/sidebar'

export const Navigation = () => {
	const { isDesktop } = useDevices()
	return <>{isDesktop ? <Sidebar /> : <Header />}</>
}
