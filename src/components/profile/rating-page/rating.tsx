import { useState } from 'react'

import { PaginationButtons } from '@/components/ui/button/pagination-buttons/paginationButtons'

import { useUsers } from '@/hooks/user/useUsers'

import styles from './rating.module.scss'

const STEP = 10
export const Rating = () => {
	const [index, setIndex] = useState(0)
	const users = useUsers().sort((a, b) => b.excitment - a.excitment)
	const currUsers = users.slice(index, index + STEP)

	return (
		<>
			<table className={styles.rating}>
				<thead>
					<tr>
						<th className={styles.place}>#</th>
						<th className={styles.name}>Имя</th>
						<th className={styles.face}>Грань</th>
						<th className={styles.excitment}>Азарт</th>
					</tr>
				</thead>
				<tbody>
					{currUsers.map((user, order) => (
						<tr className={styles.user} key={user.id}>
							<td>{order + index + 1}</td>
							<td>{user.name}</td>
							<td>{user.face}</td>
							<td>{user.excitment}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.buttons}>
				<PaginationButtons
					setIndex={setIndex}
					index={index}
					maxIndex={users.length}
					step={STEP}
				/>
			</div>
		</>
	)
}
