import { Button, Container, Grid, Box, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

//Landing Images
//Section 03
import landingImg031 from '@assets/images/landing/img-01@2x.png';
import landingImg032 from '@assets/images/landing/img-02@2x.png';
import landingImg033 from '@assets/images/landing/img-03@2x.png';
import landingImg034 from '@assets/images/landing/img-04@2x.png';
//Section 05
import landingImg051 from '@assets/images/landing/1@2x.png';
import landingImg052 from '@assets/images/landing/ci-1@2x.png';
//Section 06
import landingImg061 from '@assets/images/landing/2@2x.png';
//Section 07
import landingImg071 from '@assets/images/landing/1-e-pro-1@2x.png';
import landingImg072 from '@assets/images/landing/e-coa-2@2x.png';
import landingImg073 from '@assets/images/landing/e-crf-3@2x.png';
import landingImg074 from '@assets/images/landing/badge@2x.png';
//Section 09
import landingImg091 from '@assets/images/landing/p-ci@2x.png';
//Seciton 10
import landingImg0101 from '@assets/images/landing/1_2@2x.png';
import landingImg0102 from '@assets/images/landing/2_2@2x.png';
import landingImg0103 from '@assets/images/landing/3@2x.png';
import landingImg0104 from '@assets/images/landing/4@2x.png';

import './Landing.scss';

export default function LandingPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

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

    const toSupportPage = () => {
        navigate("/support");
    }

    return (
        <Box className="landing" sx={{bgcolor: 'white'}}>
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
							{t('landing.it_increase')}
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
                        	{t('landing.of_the_clinical')}
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
                            <SpanStyled>{t('landing.evix_dct_platform_is')}</SpanStyled>
                            <SpanStyled>
                                {t('landing.it_provides_optimized')}
                            </SpanStyled>
                            <SpanStyled>
                                {t('landing.and_report_collected')}
                            </SpanStyled>
                            <SpanStyled>
                                {t('landing.linkage_analysis_and')}
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
                            <Grid item xs={12} sm={4} lg={6}>
                                <img src={landingImg031} alt="ePRO" style={{ maxWidth: '100%' }} />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Section03H2>{t('landing.e_pro')}</Section03H2>
                                <Section03H4>{t('landing.electronic_patient')}</Section03H4>
                                <Section03P>
                                    <SpanStyled>
                                        {t('landing.it_provides_important')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.provides_key_information')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.and_safety_evaluation')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.improved_data_accuracy')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.there_is_a_reduction')}
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
                                <Section03H2>{t('landing.e_coa')}</Section03H2>
                                <Section03H4>{t('landing.electronic_clinical')}</Section03H4>
                                <Section03P>
                                    <SpanStyled>
                                        {t('landing.including_not_only')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.healthcare_providers')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.comprehensive_data')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.reliability_of_data')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.in_paper-based_data')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.and_analysis')}
                                    </SpanStyled>
                                </Section03P>
                            </Grid>
                            <Grid item xs={12} sm={4} lg={6}>
                                <img src={landingImg032} alt="eCOA" style={{ maxWidth: '100%' }} />
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
                            <Grid item xs={12} sm={4} lg={6}>
                                <img src={landingImg033} alt="eCRF" style={{ maxWidth: '100%' }} />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                                <Section03H2>{t('landing.e_crf')}</Section03H2>
                                <Section03H4>{t('landing.electronic_case')}</Section03H4>
                                <Section03P>
                                    <SpanStyled>
                                        {t('landing.it_provides_a_variety')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.verification_reporting')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.and_reducing_errors')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.the_system_allows')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.necessary_and_improve')}
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
                            <Grid item xs={12} sm={4} lg={4}>
                                <Section03H2>{t('landing.cdms')}</Section03H2>
                                <Section03H4>{t('landing.clinical_data')}</Section03H4>
                                <Section03P>
                                    <SpanStyled>
                                        {t('landing.clinical_data_provides')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.in_conjunction_with')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.the_rwe_big')}
                                    </SpanStyled>
                                    <SpanStyled>
                                        {t('landing.and_learning_outcomes')}
                                    </SpanStyled>
                                </Section03P>
                            </Grid>
                            <Grid item xs={12} sm={4} lg={6}>
                                <img src={landingImg034} alt="eCRF" style={{ maxWidth: '100%' }} />
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
                                {t('landing.easy_convenient')}
                            </Typography>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { xs: '2rem', md: '3rem' },
                                    mb: { xs: '2.5rem', md: '3.625rem' },
                                }}
                            >
                                {t('landing.evix-dct_for_free')}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={toApplyPage}
                                size="large"
                                sx={{ fontSize: '1.1rem' }}
                            >
                                {t('landing.book_a_demo')}
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
                            <img
                                src={landingImg051}
                                alt="eCRF System"
                                style={{ maxWidth: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '0.9rem', md: '1.125rem' },
                                    mb: { xs: '1rem', md: '1.2rem' },
                                }}
                            >
                                {t('landing.e_crf_system')}
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: '1.2rem', md: '1.875rem' },
                                    mb: { xs: '1rem', md: '1.9rem' },
                                }}
                            >
                                <SpanStyled>{t('landing.it_s_a_treatment')}</SpanStyled>
                                <SpanStyled>{t('landing.dermatitis_safety')}</SpanStyled>
                                <SpanStyled>{t('landing.study')}</SpanStyled>
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
                                    {t('landing.participation_of_soonchunhyang')}
                                </SpanStyled>
                                <SpanStyled>
                                    {t('landing.korean_hospitals')}
                                </SpanStyled>
                            </Typography>
                            <Typography>{t('landing.hospital')}</Typography>
                            <Box>
                                <img
                                    src={landingImg052}
                                    alt="Hospital"
                                    style={{ maxWidth: '80%' }}
                                />
                            </Box>
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
								{t('landing.e_crf_system')}
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: '1.2rem', md: '1.875rem' },
                                    mb: { xs: '1rem', md: '1.9rem' },
                                }}
                            >
                                <SpanStyled>{t('landing.it_s_a_treatment')}</SpanStyled>
                                <SpanStyled>{t('landing.dermatitis_safety')}</SpanStyled>
                                <SpanStyled>{t('landing.study')}</SpanStyled>
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
									{t('landing.participation_of_soonchunhyang')}
                                </SpanStyled>
                                <SpanStyled>
									{t('landing.korean_hospitals')}
                                </SpanStyled>
                            </Typography>
                            <Typography>{t('landing.hospital')}</Typography>
                            <Box>
                                <img
                                    src={landingImg052}
                                    alt="Hospital"
                                    style={{ maxWidth: '80%' }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <img
                                src={landingImg061}
                                alt="eCRF System"
                                style={{ maxWidth: '100%' }}
                            />
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
                        {t('landing.on_a_monthly')}
                        <br />
                        {t('landing.it_will_be_paid')}
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
                            {t('landing.month_get_started')}
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
                            {t('landing.year_get_started')}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: '59px',
                                    height: '54px',
                                    right: { xs: '-20px', sm: '-30px' },
                                    bottom: { xs: '35px', sm: '30px' },
                                }}
                            >
                                <img src={landingImg074} alt="10% OFF" style={{ width: '100%' }} />
                            </Box>
                        </Button>
                    </Box>
                    <Grid
                        container
                        spacing={{ xs: 4, md: 5 }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={2} md={2}>
                            <Box>
                                <img src={landingImg071} alt="ePRO" style={{ maxWidth: '100%' }} />
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    mt: { xs: '1.2rem', md: '1rem' },
                                }}
                            >
                                {t('landing.e_pro')}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box>
                                <img src={landingImg072} alt="eCOA" style={{ maxWidth: '100%' }} />
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    mt: { xs: '1.2rem', md: '1rem' },
                                }}
                            >
                                {t('landing.e_coa')}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box>
                                <img src={landingImg073} alt="eCRF" style={{ maxWidth: '100%' }} />
                            </Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    mt: { xs: '1.2rem', md: '1rem' },
                                }}
                            >
                                {t('landing.e_crf')}
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
                        {t('landing.if_you_have')}
                        <br />
                        {t('landing.the_institution')}
                        <br />
                        {t('landing.we_will_inform')}
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ bgcolor: '#222', fontSize: '1.1rem', p: '10px 27px' }}
                        onClick={toSupportPage}
                    >
                        {t('landing.contact_service')}
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
						{t('landing.with_evix-dct')}
                    </Typography>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={8}>
                            <img
                                src={landingImg091}
                                alt={t('landing.with_evix-dct')}
                                style={{ maxWidth: '100%' }}
                            />
                        </Grid>
                    </Grid>
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
								{t('landing.healthcare_mydata')}
                                <br />
								{t('landing.rwe_big_data')}
                                <br />
                                {t('landing.work_together')}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    mt: { xs: '1.5rem', md: '3rem' },
                                    fontWeight: 300,
                                    fontSize: { xs: '0.9rem', md: '1.5rem' },
                                }}
                            >
                                <SpanStyled>{t('landing.evix-dct_platform_is')}</SpanStyled>
                                <SpanStyled>
									{t('landing.it_provides_optimized_02')}
                                </SpanStyled>
                                <SpanStyled>
                                    {t('landing.analyze_and_report')}
                                </SpanStyled>
                                <SpanStyled>{t('landing.conjunction_with_medical')}</SpanStyled>
                                <SpanStyled>
                                    {t('landing.linkage_analysis')}
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
                                <Box
                                    className="img-box"
                                    sx={{
                                        mb: { xs: '1rem', md: '2.5rem' },
                                    }}
                                >
                                    <img src={landingImg0101} alt="30b + Real World Data" />
                                </Box>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.3rem', md: '2.75rem' },
                                        mb: { xs: '0.8rem', md: '1.68rem' },
                                    }}
                                >
                                    {t('landing.30b')}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '0.8rem', md: '1.25rem' },
                                        mb: { xs: '2rem', md: '4.3rem' },
                                    }}
                                >
                                    {t('landing.real_world_data')}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    className="img-box"
                                    sx={{
                                        mb: { xs: '1rem', md: '2.5rem' },
                                    }}
                                >
                                    <img src={landingImg0102} alt="69m + Number of patients" />
                                </Box>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.3rem', md: '2.75rem' },
                                        mb: { xs: '0.8rem', md: '1.68rem' },
                                    }}
                                >
                                    {t('landing.69m')}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '0.8rem', md: '1.25rem' },
                                        mb: { xs: '2rem', md: '4.3rem' },
                                    }}
                                >
                                    {t('landing.number_of_patients')}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    className="img-box"
                                    sx={{
                                        mb: { xs: '1rem', md: '2.5rem' },
                                    }}
                                >
                                    <img src={landingImg0103} alt="53 + General hospital" />
                                </Box>
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
                                    {t('landing.general_hospital')}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    className="img-box"
                                    sx={{
                                        mb: { xs: '1.75rem', md: '2.5rem' },
                                    }}
                                >
                                    <img src={landingImg0104} alt="10yr + Time series data" />
                                </Box>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '1.3rem', md: '2.75rem' },
                                        mb: { xs: '0.8rem', md: '1.68rem' },
                                    }}
                                >
                                    {t('landing.10yr')}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: { xs: '0.8rem', md: '1.25rem' },
                                        mb: { xs: '0', md: '4.3rem' },
                                    }}
                                >
                                    {t('landing.time_series_data')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
