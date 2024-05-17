import { Chart } from 'react-chartjs-2'

import { Title as CustomTitle } from '@/components/ui/title/title'

const chartConfig = {
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			ticks: {
				stepSize: 1,
			},
		},
	},
}

interface IChartData {
	chartTitlle: string
	data: {
		labels: string[]
		data: number[]
	}
}
export const ChartStats = ({ data, chartTitlle }: IChartData) => {
	return (
		<>
			{data.data.length !== 0 && (
				<>
					<CustomTitle htmlTitle="h3">{chartTitlle}</CustomTitle>

					<Chart
						type={'bar'}
						options={chartConfig}
						data={{
							labels: data.labels,
							datasets: [
								{
									data: data.data,
								},
							],
						}}
					/>
				</>
			)}
		</>
	)
}
