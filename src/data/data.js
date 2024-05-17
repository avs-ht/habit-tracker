import * as fs from 'fs'

export const createJSON = () => {
	const dataHabit3 = {
		id: 1,
		title: 'Прогулка на свежем воздухе',
		category: 'Физическая активность',
		addDate: new Date('2024-02-01'),
		period: 'daily',
	}

	// Пример данных для действий
    const actionDate = new Date()
	const actions = []
	for (let i = 0; i < 50; i++) {
		
		const newActDate = new Date((actionDate.getTime() + i * 24 * 60 * 60 * 1000))

		const action = {
			id: dataHabit3.id,
			date: newActDate,
		}

		actions.push(action)
	}
	fs.writeFileSync(
		'data3.json',
		JSON.stringify({ habits: [dataHabit3], actions }),
	)
}


createJSON()