import React from 'react';
import { Container, Box, Typography, Grid, Button, Link, ListItem, Card } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material';
import MainCard from '@/components/MainCard';
import { surveyCycle } from '@/types/study';

const StudyDetailPage = () => {
    const theme = useTheme();
    const { divider, primary } = theme.palette;
    const navigate = useNavigate();
    const location = useLocation();

    const studyDetail = location.state?.studyDetail;

    console.log('studyDetail: ', studyDetail);

    const handleEditClick = () => {
        navigate('/study/new', { state: { mode: 'edit', stdNo: studyDetail.std_no } });
    };

    const getMemberNames = (privilege) => {
        const members = studyDetail.managerList.filter(
            (member) => member.std_privilege === privilege
        );
        if (members.length === 0) return '없음';

        const names = members.map((member) => `${member.first_name} ${member.last_name}`);
        return names.length > 1 ? `${names[0]} 외 ${names.length - 1}명` : names[0];
    };

    return (
        <Container>
            <Typography variant="h2" mb={2}>
                미리보기
            </Typography>
            <Box
                sx={{
                    p: '1rem',
                    borderRadius: '1rem',
                    border: `1px solid ${divider}`,
                    backgroundColor: '#fff',
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    gap={2}
                    sx={{ p: '1rem' }}
                >
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">Study Type</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography>{studyDetail.std_type}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">제목</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography>{studyDetail.title}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">대상인원</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography>{studyDetail.target_number} 명</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">개요</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography>{studyDetail.description}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">질환</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography>{studyDetail.disease}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">의약품 정보</Typography>
                            </Box>
                        </Grid>
                        {studyDetail.drug_code ? (
                            <Grid item xs={9}>
                                <Box>
                                    <Card
                                        sx={{
                                            backgroundColor: theme.palette.grey[100],
                                            boxShadow: 'none',
                                            padding: '0.5rem 1rem 0.5rem 0.5rem',
                                            mt: '0.5rem',
                                        }}
                                    >
                                        <ul
                                            style={{
                                                margin: 0,
                                                paddingLeft: '1.5rem',
                                                listStyle: 'disc',
                                            }}
                                        >
                                            <li>제품명: {studyDetail.drug_manufacturer_name}</li>
                                            <li>업체명: {studyDetail.drug_brand_name}</li>
                                            <li>품목기준코드: {studyDetail.drug_code}</li>
                                        </ul>
                                    </Card>
                                </Box>
                            </Grid>
                        ) : (
                            <Grid item xs={9}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{ pt: '0.2rem' }}
                                    gap={0.5}
                                >
                                    <Typography>없음</Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">Survey</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            {studyDetail.studySurveySetList &&
                            studyDetail.studySurveySetList.length > 0 ? (
                                <MainCard sx={{ height: '100%' }}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{ pt: '0.2rem' }}
                                        gap={0.5}
                                    >
                                        {studyDetail.studySurveySetList &&
                                            studyDetail.studySurveySetList.length > 0 &&
                                            studyDetail.studySurveySetList.map((surveySet) =>
                                                surveySet.surveyList.map((survey) => (
                                                    <ListItem key={survey.survey_no}>
                                                        <Box display="flex" gap={1}>
                                                            <Link>{survey.title}</Link>
                                                            <Typography>
                                                                {
                                                                    surveyCycle[
                                                                        surveySet.survey_cycle
                                                                    ]
                                                                }
                                                                마다 {surveySet.number_in_cycle}회
                                                                반복
                                                            </Typography>
                                                        </Box>
                                                    </ListItem>
                                                ))
                                            )}
                                    </Box>
                                </MainCard>
                            ) : (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{ pt: '0.2rem' }}
                                    gap={0.5}
                                >
                                    <Typography>없음</Typography>
                                    <Typography variant="body2" color="error">
                                        * Study 배포전에 반드시 업로드해주세요.
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">EIC(전자동의서)</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                {studyDetail.eic_name ? (
                                    <Typography>{studyDetail.eic_name}</Typography>
                                ) : (
                                    <>
                                        <Typography>없음</Typography>
                                        <Typography variant="body2" color="error">
                                            * Study 배포전에 반드시 업로드해주세요.
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">멤버</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li>
                                    <Typography>
                                        Owner (Study의 생성, 수정, 배포, 멤버 초대) :{' '}
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                color: primary.main,
                                            }}
                                        >
                                            {getMemberNames('OWNER')}
                                        </span>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        Maintainer (Study의 수정, 멤버 초대) :{' '}
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                color: primary.main,
                                            }}
                                        >
                                            {getMemberNames('MAINTAINER')}
                                        </span>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        Developer (Study 조회) :{' '}
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                color: primary.main,
                                            }}
                                        >
                                            {getMemberNames('DEVELOPER')}
                                        </span>
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={handleEditClick}
                >
                    수정
                </Button>
                <Button variant="outlined" onClick={() => navigate('/study')}>
                    목록
                </Button>
            </Box>
        </Container>
    );
};

export default StudyDetailPage;
