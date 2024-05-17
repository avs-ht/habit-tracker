import { MutableRefObject, useEffect } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Input } from '@/components/ui/input/input'
import { Title } from '@/components/ui/title/title'

import { ITestUserFormState } from '@/types/forms.types'
import { EnumActions } from '@/types/test.types'
import { ISelectOption } from '@/types/ui.types'

import { ManageButton } from '../manageButton'

import styles from './manageParams.module.scss'
import { useUserStore } from '@/storage/user.store'

interface IProps {
	userWatch: ISelectOption
	register: UseFormRegister<ITestUserFormState>
	actionRef: MutableRefObject<EnumActions>
	setValue: UseFormSetValue<ITestUserFormState>
}
export const ManageParams = ({
	userWatch,
	actionRef,
	setValue: set,
	register: reg,
}: IProps) => {
	const users = useUserStore(state => state.users)
	useEffect(() => {
		if (!userWatch) return

		const user = users.find(user => user.id === userWatch.value)

		if (!user) return
		set('freeSlots', user.freeSlots)
		set('experience', user.experience)
		set('face', user.face)
		set('bons', user.bons)
		set('excitment', user.excitment)
		set('dailyDices', user.dices.daily)
		set('ordinaryDices', user.dices.ordinary)
		set('extraordinaryDices', user.dices.extraordinary)
		set('specialDices', user.dices.special)
		set('goldDices', user.dices.gold)
		set('infinityDices', user.dices.infinity)
		set('saveDices', user.dices.save)
		set('slotDices', user.dices.slot)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userWatch])

	return (
		<div className={styles.container}>
			<Title htmlTitle="h3">Параметры юзера</Title>
			<div className={styles.inputs}>
				<Input
					type="number"
					register={reg('freeSlots')}
					placeholder="Свободные слоты"
				/>
				<Input type="number" register={reg('experience')} placeholder="Опыт" />
				<Input type="number" register={reg('face')} placeholder="Грань" />
				<Input type="number" register={reg('bons')} placeholder="Боны" />
				<Input type="number" register={reg('excitment')} placeholder="Азарт" />
				<Input
					type="number"
					register={reg('dailyDices')}
					placeholder="Ежедневные дайсы"
				/>
				<Input
					type="number"
					register={reg('ordinaryDices')}
					placeholder="6гр дайсы"
				/>
				<Input
					type="number"
					register={reg('extraordinaryDices')}
					placeholder="12гр дайсы"
				/>
				<Input
					type="number"
					register={reg('specialDices')}
					placeholder="18гр дайсы"
				/>
				<Input
					type="number"
					register={reg('goldDices')}
					placeholder="Золотоы дайсы"
				/>
				<Input
					type="number"
					register={reg('slotDices')}
					placeholder="Slot дайсы"
				/>
				<Input
					type="number"
					register={reg('saveDices')}
					placeholder="Save дайсы"
				/>
				<Input
					type="number"
					register={reg('infinityDices')}
					placeholder="Infinity дайсы"
				/>
			</div>

			<ManageButton action={EnumActions.saveParams} actionRef={actionRef}>
				Сохранить параметры
			</ManageButton>
		</div>
	)
}
