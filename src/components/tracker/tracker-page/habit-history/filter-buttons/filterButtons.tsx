import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/checkbox'

import { IHistoryFilterFormState } from '@/types/forms.types'

import { useHabitId } from '@/hooks/usesHabitId'

export const FilterButtons = ({
	searchParams,
}: {
	searchParams: IHistoryFilterFormState
}) => {
	const { habitId } = useHabitId()
	const { register, watch, setValue } = useForm<IHistoryFilterFormState>()
	const navigate = useNavigate()

	useEffect(() => {
		const subscription = watch(value => {
			const { cancelTrackingActions, commonActions } = value
			navigate({
				to: '/habits/$habitId/history',
				params: {
					habitId: habitId.toString(),
				},
				search: {
					cancelTrackingActions:
						cancelTrackingActions === undefined ? true : cancelTrackingActions,
					commonActions: commonActions === undefined ? true : commonActions,
				},
			})
		})

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [habitId])
	return (
		<form role="search">
			<Checkbox
				defaultChecked={searchParams.commonActions}
				label="Выполнение привычки"
				register={register('commonActions')}
				setValue={setValue}
			/>
			<Checkbox
				defaultChecked={searchParams.cancelTrackingActions}
				label="Управление трекингом"
				register={register('cancelTrackingActions')}
				setValue={setValue}
			/>
		</form>
	)
}
