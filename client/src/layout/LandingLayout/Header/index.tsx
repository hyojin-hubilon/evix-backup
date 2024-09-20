import { useNavigate } from 'react-router';
import { Link as ReactRouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    AppBar,
    Grid,
    Button,
    Container,
    useMediaQuery,
    IconButton,
    Box,
    AppBarOwnProps,
} from '@mui/material';
import { styled } from '@mui/system';

//Logo
import LogoSection from '@components/Logo';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ReactEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { IRootState } from '@/store/reducers';

// ==============================|| LANDING LAYOUT - HEADER ||============================== //
type Props = {
    open: boolean;
    handleDrawerToggle: ReactEventHandler;
};

const LandingHeader = ({ open, handleDrawerToggle }: Props) => {
    // const languageSelector = useSelector((state: IRootState) => state.language);
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const iconBackColor = 'grey.100';
    const iconBackColorOpen = 'grey.200';

    const toLoginPage = () => {
        navigate('/login');
    };

    const toDemoPage = () => {
        navigate('/apply');
    };

    const contentAlignCenter = {
        justifyContent: 'center',
        alignItems: 'center',
    };

    const NavLink = styled(ReactRouterLink)(({ theme }) => ({
        color: theme.palette.text.primary,
        fontSize: '1.1rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    }));

    const handleScrollToElement = (elementId: string) => {
        navigate('/');
        
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleScrollToTop = () => {
        navigate('/');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    };

    const largeHeader = (
        <Container maxWidth="xl">
            <Grid container alignItems="center">
                <Grid item xs={3}>
                    <LogoSection sx={{ display: 'flex', justifyContent: 'flex-start' }} />
                </Grid>
                <Grid
                    item
                    xs={6}
                    {...contentAlignCenter}
                    sx={{ display: 'flex', gap: { xs: '1rem', md: '3rem', lg: '5rem' } }}
                >
                    <NavLink to="/" onClick={handleScrollToTop}>
                        {t('common.home')}
                    </NavLink>
                    <NavLink to="/" onClick={() => handleScrollToElement('products')}>
                        {t('common.products')}
                    </NavLink>
                    <NavLink to="/" onClick={() => handleScrollToElement('case')}>
                        {t('common.case')}
                    </NavLink>
                    <NavLink to="/" onClick={() => handleScrollToElement('price')}>
                        {t('common.price')}
                    </NavLink>
                    <NavLink to="/support">{t('common.support')}</NavLink>
                </Grid>
                <Grid
                    item
                    xs={3}
                    alignItems="center"
                    justifyContent="flex-end"
                    sx={{ display: 'flex', gap: 1 }}
                >
                    <Button variant="contained" onClick={toDemoPage} sx={{ fontSize: '1rem' }}>
                        {t('common.demo')}
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#091C3D', fontSize: '1rem' }}
                        onClick={toLoginPage}
                    >
						{t('common.login')}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );

    // app-bar params
    const appBar: AppBarOwnProps = {
        position: 'fixed',
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            justifyContent: 'center',
            alignItems: 'center',
            background: theme.palette.common.white,
            boxShadow: 'none',
            minHeight: {
                sm: 60,
                md: 80,
            },
        },
    };

    return (
        <>
            {matchDownSM ? (
                <AppBar {...appBar}>
                    <Container>
                        <Box display="flex" height="60px" alignItems="center" gap={1}>
                            <IconButton
                                disableRipple
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                                edge="start"
                                color="secondary"
                                sx={{
                                    color: 'text.primary',
                                    bgcolor: open ? iconBackColorOpen : iconBackColor,
                                    ml: { xs: 0, lg: -2 },
                                }}
                            >
                                {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            </IconButton>
                            <Box maxWidth={150}>
                                <LogoSection
                                    sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                />
                            </Box>
                        </Box>
                    </Container>
                </AppBar>
            ) : (
                <AppBar {...appBar}>{largeHeader}</AppBar>
            )}
        </>
    );
};

export default LandingHeader;
