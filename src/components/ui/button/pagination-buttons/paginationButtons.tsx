import { IPAginationButtons } from '@/types/ui.types'

import { Button } from '../button'

import styles from './paginationButtons.module.scss'

const NEXT_BUTTON_TITLE = 'Показать предыдущие действия'
const PREV_BUTTON_TITLE = 'Показать следующие действия'
export const PaginationButtons = ({
	setIndex,
	index,
	step,
	maxIndex,
}: IPAginationButtons) => {
	const addIndex = () => {
		setIndex(index + step)
	}
	const reduceIndex = () => {
		setIndex(index - step)
	}
	return (
		<>
			{index >= step && (
				<Button
					className={styles.arrow}
					onClick={reduceIndex}
					title={NEXT_BUTTON_TITLE}
					aria-label={NEXT_BUTTON_TITLE}
				>
					&#8592;
				</Button>
			)}
			{index + step < maxIndex && (
				<Button
					className={styles.arrow}
					onClick={addIndex}
					title={PREV_BUTTON_TITLE}
					aria-label={PREV_BUTTON_TITLE}
				>
					&#8594;
				</Button>
			)}
		</>
	)
}
