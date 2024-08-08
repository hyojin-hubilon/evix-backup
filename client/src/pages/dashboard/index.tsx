import { EditOutlined, SyncOutlined } from "@ant-design/icons";
import { Box, Button, Container, Grid, MenuItem, Select, Divider, Typography, Toolbar, useTheme } from '@mui/material';
import MainCard from "@/components/MainCard";
import CircleChart, { ApexDonutChartSeriesType } from "../study/components/overview/CircleChart";
import dashboardApi from "@/apis/dashboard";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { NumOfParticipantByStudy } from "@/types/dashboard";
import ParticipantNums from "./ParticipantNums";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";



const DashboardDefault = () => {
	const theme = useTheme();
	const { primary } = theme.palette;
	const [ participantNumber, setParticipantNumber] = useState<NumOfParticipantByStudy[]>([]);
	const [ loadedTime, setLoadedTime ] = useState(new Date());
	
	const [ studyGoal, setStudyGoal ] = useState<NumOfParticipantByStudy | null>(null);
	const [ studyGoalNo, setStudyGoalNo] = useState('');

	const getNumberParticipant = async () => {
		const response = await dashboardApi.getNumOfParticipantByStudy();
		if(response.content) {
			const studies = response.content;
			setParticipantNumber(studies);
			
			const firstStudy = studies[0];
			setStudyGoal(firstStudy);
			setStudyGoalNo(String(firstStudy.std_no));
			
			const percentage = firstStudy.number_participant/firstStudy.target_number * 100;
			setGoalPercentage(percentage)
		}
		
		setLoadedTime(new Date())
	}
	
	const handleRefresh =() => {
		getNumberParticipant();
	}


	useEffect(() => {
		getNumberParticipant();
	}, [])



	const handleChangeStudyGoal = (e) => {
		console.log(e.target.value);
		const stdNo = String(e.target.value);
		setStudyGoalNo(stdNo)
		const findStudy = participantNumber.find(study => String(study.std_no) == stdNo);
		
		if(findStudy){ 
			setStudyGoal(findStudy);
			const percentage = findStudy.number_participant/findStudy.target_number * 100;
			setGoalPercentage(percentage);
		} else {
			setStudyGoal(null);
			setGoalPercentage(0);
		}		
	}

 	// Study Goal 예시데이터
	const [series, setSeries] = useState([
		{
			name: '참여자',
			data: [
				[dayjs('2024-03').valueOf(), 0], //날짜, 참여자 수
                [dayjs('2024-04').valueOf(), 5],
                [dayjs('2024-05').valueOf(), 10],
                [dayjs('2024-06').valueOf(), 20],
                [dayjs('2024-07').valueOf(), 30],
				[dayjs('2024-08').valueOf(), 31]
			]
		}
	]);
	

	// Study Goal chart options
	const areaChartOptions: ApexOptions = {
		chart: {
		height: 200, // 차트의 높이를 설정합니다.
		type: 'line', // 차트 유형을 'line'으로 설정합니다.
		toolbar: {
			show: false // 툴바를 숨깁니다.
		}
		},
		xaxis: {
			type: 'datetime'
		},
		tooltip: {
			x: {
				format: 'dd MMM yyyy'
			}
		},
		dataLabels: {
			enabled: false
		},
		markers: {
			size: 0,
		},
		stroke: {
			curve: 'smooth', // 곡선 형태의 선을 사용합니다.
			width: 2 // 선의 너비를 1로 설정합니다.
		}
	};

	//Weekly by Study 예시 데이터
	const [ series2, setSeries2] = useState([{
		name: 'Study A',
		data: [44, 55, 41, 67, 22, 43, 20]
	  }, {
		name: 'Study B',
		data: [13, 23, 20, 8, 13, 27, 40]
	  }, {
		name: 'Study C',
		data: [11, 17, 15, 15, 21, 14, 15]
	  }, {
		name: 'Study D',
		data: [21, 7, 25, 13, 22, 8, 4]
	  }],
	)

	//Weekly by Study 차트 옵션
	const stackedBarOptions: ApexOptions = {
		chart: {
			type: 'bar',
			height: 350,
			stacked: true,
			toolbar: {
				show: false
			},
			zoom: {
				enabled: true
			}
		},
		responsive: [{
			breakpoint: 480,
			options: {
				legend: {
				position: 'bottom',
				offsetX: -10,
				offsetY: 0
				}
			}
		}],
		plotOptions: {
		bar: {
			
			horizontal: false,
			borderRadius: 10,
			borderRadiusApplication: 'end', // 'around', 'end'
			borderRadiusWhenStacked: 'last', // 'all', 'last'
			columnWidth: '50%',
			dataLabels: {
				total: {
					enabled: true,
					style: {
						fontSize: '12px',
						fontWeight: 900
					}
				}
			}
		},
		},
		xaxis: {
			type: 'category',
			categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
		},
		legend: {
			position: 'top',
			offsetY: 0
		},
		fill: {
			opacity: 1
		},
		colors: [primary[900], primary[700], primary[400], primary[200], primary[100]],
	}

	const [options, setOptions] = useState<ApexOptions>(areaChartOptions); // Study Goal 차트 옵션 상태를 관리합니다.
	const [options2, setOptions2] = useState<ApexOptions>(stackedBarOptions); //Weekly by Study 차트 옵션 상태를 관리합니다.


	const [goalPercentage, setGoalPercentage] = useState(0);

	
    return  (
		<>
            <Grid item container rowSpacing={2} columnSpacing={1} flexDirection="row">
                <Grid container item xs={12} justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h3">Dashboard</Typography>
                    </Box>
					<Box>
						<Button onClick={handleRefresh}>{ dayjs(loadedTime).format('YYYY-MM-DD hh:mm:ss')} <SyncOutlined style={{marginLeft: '0.5rem'}} /></Button>
					</Box>
                </Grid>

				<Grid item xs={12}>
					<MainCard sx={{width: 1}}>
						<Typography variant="h5" mb={2}>Number of participants by study</Typography>
						<Box width="100%" display="block" overflow="hidden">
							<ParticipantNums participantNumber={participantNumber} />
						</Box>
					</MainCard>
				</Grid>        

				<Grid item xs={6}>
				<MainCard sx={{height: '360px'}}>
						<Box display="flex" justifyContent="space-between" alignItems="center">
							<Typography variant="h5">Study Goal</Typography>
							<Select onChange={handleChangeStudyGoal} value={studyGoalNo} size="small">
								{
									participantNumber.map((study, index) => 
										<MenuItem key={index} value={String(study.std_no)}>{study.title}</MenuItem>
									)
								}
							</Select>
							
						</Box>
						<Divider sx={{margin: '0.5rem 0'}}/>
						<Box>
							<Typography variant="h2" color="primary.darker" mt={2} ml={2}>{ goalPercentage } %</Typography>
							<ReactApexChart options={options} series={series} type="area" height={200} />

						</Box>

					</MainCard>
				</Grid>       

				<Grid item xs={6}>
					<MainCard sx={{height: '360px'}}>
					<Typography variant="h5">Weekly by Study</Typography>
					<Box sx={{marginTop:'26px'}}>
						<ReactApexChart type="bar" options={options2} series={series2} height={250}/>
					</Box>
					</MainCard>
				</Grid>       

				<Grid item xs={12}>
					<MainCard>
						<Typography variant="h5">Recent participant logs</Typography>
					</MainCard>
				</Grid>
            </Grid>
        </>
	);
};

export default DashboardDefault;
