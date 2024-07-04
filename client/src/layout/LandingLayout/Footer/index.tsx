import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, Link } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

import footerLogo from '@assets/images/EVIDNET_LOGO.svg';
import LanguageSelector from './LangaugeSelector';
import Terms from './components/Terms';
import CookiePolicy from './components/CookiePolicy';
import PrivacyPolicy from '@/components/modal/PrivacyPolicy';
import CookieGuide from './components/CookieGuide';

const cursorPointer = { cursor: 'pointer' };

const LandingFooter = () => {
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

    return (
        <>
            <Box
                sx={{
                    pt: '3rem',
                    width: 1,
                    minHeight: 180,
                    alignItems: 'center',
                    backgroundColor: '#111',
                }}
            >
                <Container maxWidth="xl">
                    <Grid container>
                        <Grid item xs={12} sm={3} md={3} lg={2} gap={10}>
                            <Link sx={{ maxWidth: '100%' }}>
                                <img
                                    src={footerLogo}
                                    alt="evidnet"
                                    style={{ width: '100%', maxWidth: '200px' }}
                                />
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={8} md={4} lg={4}>
                            <Box sx={{ width: 1, display: 'flex', gap: 3 }}>
                                <FooterLink href="support">Support</FooterLink>
                                <FooterLink style={cursorPointer} onClick={handlePravacyPolicy}>
                                    Privacy
                                </FooterLink>
                                <FooterLink style={cursorPointer} onClick={handleTerms}>
                                    Terms
                                </FooterLink>
                                <FooterLink style={cursorPointer} onClick={handleCookiePolicy}>
                                    Cookie Policy
                                </FooterLink>
                            </Box>
                            <Box sx={{ width: 1, paddingTop: '10px' }}>
                                <span style={{ color: theme.palette.text.secondary }}>
                                    &#169; 2024 evidnet Inc. All Rights Reserved.
                                </span>
                            </Box>
                        </Grid>

                        <Grid
                            item
                            container
                            xs={12}
                            sm={12}
                            md={4}
                            lg={5}
                            alignItems="center"
                            spacing={2}
                            sx={{
                                justifyContent: {
                                    xs: 'flex-start',
                                    md: 'flex-end',
                                    lg: 'flex-end',
                                },
                                mt: {
                                    xs: '0.5rem',
                                    md: '0',
                                },
                                mb: {
                                    xs: '1.5rem',
                                    md: '0',
                                },
                            }}
                        >
                            <Grid
                                item
                                container
                                xs="auto"
                                spacing={1}
                                sx={{
                                    justifyContent: {
                                        xs: 'flex-start',
                                        md: 'flex-end',
                                    },
                                    pt: 0,
                                }}
                            >
                                <Grid item sx={{ pt: 0 }}>
                                    <SocialButton>
                                        <FacebookIcon></FacebookIcon>
                                    </SocialButton>
                                </Grid>
                                <Grid item sx={{ pt: 0 }}>
                                    <SocialButton>
                                        <InstagramIcon></InstagramIcon>
                                    </SocialButton>
                                </Grid>
                                <Grid item sx={{ pt: 0 }}>
                                    <SocialButton>
                                        <XIcon></XIcon>
                                    </SocialButton>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} md={6} sx={{ p: 0 }}>
                                <LanguageSelector />
                            </Grid>
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
