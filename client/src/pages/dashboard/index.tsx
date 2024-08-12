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
} from '@mui/material';
import MainCard from '@/components/MainCard';
import dashboardApi from '@/apis/dashboard';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { NumOfParticipantByStudy } from '@/types/dashboard';
import ParticipantNums from './ParticipantNums';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import divider from 'antd/es/divider';
import { useNavigate } from 'react-router-dom';

const DashboardDefault = () => {
    const theme = useTheme();
    const { primary } = theme.palette;
    const [participantNumber, setParticipantNumber] = useState<NumOfParticipantByStudy[]>([]);
    const [loadedTime, setLoadedTime] = useState(new Date());

    const [studyGoal, setStudyGoal] = useState<NumOfParticipantByStudy | null>(null);
    const [studyGoalNo, setStudyGoalNo] = useState('');

    const navigate = useNavigate();

    const getNumberParticipant = async () => {
        const response = await dashboardApi.getNumOfParticipantByStudy();
        if (response.content) {
            const studies = response.content;
            setParticipantNumber(studies);

            const firstStudy = studies[0];
            setStudyGoal(firstStudy);
            setStudyGoalNo(String(firstStudy.std_no));

            const percentage = (firstStudy.number_participant / firstStudy.target_number) * 100;
            setGoalPercentage(percentage);
        }

        setLoadedTime(new Date());
    };

    const handleRefresh = () => {
        getNumberParticipant();
    };

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
                [dayjs('2024-08').valueOf(), 31],
            ],
        },
    ]);

    const getStudyGoalByMonthly = async (stdNo: string) => {
        // 근데 왜 이거 List임??? 1개 가져오는거 아닌가...
        // 스터디 번호를 주고 goal가져오는거 아닌가??
        const response = await dashboardApi.getStudyGoalByMonthly(stdNo);
        if (response.code === 200) {
            const firstItem = response.content.at(0);
            if (!firstItem) return;
            const content = [
                {
                    name: '참여자',
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
            setSeries(content);
        }
    };

    //Weekly by Study 예시 데이터
    const [series2, setSeries2] = useState([
        {
            name: 'Study A',
            data: [44, 55, 41, 67, 22, 43, 20],
        },
        {
            name: 'Study B',
            data: [13, 23, 20, 8, 13, 27, 40],
        },
        {
            name: 'Study C',
            data: [11, 17, 15, 15, 21, 14, 15],
        },
        {
            name: 'Study D',
            data: [21, 7, 25, 13, 22, 8, 4],
        },
    ]);

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
            setSeries2(items);
        } else {
            setSeries2([]);
        }
    };

    const getRecentParticipantLogs = async () => {
        const response = await dashboardApi.getRecentParticipantLogs();
    };

    useEffect(() => {
        getNumberParticipant();
        getStudyGoalByWeekly();
    }, []);

    useEffect(() => {
        getStudyGoalByMonthly(studyGoalNo);
    }, [studyGoalNo]);

    const handleChangeStudyGoal = (e) => {
        console.log(e.targer.value);
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

    const [options, setOptions] = useState<ApexOptions>(areaChartOptions); // Study Goal 차트 옵션 상태를 관리합니다.
    const [options2, setOptions2] = useState<ApexOptions>(stackedBarOptions); //Weekly by Study 차트 옵션 상태를 관리합니다.

    const [goalPercentage, setGoalPercentage] = useState(0);

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

    const normalise = (value: number[]) => Math.ceil((value[0] / value[1]) * 100);

    const rows = [
        createData(
            '레켐비 임상 4상',
            'Kate Brown',
            'Dec 10, 2000',
            'Jun 10, 2024',
            [3, 12],
            'In Progress'
        ),
        createData(
            '아토피 부작용 연구',
            'Daniel Heny',
            'Nov 20, 1999',
            'Jun 10, 2024',
            [12, 12],
            'Complete'
        ),
        createData(
            '레켐비 임상 4상',
            'Julia hose Yoon',
            'Oct 24, 1982',
            'Jun 10, 2024',
            [2, 12],
            'Pending'
        ),
        createData(
            '삭센다 임상 4상',
            'Clara dew Mio',
            'Mar 11, 1988',
            'Jun 10, 2024',
            [11, 12],
            'Approved'
        ),
        createData(
            '아토피 삶의 질 연구',
            'Lily Kim',
            'Jul 01, 1999',
            'Jun 10, 2024',
            [8, 12],
            'In Progress'
        ),
    ];

    return (
        <div style={{ position: 'relative' }}>
            <Grid item container rowSpacing={2} columnSpacing={1} flexDirection="row">
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
                        <Box width="100%" display="block" overflow="hidden">
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
                                options={options}
                                series={series}
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
                                options={options2}
                                series={series2}
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
                                    {rows.map((row) => (
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
                                                    <Typography color="primary" variant="body2">
                                                        {normalise(row.roundInfo) + '%'}{' '}
                                                    </Typography>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={normalise(row.roundInfo)}
                                                    />
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

            {/* 아래는 등록한 스터디가 없을 때 */}
            <Box
                sx={{
                    position: 'absolute',
                    left: '-24px',
                    top: '-24px',
                    right: '-24px',
                    bottom: '-24px',
                    background: 'rgba(255,255,255,0.8)',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '30%',
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
                        <Button size="large" variant="contained" onClick={() => navigate('/apply')}>
                            Request a demo
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default DashboardDefault;
