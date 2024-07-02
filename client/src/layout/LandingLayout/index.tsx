import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Drawer, Box, useMediaQuery, useTheme } from '@mui/material';


import LandingHeader from './Header';
import LandingFooter from './Footer';
import DrawerList from './Header/DrawerList';

// ==============================|| Landing LAYOUT ||============================== //

const LandingLayout = () => {
	const [open, setOpen] = useState(false);

	const theme = useTheme();
	const matchUpSM = useMediaQuery(theme.breakpoints.up('sm'));
	
	const handleDrawerToggle = () => {
		setOpen(!open);	
	};	

	useEffect(() => {
		if(matchUpSM) setOpen(false);
	}, [matchUpSM]);

	return (
		<Box sx={{width: '100%', minHeight: '100vh'}}>
			<LandingHeader open={open} handleDrawerToggle={handleDrawerToggle} />
			<Drawer open={open} onClose={handleDrawerToggle} disableScrollLock={ true }>
				<DrawerList handleDrawerToggle={handleDrawerToggle} />
			</Drawer>
			<Box component="main" sx={{ width: 1, pt: {xs: "60px", md:"80px"}, minHeight: `calc(100vh - 180px)`}}>
			<Outlet />
			</Box>
			<LandingFooter />
		</Box>
	)

};

export default LandingLayout;
