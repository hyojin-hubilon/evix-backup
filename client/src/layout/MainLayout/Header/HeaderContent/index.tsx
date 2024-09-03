// material-ui
import { Box, IconButton, Link, useMediaQuery, useTheme } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';

// project import
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {/* {!matchesXs && <Search />} */}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
            <Box sx={{ width: '100%' }} display="flex" justifyContent="flex-end">
                {!matchesXs && <Profile />}
                {matchesXs && <MobileSection />}
                <Notification />
            </Box>
        </>
    );
};

export default HeaderContent;
