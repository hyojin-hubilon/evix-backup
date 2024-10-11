import { Box, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export type ApexDonutChartSeriesType = {
	series: number[],
	labels: string[]
}

type CircleChartProps = {
	series: ApexDonutChartSeriesType;
}

const CircleChart = (props: CircleChartProps) => {
	const { series } = props;
	const theme = useTheme();
	
	const [ chartData, setChartData ] = useState<number[]>([]);
	const [ chartOptions, setChartOptions ] = useState<ApexOptions>({chart: {type:'radialBar'}});
	
	useEffect(() => {
		setChartOptions((prevState) => ({
			...prevState,
			colors: [theme.palette.primary.main, theme.palette.grey[400]],
			legend: {
				show: false
			},
			plotOptions: {
				radialBar: {
					hollow: {
						size: '50%',
				  	},
					dataLabels: {
						name: {
							fontSize: '12px'
						}
					}
				},
			},
			labels: series.labels.map(data => data)
		}));

		
		setChartData([...series.series.map(data => data)]);
		
	}, [series])

	return (
		<Box minHeight={100}>
			<ReactApexChart options={chartOptions} series={chartData} type="radialBar" width="200" height="200" />
		</Box>
	)


}

export default CircleChart;
