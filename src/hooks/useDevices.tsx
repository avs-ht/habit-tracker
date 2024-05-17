import { BREAK_POINTS } from '@/constants/style.constants'

import { useMediaQuery } from './useMediaQuery'

export const useDevices = () => {
	const isMobile = useMediaQuery(`(max-width: ${BREAK_POINTS.MOBILE}px)`)
	const isTablet = useMediaQuery(`(max-width: ${BREAK_POINTS.TABLET}px)`)
	const isLaptop = useMediaQuery(`(max-width: ${BREAK_POINTS.LAPTOP}px)`)
	return {
		isMobile: isMobile,
		isTablet: isTablet,
		isLaptop: isLaptop,
		isDesktop: !(isMobile || isTablet || isLaptop),
	}
}
