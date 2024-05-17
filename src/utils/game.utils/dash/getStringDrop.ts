import { EnumDrop, IMinMax } from '@/types/game.types'

const switchByMin = (dropType: EnumDrop, min: number) => {
	switch (dropType) {
		case EnumDrop.addExp:
			return `+ ${min} опыта`
		case EnumDrop.removeExp:
			return `- ${min} опыта`
		case EnumDrop.addBon:
			return `+ ${min} бона`
		case EnumDrop.removeBon:
			return `- ${min} бона`
		case EnumDrop.addSlot:
			return `+ Новый слот`
		case EnumDrop.saveSlot:
			return `+ Сохранение слота`
		case EnumDrop.expToBons:
			return `${min} опыта → 0 бонов`
		default:
			return 'неизвестный дроп'
	}
}

const switchByMinMax = (dropType: EnumDrop, amount: IMinMax) => {
	switch (dropType) {
		case EnumDrop.addExp:
			return `+ ${amount.min}-${amount.max} опыта`
		case EnumDrop.removeExp:
			return `- ${amount.min}-${amount.max} опыта`
		case EnumDrop.addBon:
			return `+ ${amount.min}-${amount.max} бонов`
		case EnumDrop.removeBon:
			return `- ${amount.min}-${amount.max} бонов`
		case EnumDrop.addSlot:
			return `+ Новый слот`
		case EnumDrop.saveSlot:
			return `+ Сохранение слота`
		case EnumDrop.expToBons:
			return `${amount.min} опыта → ${amount.max} бонов`
		default:
			return 'неизвестный дроп'
	}
}
export const getStringDrop = (dropType: EnumDrop, amount: IMinMax) => {
	if (amount.max === 0) {
		return switchByMin(dropType, amount.min)
	}
	return switchByMinMax(dropType, amount)
}
