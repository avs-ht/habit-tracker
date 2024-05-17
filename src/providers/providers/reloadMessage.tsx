import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const ReloadMessageProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	useEffect(() => {
		const message = localStorage.getItem('reloadMessage')
		if (!message) return

		setTimeout(() => {
			toast.success(JSON.parse(message))
		}, 0)

		localStorage.removeItem('reloadMessage')
	}, [])
	return <>{children}</>
}
