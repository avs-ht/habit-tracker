import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string) => {
	const [matches, setMathces] = useState(window.matchMedia(query).matches)

	useEffect(() => {
		const matchQueryList = window.matchMedia(query)
		const changeHandler = (e: { matches: boolean }) => {
			setMathces(e.matches)
		}

		matchQueryList.addEventListener('change', changeHandler)

		return () => {
			matchQueryList.removeEventListener('change', changeHandler)
		}
	}, [query])

	return matches
}
