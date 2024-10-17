import { Box, Button, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export type ApexDonutChartSeriesType = {
	series: number[],
	labels: string[]
}

type CircleChartProps = {
	series: ApexDonutChartSeriesType;
	id?: string;
}

const CircleChart = (props: CircleChartProps) => {
	const { series, id } = props;
	const theme = useTheme();
	
	const [ chartData, setChartData ] = useState<number[]>([]);
	const [ chartOptions, setChartOptions ] = useState<ApexOptions>({chart: {type:'radialBar'}});
	
	const participantRef = useRef<any>()

	const handleChartDownload = (chartId:string) => {
		const chartInstance = ApexCharts.getChartByID(chartId); //getChartByID가 먹히지 않음.. 
		// const chartInstance = participantRef.current.chart; //ref는 됨

		console.log(chartId, chartInstance);
	
		if (!chartInstance) {
			return;
		}
	
		chartInstance.exports.exportToPng();
	}

	// async function downloadSVG(chartId, datatype) { //다운로드 다른 예시
	// 	const chartInstance = window.Apex._chartInstances.find(
	// 	  (chart) => chart.id === chartId
	// 	);
	
	// 	if (datatype === "png") {
	// 		chartInstance.chart.exports.exportToPng();
	// 	}
	// 	else if (datatype === "svg") {
	// 		chartInstance.chart.exports.exportToSVG();
	// 	}
	//   }

	useEffect(() => {
		setChartOptions((prevState) => ({
			...prevState,
			colors: [theme.palette.primary.main, theme.palette.grey[400]],
			legend: {
				show: false
			},
			chart : {
				id : id,
				toolbar: {
					show: false, //툴바표시 숨김
					offsetY: 10, //툴바 위치 변경
					offsetX: -20, //툴바 위치 변경
					export: {
						svg : {filename : id}, //툴바로 다운로드
						png : {filename: id}
					},
					
				},
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
			{/* <Button onClick={() => handleChartDownload("participant_rate")}>Download</Button> */}
			<ReactApexChart options={chartOptions} series={chartData} type="radialBar" width="200" height="200" id={id} ref={participantRef} />
		</Box>
	)


}

export default CircleChart;
