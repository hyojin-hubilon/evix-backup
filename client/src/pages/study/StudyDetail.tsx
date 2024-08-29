import Breadcrumbs2 from '@/components/@extended/Breadcrumbs2';
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Box, Button, Chip, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ApexDonutChartSeriesType } from './components/overview/CircleChart';
import StudyOverView from './components/StudyOverview';
import StudyInfo from './components/StudyInfo';
import StudyParticipants from './components/StudyParicipations';
import { useParams } from 'react-router-dom';
import studyApi from '@/apis/study';
import { STUDY_STATUS, STUDY_STATUS_KEY } from './components/StudyListItem';
import { ParticipationRateByAge, totalParticipants } from '@/types/study';

const StudyDetail = () => {
    const { stdNo } = useParams<{ stdNo: string | undefined }>();

    const [studyDetail, setStudyDetail] = useState<any>();

    console.log('studyDetail: ', studyDetail);

    const [totalParticipants, setTotalParticipants] = useState<totalParticipants | null>(null);
    const [participationRateByAge, setParticipationRateByAge] =
        useState<ParticipationRateByAge | null>(null);

    useEffect(() => {
        if (stdNo) {
            const stdNoParsed = parseInt(stdNo, 10);

            fetchStudyDetail(stdNoParsed);
            fetchTotalParticipants(stdNoParsed);
            fetchOverviewByAge(stdNoParsed);
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

    const [activeTab, setActiveTab] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setActiveTab(newValue);
    };

    const partCompleteRate: ApexDonutChartSeriesType = {
        labels: ['참여완료율', '미완료율'],
        series: totalParticipants
            ? [
                  totalParticipants.participation_late * 100,
                  100 - totalParticipants.participation_late * 100,
              ]
            : [0, 100],
    };

    const statusLabel = STUDY_STATUS[studyDetail?.std_status as STUDY_STATUS_KEY];
    const owner = studyDetail?.managerList?.find(
        (manager: any) => manager.std_privilege === 'OWNER'
    );

    return (
        <>
            <Breadcrumbs2 />
            <Grid container rowSpacing={3} columnSpacing={1}>
                <Grid container item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Chip label={statusLabel} color="primary" />
                        <Typography variant="h3">{studyDetail?.title || ''}</Typography>
                        <Button variant="outlined" sx={{ width: '3rem', minWidth: '48px' }}>
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
                        />
                    )}
                {studyDetail && activeTab === '1' && <StudyInfo studyDetail={studyDetail} ownerId={owner.user_no}/>}
                {studyDetail && activeTab === '2' && <StudyParticipants />}
            </Grid>
        </>
    );
};

export default StudyDetail;
