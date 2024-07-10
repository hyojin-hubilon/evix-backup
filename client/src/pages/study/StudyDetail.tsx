import Breadcrumbs2 from '@/components/@extended/Breadcrumbs2';
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Box, Button, Chip, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import aImage1 from '@assets/images/users/avatar-1.png';
import { ApexDonutChartSeriesType } from './components/overview/CircleChart';
import StudyOverView from './components/StudyOverview';
import StudyInfo from './components/StudyInfo';
import StudyParticipants from './components/StudyParicipations';
import { useParams } from 'react-router-dom';
import studyApi from '@/apis/study';
import { STUDY_STATUS, STUDY_STATUS_KEY } from './components/StudyListItem';

const StudyDetail = () => {
    const { std_no } = useParams<{ std_no: any }>();

    const [studyDetail, setStudyDetail] = useState<any>('');

    useEffect(() => {
        const fetchStudyDetail = async () => {
            const response = await studyApi.getStudyDetail(parseInt(std_no, 10));

            setStudyDetail(response.content);
        };

        fetchStudyDetail();
    }, [std_no]);

    const [activeTab, setActiveTab] = useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setActiveTab(newValue);
    };

    const partCompleteRate: ApexDonutChartSeriesType = {
        labels: ['참여완료율', '미완료율'],
        series: [75, 25],
    };
    const statusLabel = STUDY_STATUS[studyDetail.std_status as STUDY_STATUS_KEY];

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
                            <Tab label="Overview " value="0" />
                            {/* 스터디 개요, 연결/과금정보, 멤버관리 */}
                            <Tab label="Study Info " value="1" />
                            {/* 설문 참여자 상세 리스트 */}
                            <Tab label="Participants " value="2" />
                            {/* 설문 결과 상세 */}
                            <Tab label="Survey Report" value="3" />
                        </Tabs>
                    </Grid>
                    <Grid container item xs={2} justifyContent="flex-end">
                        <Box display="flex" gap={1}>
                            <Avatar alt="Remy Sharp" src={aImage1} />
                            <Box>
                                <Typography variant="caption" sx={{ mb: '0' }}>
                                    Owner
                                </Typography>
                                <Typography color="primary">Ben Kim</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {activeTab == '0' && <StudyOverView partCompleteRate={partCompleteRate} />}
                {activeTab == '1' && <StudyInfo studyDetail={studyDetail} />}
                {activeTab == '2' && <StudyParticipants />}
            </Grid>
        </>
    );
};

export default StudyDetail;
