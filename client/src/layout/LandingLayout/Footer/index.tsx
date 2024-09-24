import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, Link } from '@mui/material';
import { styled, useMediaQuery } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

import footerLogo from '@assets/images/EVIDNET_LOGO.svg';
import LanguageSelector from './LangaugeSelector';
import Terms from './components/Terms';
import CookiePolicy from './components/CookiePolicy';
import PrivacyPolicy from '@/components/modal/PrivacyPolicy';
import CookieGuide from './components/CookieGuide';
import { useTranslation } from 'react-i18next';

const cursorPointer = { cursor: 'pointer' };

const LandingFooter = () => {
    const { t } = useTranslation();
    const [cookiePolicyIsOpen, setCookiePolicyIsOpen] = useState<boolean>(false);
    const [privacyPolicyIsOpen, setPrivacyPolicyIsOpen] = useState<boolean>(false);
    const [termsIsOpen, setTermsIsOpen] = useState<boolean>(false);

    const handleCookiePolicy = (): void => {
        setCookiePolicyIsOpen((prev) => !prev);
    };
    const handlePravacyPolicy = (): void => {
        setPrivacyPolicyIsOpen((prev) => !prev);
    };
    const handleTerms = (): void => {
        setTermsIsOpen((prev) => !prev);
    };

    const theme = useTheme();
	const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));

    const FooterLink = styled(Link)(({ theme }) => ({
        color: theme.palette.common.white,
        fontSize: 16,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
    }));

    const SocialButton = styled(Link)(() => ({
        padding: '13px 13px 12px',
        border: '1px solid rgba(228, 219, 233, 0.25)',
        color: '#FFF',
        display: 'flex',
        '&:hover': {
            borderColor: 'rgba(228, 219, 233, 0.5)',
        },
    }));

    const handleOpenPage = (url: string) => {
        window.open(url);
    };

    return (
        <>
            <Box
                sx={{
                    pt: '3rem',
					pb: '1rem',
                    width: 1,
                    minHeight: 180,
                    alignItems: 'top',
                    backgroundColor: '#111',
					display: 'flex'
                }}
            >
                <Container maxWidth="xl">
                    <Grid container>
						<Grid item container xs={12} lg={6} gap={4}>
							<Grid item xs={4} md={3}>
								<Link sx={{ maxWidth: '100%' }}>
									<img
										src={footerLogo}
										alt="evidnet"
										style={{ width: '100%', maxWidth: '200px' }}
									/>
								</Link>
							</Grid>
							<Grid item xs={12} md={8}>
								<Box sx={{ width: 1, display: 'flex', gap: 3 }}>
									<FooterLink href="support">{t('common.support')}</FooterLink>
									<FooterLink style={cursorPointer} onClick={handlePravacyPolicy}>
										{t('common.privacy')}
									</FooterLink>
									<FooterLink style={cursorPointer} onClick={handleTerms}>
										{t('common.terms')}
									</FooterLink>
									<FooterLink style={cursorPointer} onClick={handleCookiePolicy}>
										{t('common.cookie_policy')}
									</FooterLink>
								</Box>
								<Box sx={{ width: 1, paddingTop: '10px' }}>
									<span style={{ color: theme.palette.text.secondary }}>
										&#169; 2024 evidnet Inc. All Rights Reserved.
									</span>
								</Box>
							</Grid>
						</Grid>
                        <Grid
                            item
                            xs={12}
                            md={12}
							lg={6}
							xl={6}
                            alignItems="center"
                            sx={{
                                justifyContent: {
                                    lg: 'flex-start',
									xl: 'flex-end'
                                },
                                mt: {
                                    xs: '1rem',
                                    md: '1rem',
									lg: '1rem',
									xl: '0'
                                },
								pt: 0
                            }}
                        >
							<Box display="flex" gap={4} justifyContent={matchDownLG ? "flex-start" : "flex-end"} sx={{flexDirection: {xs: 'column', md: 'row'}}}>
								<Box display="flex" gap={1}>
									<SocialButton
										onClick={() =>
											handleOpenPage(
												'https://www.linkedin.com/company/evidnet'
											)
										}
									>
										<LinkedInIcon />
									</SocialButton>
									<SocialButton
										onClick={() =>
											handleOpenPage('https://www.facebook.com/evidnet')
										}
									>
										<FacebookIcon />
									</SocialButton>
									<SocialButton
										onClick={() =>
											handleOpenPage('https://www.youtube.com/c/EvidnetVideo')
										}
									>
										<YouTubeIcon />
									</SocialButton>
									<SocialButton
										onClick={() =>
											handleOpenPage('https://blog.naver.com/evidnet')
										}
									>
										<img
											decoding="async"
											src="http://evidnet.com/wp-content/uploads/2022/05/blog2.png"
											style={{ width: 25, height: 25 }}
										/>
									</SocialButton>
								</Box>
								<Box minWidth="150px" maxWidth="150px">
									<LanguageSelector />
								</Box>
							</Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <PrivacyPolicy isOpen={privacyPolicyIsOpen} handleClose={handlePravacyPolicy} />
            <Terms isOpen={termsIsOpen} handleClose={handleTerms} />
            <CookiePolicy isOpen={cookiePolicyIsOpen} handleClose={handleCookiePolicy} />
            <CookieGuide handleCookiePolicy={handleCookiePolicy} />
        </>
    );
};

export default LandingFooter;
