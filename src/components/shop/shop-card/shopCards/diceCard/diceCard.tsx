import { useRef } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'
import { Text } from '@/components/ui/text/text'

import { DICES_INFO, SHOP_DICES } from '@/constants/game.constants'

import { EnumDices, EnumSoraTaskAction } from '@/types/game.types'

import { useManageUsers } from '@/hooks/user/useManageUsers'
import { useUserInfo } from '@/hooks/user/useUserInfo'

import { sendSoraActionEvent } from '@/utils/game.utils/event'

import CardForm from '../../cardForm/cardForm'
import { ShopCard } from '../../shopCard/shopCard'

import styles from './diceCard.module.scss'

interface IProps {
	dice: EnumDices
}
const SLOT_COEF = 0.5
export const DiceCard = ({ dice }: IProps) => {
	const { name } = DICES_INFO[dice]
	const {
		price: standartPrice,
		description,
		donate,
	} = SHOP_DICES[dice as keyof typeof SHOP_DICES]

	const user = useUserInfo()
	const { updateUser } = useManageUsers()
	const price =
		dice === EnumDices.slot
			? standartPrice +
				Math.floor((user.freeSlots + user.habits.length) / SLOT_COEF)
			: standartPrice

	const canBuy = user.bons >= price
	const modalRef = useRef<HTMLDialogElement>(null)
	const buyDice = () => {
		if (!user || !canBuy) return
		user.bons -= price
		user.dices[dice] += 1
		toast.success(`Вы купили ${name} дайс!`)
		updateUser(user)
		sendSoraActionEvent(EnumSoraTaskAction.shopBuy, 1)
	}
	return (
		<ShopCard title={`${name} дайс`}>
			<div className={styles.container}>
				<div className={styles.info}>
					<Text>{description}</Text>
					<Text>
						Цена: <b>{price} бон</b>
						{donate && (
							<>
								<br />
								Цена в рублях: <b>{donate.price}</b>
							</>
						)}
					</Text>
				</div>
				<Button
					type="button"
					onClick={buyDice}
					disabled={!canBuy}
					aria-disabled={!canBuy}
				>
					Купить
				</Button>
				{donate && (
					<Modal returnModalRef={modalRef} openButtonText="Задонатить">
						<CardForm
							donateFn={() => {
								user.dices[dice] += 1
								toast.success(`Вы купили ${name} дайс!`)
								updateUser(user)
								sendSoraActionEvent(EnumSoraTaskAction.shopBuy, 1)
								modalRef.current?.close()
							}}
						/>
					</Modal>
				)}
			</div>
		</ShopCard>
	)
}
