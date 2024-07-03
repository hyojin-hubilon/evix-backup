import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

type CircleChartProps = {
	title: string;
	series: ApexAxisChartSeries;
}

const circleChartInitial: ApexOptions = {
	chart: {
		type: 'donut',
		width: 200,
		height: 200
	}
}
const CircleChart = (props: CircleChartProps) => {
	const { title, series } = props;
	const theme = useTheme();
	const [ chartOptions, setChartOptions ] = useState<ApexOptions>(circleChartInitial);
	
	useEffect(() => {
		console.log(series);
		setChartOptions((prevState) => ({
			...prevState,
			colors: [theme.palette.primary.main, theme.palette.primary[700]], // 차트 색상을 설정합니다.
			tooltip: {
			  theme: 'light'
			}
		}));
	}, [series])

	return (
		<Stack>
			<Typography variant="h6" color="textSecondary">
				{title}
			</Typography>
			<Box minHeight={200}>
				<ReactApexChart options={chartOptions} series={series} type="donut" width="200" height="200" />
			</Box>
		</Stack>
	)


}

export default CircleChart;
