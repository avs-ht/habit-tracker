import { defaultUser } from '@/storage/user.store'

export const generateUsers = (n: number) => {
	const defaultUserTemplate = JSON.parse(JSON.stringify(defaultUser))
	const users = []
	for (let i = 0; i < n; i++) {
		const user = {
			...defaultUserTemplate,
			id: i + 1,
			name: (Math.random() + 1).toString(36).substring(7),
		}
		users.push(user)
	}
	return users
}
