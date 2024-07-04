import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

type PartByHospitalsChartProps= {
	title:string;
}

const PartByHospitalsChart = ({title} : PartByHospitalsChartProps) => {
	const theme = useTheme();
	const { primary } = theme.palette;
	const [ slot, setSlot ] = useState<'daily' | 'weekly' | 'monthly'>('daily');
	const [ series, setSeries ] = useState([44, 55, 13, 43, 22]); //병원 별 가장 많은 순으로 변경해서 넣어야함
	const [ options, setOptions ] = useState<ApexOptions>({
		chart: {
			width: 370,
			type: 'pie',
		},
		colors: [primary[900], primary[700], primary[400], primary[200], primary[100]],
		legend: {
			position: 'left',
			horizontalAlign: 'center', 
		},
		tooltip: {
			y: {
				formatter: function(value) {
					return value + "명";
				}
			}
		},
		labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'] //병원별 가장 많은순으로 변경해서 넣어야함
	})

	return (
		<>
			<Grid container>
				<Grid item xs={4}>
					<Typography variant="h6" color="textSecondary">
						{title} 
					</Typography>
					{/* 수정하기 (해당자료 수정하기 링크)? */}
				</Grid>
				<Grid item xs={8}>
					<Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={1}>
						<Button
							size="small"
							onClick={() => setSlot('daily')}
							color={slot === 'daily' ? 'primary' : 'secondary'}
							variant={slot === 'daily' ? 'outlined' : 'text'}
							sx={{fontSize: "0.7rem"}}
						>
							Daily
						</Button>
						<Button
							size="small"
							onClick={() => setSlot('weekly')}
							color={slot === 'weekly' ? 'primary' : 'secondary'}
							variant={slot === 'weekly' ? 'outlined' : 'text'}
							sx={{fontSize: "0.7rem"}}
						>
							weekly
						</Button>
						<Button
							size="small"
							onClick={() => setSlot('monthly')}
							color={slot === 'monthly' ? 'primary' : 'secondary'}
							variant={slot === 'monthly' ? 'outlined' : 'text'}
							sx={{fontSize: "0.7rem"}}
						>
							Monthly
						</Button>
						{/* 기간별 정의는 질문해 둔 상태 : Daily 선택은 오늘 혹은 마지막 날짜가 기준인 것일까 */}
					</Stack>
				</Grid>
			</Grid>
			
			<Box display="flex" justifyContent="center">
				<ReactApexChart options={options} series={series} type="pie" width={370} />
			</Box>
		</>
	)
}

export default PartByHospitalsChart;