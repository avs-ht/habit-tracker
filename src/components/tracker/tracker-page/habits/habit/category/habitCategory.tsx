import styles from './habitCategory.module.scss'

export const HabitCategory = ({ category }: { category: string }) => {
	return <div className={styles.category}>{category}</div>
}
