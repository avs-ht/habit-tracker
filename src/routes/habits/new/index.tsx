import { createFileRoute } from '@tanstack/react-router'

import { newHabitMiddleware } from '@/middlewares/newHabit.middleware'
import { NewHabitPage } from '@/pages/habits/newPage'

export const Route = createFileRoute('/habits/new/')({
	component: NewHabitPage,
	loader: newHabitMiddleware,
})
