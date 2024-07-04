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
	const [ chartOptions, setChartOptions ] = useState<ApexOptions>({chart: {type:'donut'}});
	
	useEffect(() => {
		console.log(series);
		setChartOptions((prevState) => ({
			...prevState,
			colors: [theme.palette.primary.main, theme.palette.grey[200]],
			legend: {
				show: false
			},
			plotOptions: {
				pie: {
					startAngle: -360,
					endAngle: 0,
				}
			},
			labels: series.labels.map(data => data)
		}));

		
		setChartData([...series.series.map(data => data)]);
		
	}, [series])

	return (
		<Box minHeight={100} display="flex" justifyContent="center">
			<ReactApexChart options={chartOptions} series={chartData} type="donut" width="150" height="150" />
		</Box>
	)


}

export default CircleChart;
