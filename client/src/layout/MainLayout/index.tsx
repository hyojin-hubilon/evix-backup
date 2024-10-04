import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CircularProgress, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';

// types
import { openDrawer, openOnboarding } from '@store/reducers/menu';
import { IRootState } from '@store/reducers';
import { UserProfileContextProvider } from '@/context/UserProfileContext';
import { t } from 'i18next';

//styled components
import * as S from './styles';

// ==============================|| MAIN LAYOUT ||============================== //



const MainLayout = () => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
    const dispatch = useDispatch();
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [onboardingStep, setOnboardingStep] = useState<number|null>(0);

    const { drawerOpen, onboarding } = useSelector((state: IRootState) => state.menu);

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
		if(matchDownLG) {
			setShowOnboarding(false);
		}

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);

	useEffect(() => {
		if(onboarding) {
			setShowOnboarding(true)
		} else {
			setShowOnboarding(false)
		}
	}, [onboarding])

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
		dispatch(openOnboarding({ onboarding: false }));
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

					{
						onboardingStep === 0 &&

						<S.BlueBox
						sx={{
							position: 'fixed',
							left: '50%',
							top:'50%',
							transform: 'translate(-50%, -50%)',
							opacity: onboardingStep === 0 ? 1 : 0
						}}
					>
						<h5>{t('onboarding.welcome')}</h5>
						<p>{t('onboarding.welcome_to')}</p>
						<Box className="btn-box">
							<Button className="skip" onClick={handleSkipOnboarding}>Skip</Button>
							<Button className="start" onClick={() => setOnboardingStep(1)}>Start</Button>
						</Box>
					</S.BlueBox>

					}
					
					
					{/* Onboarding 2 */}

					{
						onboardingStep === 1 &&
						<S.BlueBox
						sx={{
							position: 'fixed',
							left: '270px',
							top:'75px',
						}}
					>
						<h5>{t('onboarding.dashboard')}</h5>
						<p>{t('onboarding.you_can_easily')}</p>
						<Box className="btn-box">
							<Button className="skip" onClick={handleSkipOnboarding}>Skip</Button>
							<Button className="start" onClick={() => setOnboardingStep(2)}>Next</Button>
						</Box>
						<S.Triangle sx={{
							left: '-8px',
							top:'20px'
						}}/>
					</S.BlueBox>

					}
					

					{/* Onboarding 3 */}

					{
						onboardingStep === 2 && 
						<S.BlueBox
						sx={{
							position: 'fixed',
							right: '20px',
							top:'56px',
						}}
					>
						<h5>{t('onboarding.recent_notifications')}</h5>
						<p>{t('onboarding.check_the_status_ongoing')}</p>
						<Box className="btn-box">
							<Button className="skip" onClick={handleSkipOnboarding}>Skip</Button>
							<Button className="start" onClick={() => setOnboardingStep(3)}>Next</Button>
						</Box>
						<S.Triangle sx={{
							right: '20px',
							top:'-12px',
							transform: 'rotate(90deg)'
						}}/>
					</S.BlueBox>
					}
					

					{/* Onboarding 4 */}

					{
						onboardingStep === 3 &&
						<S.BlueBox
						sx={{
							position: 'fixed',
							left: '270px',
							top:'120px',
						}}
					>
						<h5>{t('onboarding.studies')}</h5>
						<h6>{t('onboarding.create_a_new_trial')}</h6>
						<p>{t('onboarding.to_start_a_new')}</p>

						<Box mt="12px">
						<h6>{t('onboarding.view_and_edit')}</h6>
						<p>{t('onboarding.you_can_select_any')}</p>
						</Box>

						<Box className="btn-box">
							<Button className="skip" onClick={handleSkipOnboarding}>Skip</Button>
							<Button className="start" onClick={() => setOnboardingStep(4)}>Next</Button>
						</Box>
						<S.Triangle sx={{
							left: '-8px',
							top:'20px'
						}}/>
					</S.BlueBox>
					}

					


					{/* Onboarding 5 */}

					{
						onboardingStep === 4 && 
						<S.BlueBox
						sx={{
							position: 'fixed',
							left: '270px',
							top:'215px',
						}}
					>
						<h5>{t('onboarding.survey')}</h5>
						<p>{t('onboarding.the_platform_provides')}</p>

						<Box className="btn-box">
							<Button className="skip" onClick={handleSkipOnboarding}>Skip</Button>
							<Button className="start" onClick={() => setOnboardingStep(5)}>Next</Button>
						</Box>
						<S.Triangle sx={{
							left: '-8px',
							top:'20px'
						}}/>
					</S.BlueBox>
					}
					

					
					{/* Onboarding 6 */}

					{
						onboardingStep === 5 && <S.BlueBox
						sx={{
							position: 'fixed',
							left: '270px',
							top:'290px',
						}}
					>
						<h5>{t('onboarding.billing')}</h5>
						<p>{t('onboarding.the_evix-dct_platform')}</p>

						<Box className="btn-box">
							<Button className="skip" onClick={handleSkipOnboarding}>Skip</Button>
							<Button className="start" onClick={() => setOnboardingStep(6)}>Next</Button>
						</Box>
						<S.Triangle sx={{
							left: '-8px',
							top:'20px'
						}}/>
					</S.BlueBox>
					}
					


					{/* Onboarding 7 */}

					{
						onboardingStep === 6 &&

						<S.BlueBox
							sx={{
								position: 'fixed',
								left: '270px',
								top:'380px',
							}}
						>
							<h5>{t('onboarding.setting')}</h5>
							<p>{t('onboarding.you_can_manage_language')}</p>

							<Box className="btn-box">
								<Button className="skip" onClick={handleSkipOnboarding}>Skip</Button>
								<Button className="start" onClick={handleSkipOnboarding}>End</Button>
							</Box>
							<S.Triangle sx={{
								left: '-8px',
								top:'20px'
							}}/>
						</S.BlueBox>	
					}
									
				</Box>
			}
			
		</UserProfileContextProvider>
    );
};

export default MainLayout;
