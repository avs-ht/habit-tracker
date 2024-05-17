import styles from './errorMessage.module.scss'

interface IProps {
	children: React.ReactNode
	showCondition: boolean
}
export const ErrorMessage = ({ children, showCondition }: IProps) => (
	<>{showCondition && <p className={styles.error}>{children}</p>}</>
)
