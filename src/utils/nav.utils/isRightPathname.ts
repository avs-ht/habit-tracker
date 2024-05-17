export const isRightPathname = (pathname: string, href: string) => {
	if (href !== '/') {
		return pathname.startsWith(href)
	}
	return pathname === '/'
}
