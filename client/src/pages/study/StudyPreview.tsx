import React from 'react';
import { Container, Box, Typography, Grid, Button, Link, ListItem, Card } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material';
import MainCard from '@/components/MainCard';
import { surveyCycle, surveyCycleEn } from '@/types/study';
import { useTranslation } from 'react-i18next';

const StudyPreviewPage = () => {
    const theme = useTheme();
    const { divider, primary } = theme.palette;
    const navigate = useNavigate();
    const location = useLocation();
	const { t, i18n } = useTranslation();
    const studyDetail = location.state?.studyDetail;

    console.log('studyDetail: ', studyDetail);

    const handleEditClick = () => {
        navigate('/study/new', { state: { mode: 'edit', stdNo: studyDetail.std_no } });
    };

    const getMemberNames = (privilege) => {
        const members = studyDetail.managerList.filter(
            (member) => member.std_privilege === privilege
        );
        if (members.length === 0) return t('study.none');

        const names = members.map((member) => `${member.first_name} ${member.last_name}`);
        return names.length > 1 ? `${names[0]} ${t('study.and')} ${names.length - 1}${t('study.other_person')}` : names[0];
    };

    return (
        <Container>
            <Typography variant="h2" mb={2}>
                {t('common.preview')}
				{/* 미리보기 */}
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
								{/* 제목 */}
                                <Typography variant="h5">{t('study.title')}</Typography>
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
								{/* 대상인원 */}
                                <Typography variant="h5">{t('study.target_number')}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography>{studyDetail.target_number} {t('study.person')}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
								{/* 개요 */}
                                <Typography variant="h5">{t('study.summary')}</Typography>
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
								{/* 질환 */}
                                <Typography variant="h5">{t('study.disease')}</Typography>
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
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem', maxWidth: '100px' }} gap={0.5}>
							{/* 의약품 정보 */}
                                <Typography variant="h5">{t('study.pharmaceutical_information')}</Typography>
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
											{/* 제품명 */}
                                            <li>{t('study.product_name')} : {studyDetail.drug_manufacturer_name}</li>
											{/* 업체명 */}
                                            <li>{t('study.company_name')} : {studyDetail.drug_brand_name}</li>
											{/* 품목기준코드 */}
                                            <li>{t('study.item_standard_code')} : {studyDetail.drug_code}</li>
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
                                    <Typography>
										{t('study.none')}
										{/* 없음 */}
									</Typography>
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
																i18n.language === 'en' ? 
																<>
																	{t('study.repeat')} { surveySet.number_in_cycle === 1 ? 'once a' : surveySet.number_in_cycle + t('study.time_per') } {surveyCycleEn[surveySet.survey_cycle]}
																</>
																:
																<>
																	{surveyCycle[surveySet.survey_cycle]}{t('study.repeat')}{' '}
																	{surveySet.number_in_cycle}{t('study.time_per')}
																</>
															}	           
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
                                    <Typography>
										{t('study.none')}
										{/* 없음 */}
									</Typography>
                                    <Typography variant="body2" color="error">
										{t('study.make_sure_connect')}
                                        {/* * Study 배포전에 반드시 업로드해주세요. */}
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem', maxWidth: '150px' }} gap={0.5}>
                                <Typography variant="h5">{t('study.eic')}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                {studyDetail.eic_name ? (
                                    <Typography>{studyDetail.eic_name}</Typography>
                                ) : (
                                    <>
                                        <Typography>{t('study.none')}</Typography>
                                        <Typography variant="body2" color="error">
											{t('study.make_sure_connect')}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">{t('study.members')}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li>
                                    <Typography>
										{t('study.owner_permission')}
                                        {/* Owner (Study의 생성, 수정, 배포, 멤버 초대) :{' '} */}
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
									{t('study.maintainer')}
                                        {/* Maintainer (Study의 수정, 멤버 초대) :{' '} */}
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
										{t('study.developer')}
                                        {/* Developer (Study 조회) :{' '} */}
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
					{t('common.edit')}
                    {/* 수정 */}
                </Button>
                <Button variant="outlined" onClick={() => navigate('/study')}>
					{t('common.list')}
                    {/* 목록 */}
                </Button>
            </Box>
        </Container>
    );
};

export default StudyPreviewPage;
