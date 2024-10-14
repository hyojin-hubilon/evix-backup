import { SyncOutlined } from '@ant-design/icons';
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    Divider,
    Typography,
    useTheme,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    LinearProgress,
	Tooltip,
} from '@mui/material';
import MainCard from '@/components/MainCard';
import dashboardApi from '@/apis/dashboard';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
    NumOfParticipantByStudy,
    StudyGoalByMonthlyChart,
    WeeklyByStudyChart,
} from '@/types/dashboard';
import ParticipantNums from './ParticipantNums';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import divider from 'antd/es/divider';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/reducers';

interface Logs {
    study: string;
    name: string;
    dateOfBirth: string;
    enrollmentDate: string;
    roundInfo: number[];
    status: string;
}

const DashboardDefault = () => {
    const theme = useTheme();
    const { primary } = theme.palette;
    const [participantNumber, setParticipantNumber] = useState<NumOfParticipantByStudy[]>([]);
    const [loadedTime, setLoadedTime] = useState(new Date());

	const { drawerOpen } = useSelector((state: IRootState) => state.menu);

    // Study Goal 예시데이터
    const [studyGoal, setStudyGoal] = useState<NumOfParticipantByStudy | null>(null);
    const [monthlyStudyGoalChart, setMonthlyStudyGoalChart] = useState<StudyGoalByMonthlyChart[]>([]);
    const [studyGoalNo, setStudyGoalNo] = useState('');
    const [participantLogs, setParticipantLogs] = useState<Logs[]>([]);
    const navigate = useNavigate();

    const getNumberParticipant = async () => {
        const response = await dashboardApi.getNumOfParticipantByStudy();
        if (response.content) {
            const studies = response.content;
            setParticipantNumber(studies);

            const firstStudy = studies[0];
            if (firstStudy) {
                setStudyGoal(firstStudy);
                setStudyGoalNo(String(firstStudy.std_no));

                const percentage = (firstStudy.number_participant / firstStudy.target_number) * 100;
                setGoalPercentage(percentage);
            }
        }

        setLoadedTime(new Date());
    };

    const handleRefresh = () => {
        getNumberParticipant();
    };

    const getStudyGoalByMonthly = async (stdNo: string) => {
        if (!stdNo) return;
        const response = await dashboardApi.getStudyGoalByMonthly(stdNo);
        if (response.code === 200) {
            const firstItem = response.content.at(0);
            if (!firstItem) return;
            const content = [
                {
                    name: t('study.participants'),
                    data: [
                        [dayjs(firstItem.ago_5_month).valueOf(), firstItem.num_ago_5_month], //날짜, 참여자 수
                        [dayjs(firstItem.ago_4_month).valueOf(), firstItem.num_ago_4_month],
                        [dayjs(firstItem.ago_3_month).valueOf(), firstItem.num_ago_3_month],
                        [dayjs(firstItem.ago_2_month).valueOf(), firstItem.num_ago_3_month],
                        [dayjs(firstItem.ago_1_month).valueOf(), firstItem.num_ago_2_month],
                        [dayjs(firstItem.current_month).valueOf(), firstItem.num_current_month],
                    ],
                },
            ];
            setMonthlyStudyGoalChart(content);
        }
    };

    //Weekly by Study 예시 데이터
    const [weeklyByStudy, setWeeklyByStudy] = useState<WeeklyByStudyChart[]>([]);

    const getStudyGoalByWeekly = async () => {
        const response = await dashboardApi.getWeeklyByStudy();
        if (response.code === 200) {
            const content = response.content;
            const items = content.map((study) => {
                return {
                    name: study.title,
                    data: [
                        study.num_ago_1_day,
                        study.num_ago_2_day,
                        study.num_ago_3_day,
                        study.num_ago_4_day,
                    ],
                };
            });
            setWeeklyByStudy(items);
        }
    };

    const createData = (
        study: string,
        name: string,
        dateOfBirth: string,
        enrollmentDate: string,
        roundInfo: number[],
        status: string
    ) => {
        return { study, name, dateOfBirth, enrollmentDate, roundInfo, status };
    };

    const getRecentParticipantLogs = async () => {
        const response = await dashboardApi.getRecentParticipantLogs();
        if (response.code === 200) {
            const content = response.content;
            const result = content.map((item) => {
                return createData(item.study_title, item.full_name, item.birthday, item.created_at, [item.number_answer, item.total_number_survey], item.participation_status);
            });
            setParticipantLogs(result);
        }
    };

    useEffect(() => {
        getNumberParticipant();
        getStudyGoalByWeekly();
        getRecentParticipantLogs();
    }, []);

    useEffect(() => {
        getStudyGoalByMonthly(studyGoalNo);
    }, [studyGoalNo]);

    const handleChangeStudyGoal = (e) => {
        const stdNo = String(e.target.value);
        setStudyGoalNo(stdNo);
        const findStudy = participantNumber.find((study) => String(study.std_no) == stdNo);

        if (findStudy) {
            setStudyGoal(findStudy);
            const percentage = (findStudy.number_participant / findStudy.target_number) * 100;
            setGoalPercentage(percentage);
        } else {
            setStudyGoal(null);
            setGoalPercentage(0);
        }
    };

    // Study Goal chart options
    const areaChartOptions: ApexOptions = {
        chart: {
            height: 200, // 차트의 높이를 설정합니다.
            type: 'line', // 차트 유형을 'line'으로 설정합니다.
            toolbar: {
                show: false, // 툴바를 숨깁니다.
            },
        },
        xaxis: {
            type: 'datetime',
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy',
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        stroke: {
            curve: 'smooth', // 곡선 형태의 선을 사용합니다.
            width: 2, // 선의 너비를 1로 설정합니다.
        },
    };

    //Weekly by Study 차트 옵션
    const stackedBarOptions: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: true,
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0,
                    },
                },
            },
        ],
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
                            fontWeight: 900,
                        },
                    },
                },
            },
        },
        xaxis: {
            type: 'category',
            categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        },
        legend: {
            position: 'top',
            offsetY: 0,
        },
        fill: {
            opacity: 1,
        },
        colors: [primary[900], primary[700], primary[400], primary[200], primary[100]],
    };

    const studyGoalChartOption: ApexOptions = areaChartOptions; // Study Goal 차트 옵션 상태를 관리합니다.
    const weeklyByStudyChartOption: ApexOptions = stackedBarOptions; //Weekly by Study 차트 옵션 상태를 관리합니다.

    const [goalPercentage, setGoalPercentage] = useState(0);

    const normalise = (value: number[]) => Math.ceil((value[0] / value[1]) * 100);
    
    return (
        <>
            <Grid container rowSpacing={2} columnSpacing={1} flexDirection="row">
                <Grid container item xs={12} justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h3">Dashboard</Typography>
                    </Box>
                    <Box>
                        <Button onClick={handleRefresh}>
                            {dayjs(loadedTime).format('YYYY-MM-DD hh:mm:ss')}{' '}
                            <SyncOutlined style={{ marginLeft: '0.5rem' }} />
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <MainCard sx={{ width: 1 }}>
                        <Typography variant="h5" mb={2}>
                            Number of participants by study
                        </Typography>
                        <Box>
                            <ParticipantNums participantNumber={participantNumber} />
                        </Box>
                    </MainCard>
                </Grid>

                <Grid item xs={6}>
                    <MainCard sx={{ height: '360px' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5">Study Goal</Typography>
                            <Select
                                onChange={handleChangeStudyGoal}
                                value={studyGoalNo}
                                size="small"
								sx={{maxWidth: "200px"}}
                            >
                                {participantNumber.map((study, index) => (
                                    <MenuItem key={index} value={String(study.std_no)}>
                                        {study.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Divider sx={{ margin: '0.5rem 0' }} />
                        <Box>
                            <Typography variant="h2" color="primary.darker" mt={2} ml={2}>
                                {goalPercentage} %
                            </Typography>
                            <ReactApexChart
                                options={studyGoalChartOption}
                                series={monthlyStudyGoalChart}
                                type="area"
                                height={200}
                            />
                        </Box>
                    </MainCard>
                </Grid>

                <Grid item xs={6}>
                    <MainCard sx={{ height: '360px' }}>
                        <Typography variant="h5">Weekly by Study</Typography>
                        <Box sx={{ marginTop: '26px' }}>
                            <ReactApexChart
                                type="bar"
                                options={weeklyByStudyChartOption}
                                series={weeklyByStudy}
                                height={250}
                            />
                        </Box>
                    </MainCard>
                </Grid>

                <Grid item xs={12}>
                    <MainCard>
                        <Typography variant="h5" mb={1}>
                            Recent participant logs
                        </Typography>

                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            'td, th': {
                                                borderBottom: `1px solid ${theme.palette.grey[400]}`,
                                            },
                                        }}
                                    >
                                        <TableCell>Study</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Date of Birth</TableCell>
                                        <TableCell>Enrollment Date</TableCell>
                                        <TableCell>Round Info.</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {participantLogs.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{
                                                'td, th': { borderBottom: `1px solid ${divider}` },
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.study}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.dateOfBirth}</TableCell>
                                            <TableCell>{row.enrollmentDate}</TableCell>
                                            <TableCell width="20%">
												<Box maxWidth="80%">
													<Tooltip title={row.roundInfo[0] + '/' + row.roundInfo[1]} arrow placement="top">
														<Box>
															<Typography color="primary" variant="body2">
																{normalise(row.roundInfo) + '%'}{' '}
															</Typography>
															<LinearProgress
																variant="determinate"
																value={normalise(row.roundInfo)}
															/>											
														</Box>
													</Tooltip>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </MainCard>
                </Grid>
            </Grid>

            {participantNumber.length === 0 && (
                <Box
                    sx={{
                        position: 'absolute',
						right:0,
						top:0,
						bottom:0,
						width: drawerOpen ? 'calc(100vw - 255px)' : '100vw',
                        background: 'rgba(255,255,255,0.8)',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                        }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        <Typography variant="h1">There are no studies created.</Typography>
                        <Typography variant="h1">
                            Start your project by creating a new Study.
                        </Typography>
                        <Box mt="2rem" display="flex" gap={1}>
                            <Button
                                size="large"
                                variant="contained"
                                onClick={() => navigate('/study/new')}
                            >
                                Go to Create Study
                            </Button>
                            <Button
                                size="large"
                                variant="contained"
                                onClick={() => navigate('/apply')}
                            >
                                Request a demo
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default DashboardDefault;
