import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    CardContent,
    ClickAwayListener,
    Grid,
    Paper,
    Popper,
    Stack,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';

// project import
import MainCard from '@components/MainCard';
import Transitions from '@components/@extended/Transitions';
import ProfileTab from './ProfileTab';

// assets
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { MyProfile } from '@/types/user';
import userApi from '@/apis/user';
import { useTranslation } from 'react-i18next';
import authApi from '@/apis/auth';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
    const { t, i18n } = useTranslation();

    const [userData, setUserData] = useState<MyProfile | null>(null);

    useEffect(() => {
        getMyProfile();
    }, []);

    const getMyProfile = async () => {
        try {
            const response = await userApi.getMyProfile();
            if (response.code === 200) {
                setUserData(response.content);
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };

    const theme = useTheme();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await authApi.logout();
            if (response.code === 200) {
                setUserData(null);
                navigate('/login'); // 로그아웃 성공 시 홈 페이지로 이동
            } else {
                console.error('Failed to log out: ', response.code);
            }
        } catch (error) {
            console.error('Failed to log out: ', error);
        }
    };

    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleSettings = () => {
        navigate('/settings');
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <ButtonBase
                sx={{
                    p: 0.25,
                    color: theme.palette.grey[800],
                    bgcolor: open ? iconBackColorOpen : 'transparent',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'secondary.lighter' },
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Stack>
                    <Typography>
                        <Typography
                            component="span"
                            variant="h6"
                            color="primary"
                            sx={{
                                fontWeight: 'bold',
                            }}
                        >
                            {userData?.first_name} {userData?.last_name}
                        </Typography>{' '}
                        님 안녕하세요
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                    <Avatar
                        alt="profile user"
                        src={userData?.profile_image_url}
                        sx={{ width: 32, height: 32 }}
                    />
                </Stack>
            </ButtonBase>
            <Popper
                placement="bottom-end"
                className="popper-root"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9],
                            },
                        },
                    ],
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && userData && (
                            <Paper
                                sx={{
                                    width: 290,
                                    minWidth: 240,
                                    maxWidth: 290,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 250,
                                    },
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard elevation={0} border={false} content={false}>
                                        <CardContent sx={{ px: 2.5, pt: 3 }}>
                                            <Grid
                                                container
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Stack
                                                        direction="row"
                                                        spacing={1.25}
                                                        alignItems="center"
                                                    >
                                                        <Stack>
                                                            <Typography
                                                                variant="h6"
                                                                color="primary"
                                                                sx={{
                                                                    fontWeight: 'bold',
                                                                }}
                                                            >
                                                                {userData?.first_name}{' '}
                                                                {userData?.last_name}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                            <Grid>
                                                <Stack>
                                                    <Typography color="textSecondary">
                                                        {userData.email}{' '}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </CardContent>
                                        {open && (
                                            <>
                                                <Box
                                                    sx={{
                                                        borderBottom: 1,
                                                        borderColor: 'divider',
                                                    }}
                                                >
                                                        
                                                </Box>
												<ProfileTab onLogout={handleLogout} />
                                            </>
                                        )}
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        )}
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Profile;
