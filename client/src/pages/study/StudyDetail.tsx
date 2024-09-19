import Breadcrumbs2 from '@/components/@extended/Breadcrumbs2';
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Box, Button, Chip, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { ApexDonutChartSeriesType } from './components/overview/CircleChart';
import StudyOverView from './components/StudyOverview';
import StudyInfo from './components/StudyInfo';
import StudyParticipants from './components/StudyParicipations';
import { useNavigate, useParams } from 'react-router-dom';
import studyApi from '@/apis/study';
import { STUDY_STATUS, STUDY_STATUS_KEY, TitleStatusIcon } from './components/StudyListItem';
import { ParticipantsList, ParticipationRateByAge, totalParticipants } from '@/types/study';
import dayjs from 'dayjs';
import { t } from 'i18next';

const StudyDetail = () => {
    const { stdNo } = useParams<{ stdNo: string | undefined }>();

    const [studyDetail, setStudyDetail] = useState<any>();

    const [totalParticipants, setTotalParticipants] = useState<totalParticipants | null>(null);
    const [participationRateByAge, setParticipationRateByAge] =
        useState<ParticipationRateByAge | null>(null);
    const [participantList, setParticipantList] = useState<ParticipantsList[]>([]);
    const [recentParticipantList, setRecentParticipantList] = useState<ParticipantsList[]>([]);
    const [participationRateByPeriod, setParticipationRateByPeriod] = useState<any>();

    const navigate = useNavigate();
	const theme = useTheme();
	const { stdStatus } = theme.palette;
	const today = dayjs().format('YYYY-MM-DD');

    useEffect(() => {
        if (stdNo) {
            const stdNoParsed = parseInt(stdNo, 10);

            fetchStudyDetail(stdNoParsed);
            fetchTotalParticipants(stdNoParsed);
            fetchOverviewByAge(stdNoParsed);
            fetchParticipantsList(stdNoParsed);
            fetchRecentParticipantList(stdNoParsed);
            fetchOverviewByPeriod(stdNoParsed, 'WEEK');
        }
    }, [stdNo]);

    const fetchStudyDetail = async (stdNo: number) => {
        try {
            const response = await studyApi.getStudyDetail(stdNo);
            setStudyDetail(response.content);
            if (response.content.std_status === 'STD-CREATED') setActiveTab('1');
        } catch (error) {
            console.error('Failed to Fetch study detail: ', error);
        }
    };

    const fetchTotalParticipants = async (stdNo: number) => {
        try {
            const response = await studyApi.getTotalParticipants(stdNo);
            setTotalParticipants(response.content as totalParticipants);
        } catch (error) {
            console.error('Failed to fetch total participants: ', error);
        }
    };

    const fetchOverviewByAge = async (stdNo: number) => {
        try {
            const response = await studyApi.getParticipationRateByAge(stdNo);
            setParticipationRateByAge(response.content as ParticipationRateByAge);
        } catch (error) {
            console.error('Failed to fetch participation rate by age: ', error);
        }
    };

    const fetchParticipantsList = async (stdNo: number) => {
        try {
            const response = await studyApi.participantList(stdNo);

            setParticipantList(response.content as ParticipantsList[]);
            // setParticipantList([
            //     {
            //         'std_no': 3,
            //         'participant_no': 1,
            //         'std_privilege': 'PARTICIPANT',
            //         'full_name': '이*덕',
            //         'gender': 'male',
            //         'birthday': 'Jun 24, 2000',
            //         'age': 1,
            //         'number_answer': 1,
            //         'allotment_agency_name': '대웅제약',
            //         'total_number_survey': 400,
            //         'participation_status': 'PROGRESS',
            //     },
            //     {
            //         'std_no': 3,
            //         'participant_no': 2,
            //         'std_privilege': 'PARTICIPANT',
            //         'full_name': '이*진',
            //         'gender': 'male',
            //         'birthday': 'Jun 24, 2000',
            //         'age': 15,
            //         'number_answer': 2,
            //         'allotment_agency_name': '보령제약',
            //         'total_number_survey': 400,
            //         'participation_status': 'PROGRESS',
            //     },
            //     {
            //         'std_no': 3,
            //         'participant_no': 3,
            //         'std_privilege': 'PARTICIPANT',
            //         'full_name': '박*영',
            //         'gender': 'male',
            //         'birthday': 'Jun 24, 2000',
            //         'age': 31,
            //         'number_answer': 2,
            //         'allotment_agency_name': '보령제약',
            //         'total_number_survey': 400,
            //         'participation_status': 'COMPLETE',
            //     },
            // ]);
        } catch (error) {
            console.error('Failed to fetch participants list: ', error);
        }
    };

    const fetchRecentParticipantList = async (stdNo: number) => {
        try {
            const response = await studyApi.recentParticipantLogs(stdNo);
            setRecentParticipantList(response.content as ParticipantsList[]);
            // setRecentParticipantList([
            //     {
            //         'std_no': 3,
            //         'participant_no': 1,
            //         'std_privilege': 'PARTICIPANT',
            //         'full_name': '이*덕',
            //         'gender': 'male',
            //         'birthday': 'Jun 24, 2000',
            //         'age': 1,
            //         'number_answer': 1,
            //         'allotment_agency_name': '대웅제약',
            //         'total_number_survey': 400,
            //         'participation_status': 'PROGRESS',
            //     },
            //     {
            //         'std_no': 3,
            //         'participant_no': 3,
            //         'std_privilege': 'PARTICIPANT',
            //         'full_name': '박*영',
            //         'gender': 'male',
            //         'birthday': 'Jun 24, 2000',
            //         'age': 31,
            //         'number_answer': 2,
            //         'allotment_agency_name': '보령제약',
            //         'total_number_survey': 400,
            //         'participation_status': 'COMPLETE',
            //     },
            // ]);
        } catch (error) {
            console.error('Failed to fetch participants list: ', error);
        }
    };

    const fetchOverviewByPeriod = async (stdNo: number, periodType: 'WEEK' | 'MONTH' | 'YEAR') => {
        try {
            const response = await studyApi.participantCountByPeriod(stdNo, periodType);
            setParticipationRateByPeriod(response.content);
        } catch (error) {
            console.error('Failed to fetch participation rate by period: ', error);
        }
    };

    const [activeTab, setActiveTab] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setActiveTab(newValue);
    };

    const handlePeriodChange = (newPeriod: 'WEEK' | 'MONTH' | 'YEAR') => {
        console.log('handlePeriodChange newPeriod :: ', newPeriod);
        if (stdNo) {
            fetchOverviewByPeriod(parseInt(stdNo, 10), newPeriod);
        }
    };

    console.log('totalParticipants:: ', totalParticipants);
    const partCompleteRate: ApexDonutChartSeriesType = {
        labels: [t('study.completion_rate'), t('study.incomplete_rate')], //"참여완료율","미완료율"
        series: totalParticipants
            ? [totalParticipants.participation_late, 100 - totalParticipants.participation_late]
            : [0, 100],
    };

    const statusLabel = STUDY_STATUS[studyDetail?.std_status as STUDY_STATUS_KEY];
    const owner = studyDetail?.managerList?.find(
        (manager: any) => manager.std_privilege === 'OWNER'
    );

    const handleEditClick = (std_no: number) => {
        navigate('/study/new', { state: { mode: 'edit', stdNo: std_no } });
    };

    return (
        <>
            <Breadcrumbs2 sub={studyDetail?.title} />
            <Grid container rowSpacing={3} columnSpacing={1}>
                <Grid container item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Chip
                            label={
                                <>
                                    <TitleStatusIcon
                                        status={studyDetail?.std_status}
                                        color="white"
                                    />{' '}
                                    {statusLabel}
                                </>
                            }
                            sx={{
								bgcolor: stdStatus.new,
                                ...(studyDetail?.std_status === 'STD-PROGRESSION' && {
                                    bgcolor: stdStatus.ongoing,
                                }), //Ongoing
                                ...(studyDetail?.std_status === 'STD-DONE' && {
                                    bgcolor: stdStatus.completed,
                                }), //Completed
                                ...(studyDetail?.endDate < today &&
                                    'STD-Expired' && {
                                        bgcolor: stdStatus.expired,
                                    }), //Expired
								color: 'white'
							}}
							
                        />
                        <Typography variant="h3">{studyDetail?.title || ''}</Typography>
                        <Button
                            variant="outlined"
                            sx={{ width: '3rem', minWidth: '48px' }}
                            onClick={() => {
                                handleEditClick(studyDetail.std_no);
                            }}
                        >
                            <EditOutlined style={{ fontSize: '1.2rem' }} />
                        </Button>
                    </Box>
                </Grid>

                <Grid
                    container
                    item
                    xs={12}
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                    alignItems="center"
                >
                    <Grid item xs={10}>
                        <Tabs
                            value={activeTab}
                            onChange={handleChange}
                            aria-label="Study Status Tab"
                        >
                            {/* 스터디 결과 요약 정보 */}
                            {studyDetail?.std_status !== 'STD-CREATED' && (
                                <Tab label="Overview " value="0" />
                            )}
                            {/* 스터디 개요, 연결/과금정보, 멤버관리 */}
                            <Tab label="Study Info " value="1" />
                            {/* 설문 참여자 상세 리스트 */}
                            {studyDetail?.std_status !== 'STD-CREATED' && (
                                <Tab label="Participants " value="2" />
                            )}
                            {/* 설문 결과 상세 */}
                            {studyDetail?.std_status !== 'STD-CREATED' && (
                                <Tab label="Survey Report" value="3" />
                            )}
                        </Tabs>
                    </Grid>
                    <Grid container item xs={2} justifyContent="flex-end">
                        {owner && (
                            <Box display="flex" gap={1}>
                                <Avatar
                                    alt={owner.profile_image_name || 'profile'}
                                    src={owner.profile_image_url || ''}
                                />
                                <Box>
                                    <Typography variant="caption" sx={{ mb: '0' }}>
                                        Owner
                                    </Typography>
                                    <Typography color="primary">
                                        {`${owner.first_name} ${owner.last_name}`}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                </Grid>
                {studyDetail &&
                    activeTab === '0' &&
                    totalParticipants &&
                    participationRateByAge && (
                        <StudyOverView
                            partCompleteRate={partCompleteRate}
                            totalParticipants={totalParticipants}
                            participationRateByAge={participationRateByAge}
                            participantList={recentParticipantList}
                            participationRateByPeriod={participationRateByPeriod}
                            onPeriodChange={handlePeriodChange}
                            onMoreClick={() => setActiveTab('2')} // 최근 참여자 More 버튼 클릭 시 Participants 탭으로 이동
                        />
                    )}
                {studyDetail && activeTab === '1' && (
                    <StudyInfo
                        studyDetail={studyDetail}
                        ownerId={owner.user_no}
                        onSurveyClose={() => fetchStudyDetail(parseInt(stdNo!, 10))}
                    />
                )}
                {studyDetail && activeTab === '2' && (
                    <StudyParticipants participantList={participantList} />
                )}
            </Grid>
        </>
    );
};

export default StudyDetail;
