import authApi from '@/apis/auth';
import { ResCommonError } from '@/apis/axios-common';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { Button, Container, Grid, Box, Typography, styled } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const InviteStudy = () => {
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();
    const { t } = useTranslation();
	const confirm = useConfirmation();

    const toApplyPage = () => {
        navigate('/apply');
    };

    const Section03H2 = styled('h2')(({ theme }) => ({
        [theme.breakpoints.up('xs')]: {
            fontSize: '2rem',
            marginBottom: '1rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '3rem',
            marginBottom: '1.8rem',
        },
        color: '#222',
    }));

    const Section03H4 = styled('h4')(({ theme }) => ({
        [theme.breakpoints.up('xs')]: {
            fontSize: '1rem',
            marginBottom: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.5rem',
            marginBottom: '2.813rem',
        },
        color: '#1881ff',
        fontWeight: 600,
    }));

    const Section03P = styled('p')(({ theme }) => ({
        [theme.breakpoints.up('xs')]: {
            fontSize: '0.9rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.1rem',
        },
        lineHeight: 1.56,
        color: '#222',
    }));

    const SpanStyled = styled('span')(({ theme }) => ({
        [theme.breakpoints.up('xs')]: {
            display: 'inline',
        },
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    }));

    useEffect(() => {
        const handleVerifyInviteToken = async (token: string) => {
            try {
                const response = await authApi.verifyInviteToken(token);
                if (response.code === 200) {
                    // 토큰 유효 > 회원가입이 되어있는 유저, 스터디 초대 완료
					confirm({
						description: response.message ? response.message : "스터디 초대가 완료되었습니다.",
						variant: 'info'
					})
					.then(() => { 
						navigate('/study');
					});
                    
                    return;
                }
                if (response.code === 404) {
                    // 토큰 유효 > 회원가입이 안되어있는 유저, 회원가입으로 이동
					confirm({
						description: response.message ? response.message : "회원가입을 먼저 진행해주십시오.",
						variant: 'info'
					})
					.then(() => { 
						navigate('/register', { state: { token } });
					});
                    return;
                }
                if (response.code === 208 || response.code === 401) {
                    // 208 : 토큰 유효 > 토큰이 이미 사용된 경우
                    // 401 : 토큰 유효시간 만료
					confirm({
						description: response.message ? response.message : "토큰이 만료되었습니다.",
						variant: 'info'
					})
					.then(() => { 
						navigate('/');
					});
                    return;
                }
            } catch (error) {
                // 토큰 조작, 에러
                const e = error as ResCommonError;
                if (e) {
					confirm({
						description: e.message ? e.message : "에러가 발생했습니다.",
						variant: 'info'
					})
					.then(() => { 
						navigate('/');
					});   
                }
            }
        };
        handleVerifyInviteToken(token ?? '');
    }, []);

    // 그냥 랜딩처럼 보이게 하려고 했음
    // 랜딩페이지 아님.
    return (
        <Box className="landing" sx={{ bgcolor: 'white' }}>
            {/* Section 01*/}
            <Box className="section section-01">
                <Container maxWidth="xl">
                    <Typography
                        variant="h1"
                        sx={{
                            color: '#f3f3f3',
                            fontWeight: 600,
                            lineHeight: 1.16,
                            fontSize: {
                                lg: '4.625rem',
                                md: ' 3rem',

                                xs: '2rem',
                            },
                            pt: {
                                lg: '14.125rem',
                                md: '10rem',
                                sm: '5rem',
                                xs: '3rem',
                            },
                        }}
                    >
                        {t('landing.make_the_world')}
                        <br />
                        {t('landing.with_data')}
                    </Typography>
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: { md: '1.1rem', xs: '1rem' },
                            pt: {
                                md: '3.625rem',
                                xs: '2rem',
                            },
                            pb: {
                                lg: '26.75rem',
                                md: '10rem',
                                xs: '5rem',
                            },
                            fontWeight: 300,
                            lineHeight: 1.56,
                        }}
                    >
                        {t('landing.initiation_of_a')}
                        <br />
                        {t('landing.join_us_with')}
                    </Typography>
                </Container>
            </Box>

            {/* Section 02*/}
            <Box className="section section-02">
                <Container sx={{ pb: { md: '6.5rem', xs: '5rem' } }} maxWidth="xl">
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: {
                                    md: '3rem',
                                    xs: '2rem',
                                },
                                color: '#017eff',
                                pt: {
                                    md: '8.3rem',
                                    xs: '5rem',
                                },
                            }}
                        >
                            It increases the reliability
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: {
                                    md: '3rem',
                                    xs: '2rem',
                                },
                            }}
                        >
                            of the clinical trial results.
                        </Typography>
                        <Typography
                            sx={{
                                mt: {
                                    xs: '2rem',
                                    md: '3.688rem',
                                },
                                px: {
                                    xs: '2rem',
                                    md: '0',
                                },
                                fontSize: {
                                    xs: '0.9rem',
                                    md: '1.1rem',
                                },
                            }}
                        >
                            <SpanStyled>evix-DCT platform is </SpanStyled>
                            <SpanStyled>
                                It provides optimized collaborative tools for researchers to
                                conveniently analyze{' '}
                            </SpanStyled>
                            <SpanStyled>
                                and report collected clinical data, It provides noise removal in
                                conjunction with medical mydata,{' '}
                            </SpanStyled>
                            <SpanStyled>
                                linkage analysis and learning using medical big data.
                            </SpanStyled>
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* Section 03*/}
            <Box className="section section-03">
                <Box
                    sx={{
                        bgcolor: '#f7f9ff',
                        p: {
                            xs: '2rem',
                            md: '5rem',
                        },
                    }}
                >
                    <Container maxWidth="xl">
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            gap={{ sm: 10, lg: 12 }}
                        >
                            <Grid item xs={12} sm={6} lg={4}>
                                <Section03H2>ePRO</Section03H2>
                                <Section03H4>Electronic Patient-Reported Outcomes</Section03H4>
                                <Section03P>
                                    <SpanStyled>
                                        It provides important data points in clinical trials,{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        Provides key information for treatment effectiveness{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        and safety evaluation. Real-time data collection,{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        improved data accuracy, increased patient engagement,{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        There is a reduction in research costs, etc.
                                    </SpanStyled>
                                </Section03P>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box
                    sx={{
                        p: {
                            xs: '2rem',
                            md: '5rem',
                        },
                    }}
                >
                    <Container maxWidth="xl">
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            gap={{ sm: 10, lg: 12 }}
                            sx={{
                                flexDirection: {
                                    xs: 'column-reverse',
                                    sm: 'row',
                                },
                            }}
                        >
                            <Grid item xs={12} sm={6} lg={4}>
                                <Section03H2>eCOA</Section03H2>
                                <Section03H4>Electronic Clinical Outcome Assessments</Section03H4>
                                <Section03P>
                                    <SpanStyled>
                                        including not only patients but also observations of{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        healthcare providers and researchers Provides{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        comprehensive data. Improvement in accuracy and{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        reliability of data collection, reduction in errors{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        in paper-based data collection,real-time monitoring{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        and analysis, and increased patient engagement.
                                    </SpanStyled>
                                </Section03P>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box
                    sx={{
                        bgcolor: '#f7f9ff',
                        p: {
                            xs: '2rem',
                            md: '5rem',
                        },
                    }}
                >
                    <Container maxWidth="xl">
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            gap={{ sm: 10, lg: 12 }}
                        >
                            <Grid item xs={12} sm={6} lg={4}>
                                <Section03H2>eCRF</Section03H2>
                                <Section03H4>Electronic case report form</Section03H4>
                                <Section03P>
                                    <SpanStyled>
                                        It provides a variety of functions, including data
                                        collection,{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        verification, reporting, and more, increasing data accuracy{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        and reducing errors in data input and processing.{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        The system allows you to enter data directly, modify it if{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        necessary, and improve the quality of relevant data.
                                    </SpanStyled>
                                </Section03P>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Box
                    sx={{
                        p: {
                            xs: '2rem',
                            md: '5rem',
                        },
                    }}
                >
                    <Container maxWidth="xl">
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            gap={{ sm: 10, lg: 12 }}
                            sx={{
                                flexDirection: {
                                    xs: 'column-reverse',
                                    sm: 'row',
                                },
                            }}
                        >
                            <Grid item xs={12} sm={6} lg={4}>
                                <Section03H2>CDMS</Section03H2>
                                <Section03H4>Clinical Data Management System</Section03H4>
                                <Section03P>
                                    <SpanStyled>
                                        Clinical data provides statistical analysis and reporting,{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        In conjunction with the Medical MyData Platform and{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        the RWE Big Data Platform Removed noise data, linked
                                        analysis{' '}
                                    </SpanStyled>
                                    <SpanStyled>
                                        and learning outcomes It can provide trust and insight for
                                        research.
                                    </SpanStyled>
                                </Section03P>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>

            {/* Section 04 */}
            <Box
                className="section section-04"
                sx={{
                    p: { xs: '2rem 0', md: '6.5rem 0' },
                }}
            >
                <Container maxWidth="xl">
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={8}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    marginBottom: { xs: '1rem', md: '1.5rem' },
                                    fontWeight: 'normal',
                                }}
                            >
                                easy, convenient, and economical Experience
                            </Typography>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    mb: { xs: '2.5rem', md: '3.625rem' },
                                }}
                            >
                                evix-DCT for free now!
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={toApplyPage}
                                size="large"
                                sx={{ fontSize: '1.1rem' }}
                            >
                                Book a Demo
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Section 05 */}
            <Box className="section section-05">
                <Container maxWidth="xl">
                    <Grid container alignItems="center" justifyContent="center" gap={4}>
                        <Grid item xs={5}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '0.9rem', md: '1.125rem' },
                                    mb: { xs: '1rem', md: '1.2rem' },
                                }}
                            >
                                eCRF System
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: '1.2rem', md: '1.875rem' },
                                    mb: { xs: '1rem', md: '1.9rem' },
                                }}
                            >
                                <SpanStyled>It's a treatment for severe atopic </SpanStyled>
                                <SpanStyled>dermatitis Safety and Effectiveness </SpanStyled>
                                <SpanStyled>Study</SpanStyled>
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: '0.9rem', md: '1.125rem' },
                                    mb: { xs: '1.5rem', md: '3.06rem' },
                                    'span': {
                                        display: { xs: 'inline', md: 'block' },
                                    },
                                }}
                            >
                                <SpanStyled>
                                    Participation of Soonchunhyang Medical Center and 10 large{' '}
                                </SpanStyled>
                                <SpanStyled>
                                    Korean hospitals to conduct eCRF on atopic dermatitis treatment
                                </SpanStyled>
                            </Typography>
                            <Typography>* Hospital</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Section 06 */}
            <Box className="section section-06">
                <Container maxWidth="xl">
                    <Grid container alignItems="center" justifyContent="center" gap={1}>
                        <Grid item xs={5}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '0.9rem', md: '1.125rem' },
                                    mb: { xs: '1rem', md: '1.2rem' },
                                }}
                            >
                                eCRF System
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: '1.2rem', md: '1.875rem' },
                                    mb: { xs: '1rem', md: '1.9rem' },
                                }}
                            >
                                <SpanStyled>It's a treatment for severe atopic </SpanStyled>
                                <SpanStyled>dermatitis Safety and Effectiveness </SpanStyled>
                                <SpanStyled>Study</SpanStyled>
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: '0.9rem', md: '1.125rem' },
                                    mb: { xs: '1.5rem', md: '3.06rem' },
                                    'span': {
                                        display: { xs: 'inline', md: 'block' },
                                    },
                                }}
                            >
                                <SpanStyled>
                                    Participation of Soonchunhyang Medical Center and 10 large{' '}
                                </SpanStyled>
                                <SpanStyled>
                                    Korean hospitals to conduct eCRF on atopic dermatitis treatment
                                </SpanStyled>
                            </Typography>
                            <Typography>* Hospital</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Section 07 */}
            <Box
                className="section section-07"
                sx={{
                    mt: { xs: '3rem', md: '4.375rem' },
                    mb: { xs: '2.5rem', md: '3.75rem' },
                }}
            >
                <Container sx={{ textAlign: 'center' }} maxWidth="xl">
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '3rem' },
                            mb: { xs: '2rem', md: '4.375rem' },
                        }}
                    >
                        On a monthly subscription basis
                        <br />
                        It will be paid monthly per study.
                        <br />
                    </Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                        sx={{ mb: { xs: '4rem', md: '6.25rem' } }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ fontSize: '1.1rem', p: '10px 27px' }}
                        >
                            Month Get Started
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: '#222',
                                fontSize: '1.1rem',
                                p: '10px 27px',
                                position: 'relative',
                            }}
                        >
                            Year Get Started
                        </Button>
                    </Box>
                    <Grid
                        container
                        spacing={{ xs: 4, md: 5 }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={2} md={2}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    mt: { xs: '1.2rem', md: '1rem' },
                                }}
                            >
                                ePRO
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    mt: { xs: '1.2rem', md: '1rem' },
                                }}
                            >
                                eCOA
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    mt: { xs: '1.2rem', md: '1rem' },
                                }}
                            >
                                eCRF
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Section 08 */}
            <Box className="section section-08">
                <Container
                    className="container-08"
                    maxWidth="xl"
                    sx={{
                        p: { xs: '2.5rem', md: '4.625rem' },
                        width: { xs: '90%', lg: '100%' },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            mb: { xs: '1.5rem', md: '2rem' },
                        }}
                    >
                        If you have any questions about the use of
                        <br />
                        the institution or multiple uses, please contact us separately and
                        <br />
                        we will inform you through consultation.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ bgcolor: '#222', fontSize: '1.1rem', p: '10px 27px' }}
                    >
                        Contact Service
                    </Button>
                </Container>
            </Box>

            {/* Section 09 */}
            <Box
                className="section section-09"
                sx={{
                    p: { xs: '5rem 0', md: '9.375rem 0 13.5rem' },
                }}
            >
                <Container maxWidth="xl">
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 800,
                            fontSize: { xs: '2rem', md: '3.125rem' },
                            mb: { xs: '4rem', md: '8rem' },
                        }}
                    >
                        With evix-DCT
                    </Typography>
                    <Grid container alignItems="center" justifyContent="center"></Grid>
                </Container>
            </Box>

            {/* Section 10 */}
            <Box
                className="section section-10"
                sx={{
                    p: { xs: '2rem 0 1.9rem', md: '4.125rem 0 3.813rem' },
                }}
            >
                <Container maxWidth="xl">
                    <Grid
                        container
                        sx={{
                            flexDirection: {
                                xs: 'column-reverse',
                                sm: 'row',
                            },
                        }}
                    >
                        <Grid item xs={12} sm={6} md={7}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { sx: '1.5rem', md: '3.125rem' },
                                    mt: { xs: '2.5rem', md: '5.25rem' },
                                }}
                            >
                                Healthcare MyData and
                                <br />
                                RWE Big Data Platform
                                <br />
                                work together
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    mt: { xs: '1.5rem', md: '3rem' },
                                    fontWeight: 300,
                                    fontSize: { xs: '0.9rem', md: '1.5rem' },
                                }}
                            >
                                <SpanStyled>evix-DCT platform is </SpanStyled>
                                <SpanStyled>
                                    It provides optimized collaborative tools for researchers to
                                    conveniently{' '}
                                </SpanStyled>
                                <SpanStyled>
                                    analyze and report collected clinical data, It provides noise
                                    removal in{' '}
                                </SpanStyled>
                                <SpanStyled>conjunction with medical mydata, </SpanStyled>
                                <SpanStyled>
                                    linkage analysis and learning using medical big data.
                                </SpanStyled>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            sm={6}
                            md={5}
                            className="ellipse"
                            sx={{
                                mt: { xs: '1.5rem', md: '5rem' },
                            }}
                        >
                            <Grid item xs={6}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.3rem', md: '2.75rem' },
                                        mb: { xs: '0.8rem', md: '1.68rem' },
                                    }}
                                >
                                    30b +
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '0.8rem', md: '1.25rem' },
                                        mb: { xs: '2rem', md: '4.3rem' },
                                    }}
                                >
                                    Real World Data
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.3rem', md: '2.75rem' },
                                        mb: { xs: '0.8rem', md: '1.68rem' },
                                    }}
                                >
                                    69m +
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '0.8rem', md: '1.25rem' },
                                        mb: { xs: '2rem', md: '4.3rem' },
                                    }}
                                >
                                    Number of patients
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.3rem', md: '2.75rem' },
                                        mb: { xs: '0.8rem', md: '1.68rem' },
                                    }}
                                >
                                    53 +
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '0.8rem', md: '1.25rem' },
                                        mb: { xs: '0', md: '4.3rem' },
                                    }}
                                >
                                    General hospital
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.3rem', md: '2.75rem' },
                                        mb: { xs: '0.8rem', md: '1.68rem' },
                                    }}
                                >
                                    10yr +
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '0.8rem', md: '1.25rem' },
                                        mb: { xs: '0', md: '4.3rem' },
                                    }}
                                >
                                    Time series data
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default InviteStudy;
