import { PlusOutlined } from '@ant-design/icons';
import {
    Grid,
    Box,
    Typography,
    Chip,
    Container,
    Tabs,
    Tab,
    Button,
    IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SurveyListItem from './components/SurveyListItem';
import surveyApi from '@/apis/survey';
import { MySurveyList, SurveyApiResponse } from '@/types/survey';
import { useNavigate } from 'react-router-dom';
import { getDecodedToken } from '@/utils/Cookie';

const SurveyList = () => {
    const [surveyCount, setSurveyCount] = useState<number>(0); // Survey 개수 상태
    const [activeTab, setActiveTab] = useState<string>('0'); // 활성 탭 상태
    const [surveyList, setSurveyList] = useState<MySurveyList[]>([]); // 내 Survey 목록 상태
    const navigate = useNavigate();

	const decodedToken = getDecodedToken('userInfoToken');
	const userNo = decodedToken['user-no'];

    // Surrvey 데이터 불러오기
    const fetchSurvey = async () => {
        try {
            const response: SurveyApiResponse = await surveyApi.mySurveyList(1, 100, 'latest'); // TODO: 창덕님께 수정 요청(페이징 필요 없음) OrderBy에 들어가야하는 내용은?
            if (response.result && response.code === 200) {
                const studyList = response.content?.surveyMyList ?? [];
                setSurveyList(studyList);
                setSurveyCount(studyList.length);
            }
        } catch (error) {
            console.error('Failed to fetch study list:', error);
        }
    };

    
    useEffect(() => {
        fetchSurvey();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setActiveTab(newValue);
    };

    const handleCreateSurvey = () => {
        navigate('/survey/new');
    };

    return (
        <Container maxWidth="lg">
            <Grid container rowSpacing={3} columnSpacing={2.75}>
                <Grid container item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h3">Survey 목록</Typography>
                        <Chip label={surveyCount} color="primary" size="small" />
                    </Box>
                </Grid>

                {surveyCount !== 0 ? (
                    <>
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
                                    aria-label="survey-status-tab"
                                >
                                    <Tab label="전체" value="0" />
                                    <Tab label="내 설문" value="1" />
                                    <Tab label="작성중 설문" value="2" />
                                    <Tab label="참여중인 Study 설문" value="3" />
                                </Tabs>
                            </Grid>
                            <Grid container item xs={2} justifyContent="flex-end">
                                <Button variant="contained" onClick={handleCreateSurvey}>
                                    <PlusOutlined />
                                    <Typography sx={{ ml: 1 }}>Survey 생성</Typography>
                                </Button>
                            </Grid>
                        </Grid>

                        {surveyList
                            // .filter((survey) => { //전체/ 내가 작성한 설문/ 참여설문 api 따로
                            //     if (activeTab === '0') return true;
                            //     if (activeTab === '1' && survey.created_user_no === userNo)
                            //         return true;
                            //     if (activeTab === '2' && survey.created_user_no === userNo) //status 추가되어야함
                            //         return true;
                            //     if (activeTab === '3' && survey.created_user_no !== userNo)
                            //         return true;
                            //     return false;
                            // })
                            .map((survey) => (
                                <Grid item xs={12} key={survey.survey_no}>
                                    <SurveyListItem survey={survey} userNo={userNo} /> 
                                </Grid>
                            ))}
                    </>
                ) : (
                    <>
                        <Grid
                            container
                            item
                            xs={12}
                            alignItems="center"
                            justifyContent="center"
                            sx={{ pb: 4, borderBottom: 1, borderColor: 'divider' }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <IconButton color="primary" onClick={handleCreateSurvey}>
                                    <PlusOutlined />
                                </IconButton>
                                <Typography
                                    sx={{
                                        mt: 1,
                                        cursor: 'pointer',
                                        '&:hover': { textDecoration: 'underline' },
                                    }}
                                    color="primary"
                                    variant="h5"
                                    onClick={handleCreateSurvey}
                                >
                                    Survey 생성
                                </Typography>
                            </Box>
                        </Grid>
                    </>
                )}

                
            </Grid>
        </Container>
    );
};

export default SurveyList;
