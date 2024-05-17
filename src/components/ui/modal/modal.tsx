import clsx from 'clsx'

import { IModal } from '@/types/ui.types'

import { Button } from '../button/button'

import styles from './modal.module.scss'

export const Modal = ({
	children,
	openButtonText,
	isOpenButtonNeed = true,
	isCloseButtonNeed = true,
	classNameDialog = '',
	classNameButton = '',
	returnModalRef,
	closeFunction = () => {},
	...props
}: IModal) => {
	const dialogRef = returnModalRef

	const buttonClassName = clsx(styles.button, classNameButton)
	const dialogClassName = clsx(styles.dialog, classNameDialog)

	const openModal = () => {
		dialogRef.current?.showModal()
	}
	const closeModal = () => {
		dialogRef.current?.close()
		closeFunction()
	}
	return (
		<>
			{isOpenButtonNeed && (
				<Button type="button" onClick={openModal} className={buttonClassName}>
					{openButtonText}
				</Button>
			)}
			<dialog ref={dialogRef} className={dialogClassName} {...props}>
				{children}
				{isCloseButtonNeed && (
					<button
						type="button"
						onClick={closeModal}
						className={styles['close-button']}
					>
						&#x2716;
					</button>
				)}
			</dialog>
		</>
	)
}
