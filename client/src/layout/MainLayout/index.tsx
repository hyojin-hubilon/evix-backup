import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CircularProgress, styled, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from '@/menu-items';
import Breadcrumbs from '@components/@extended/Breadcrumbs';

// types
import { openDrawer } from '@store/reducers/menu';
import { IRootState } from '@store/reducers';
import { UserProfileContextProvider } from '@/context/UserProfileContext';
import { t } from 'i18next';

// ==============================|| MAIN LAYOUT ||============================== //

export const BlueBox = styled(Box)(() => ({
	background: '#22ABF3',
	padding:'24px',
	borderRadius: '12px',
	color: 'white',
	maxWidth: '416px',
	boxShadow: '0px 6px 10px 0px #0072AE54',
	'h5' : {		
		fontWeight:'00',
		fontSize: '15px',
		lineHeight : '1',
		margin:'0 0 12px'
	},
	'p': {
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '19.6px'
	},
	'.btn-box': {
		display: 'flex',
		justifyContent: 'flex-end',
		gap: '14px'
	},
	'button': {
		borderRadius: '50px',
		fontSize: '14px',
		fontWeight: '400',
		height: '32px',
		width: '90px',
		textAlign: 'center',
		opacity: '0.7',
		transition: 'opacity 0.3s',
		'&:hover': {
			opacity: '1',
			transition: 'opacity 0.3s',
		}
	},
	'.skip' : {
		color: 'white',
		border:'1px solid #fff'
	},
	'.start' : {
		color: '#22ABF3',
		background: '#fff'
	}

}))


const MainLayout = () => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
    const dispatch = useDispatch();
	const [showOnboarding, setShowOnboarding] = useState(true);
	const [onboardingStep, setOnboardingStep] = useState<number|null>(0);

    const { drawerOpen } = useSelector((state: IRootState) => state.menu);

    // drawer toggler
    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    // set media wise responsive drawer
    useEffect(() => {
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);

	useEffect(() => {
		if(showOnboarding) {
			document.body.style.overflow="hidden";
			setOnboardingStep(0);
		} else {
			document.body.style.overflow="auto";
		}
		
	}, [showOnboarding])

	const handleSkipOnboarding = () => {
		setShowOnboarding(false);
		setOnboardingStep(null);
	}

    return (
		<UserProfileContextProvider>
			<Box sx={{ display: 'flex', width: '100%' }} >
				<Header open={open} handleDrawerToggle={handleDrawerToggle} />
				<Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
				
				{/* axios 로딩 */}
				<div id="loadingContainer" style={{ display: 'block', position: 'fixed', zIndex: 2000, top: 0, bottom: 0, left: open ? '270px' : 0, right: 0, background: 'transparent' }}>
					<CircularProgress sx={{top:'50%', left: '50%', position:'absolute', marginLeft: '-20px', marginTop: '-20px'}}/>
				</div>

				<Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 }, pl: open ? { xs: 2, sm: 3, md: 2} : {xs : 2, sm: 3, md: 3, lg: 11} }}>
					<Toolbar />
					{/* <Breadcrumbs navigation={navigation} title /> */}
					<Outlet />
				</Box>
			</Box>

			{
				showOnboarding &&

				<Box sx={{
					position: 'fixed',
					left:0,
					top:0,
					bottom: 0,
					right: 0,
					width: '100vw',
					height: '100vh',
					background: 'rgba(0,0,0,0.4)',
					zIndex: 10000
				}}>
					{/* Onboarding 1 */}
					<BlueBox
						sx={{
							position: 'fixed',
							left: '50%',
							top:'50%',
							transform: 'translate(-50%, -50%)',
							
						}}
					>
						<h5>{t('onboarding.welcome')}</h5>
						<p>{t('onboarding.welcome_to')}</p>
						<Box className="btn-box">
							<Button className="skip" onClick={handleSkipOnboarding}>Skip</Button>
							<Button className="start" onClick={() => setOnboardingStep(1)}>Start</Button>
						</Box>
					</BlueBox>

					{/* Onboarding 2 */}

					<BlueBox
						sx={{
							position: 'fixed',
							left: '50%',
							top:'50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						<h5>{t('onboarding.welcome')}</h5>
						<p>{t('onboarding.welcome_to')}</p>
						<Box className="btn-box">
							<Button className="skip" onClick={handleSkipOnboarding}>Skip</Button>
							<Button className="start" onClick={() => setOnboardingStep(1)}>Start</Button>
						</Box>
					</BlueBox>
				</Box>
			}
			
		</UserProfileContextProvider>
    );
};

export default MainLayout;
