import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    Box,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
} from '@mui/material';

// project import
import MainCard from '@components/MainCard';
import Transitions from '@components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, NotificationOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import notificationApi from '@/apis/notification';
import { ResCommonSuccess } from '@/apis/axios-common';
import { NotificationResponse } from '@/types/notification';
import SanitizeHTML from '@/components/@extended/SanitizeHtml';

// sx styles
const listSx = {
    p: 0,
    '& .MuiListItemButton-root': {
        py: 0.5,
        '& .MuiAvatar-root': {
            width: 36,
            height: 36,
            fontSize: '1rem',
        },
        '& .MuiListItemSecondaryAction-root': {
            mt: '6px',
            ml: 1,
            alignSelf: 'flex-start',
            transform: 'none',
        },
    },
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const anchorRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
    const [notificationCount, setNotificationCount] = useState<Number>(0);

    useEffect(() => {
        fetchNotificationCount();
    }, []);

    const handleToggle = () => {
        if (notificationCount === 0) return;
        setOpen((prevOpen) => !prevOpen);
        fetchRecentNotifications();
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';
    const iconBackColor = 'grey.100';

    const handleViewAll = () => {
        navigate('/settings/notifications');
        setOpen(false);
    };

    const handleMarkAllAsRead = async () => {
        try {
            const response = await notificationApi.readAllNotifications();
            if (response.code === 200 && response.content) {
                setNotificationCount(0);
                setOpen(false);
            }
        } catch (error) {
            console.error('Failed to mark all notifications as read:', error);
        }
    };

    const fetchNotificationCount = async () => {
        try {
            const response = await notificationApi.getUnreadNotificationCount();

            if (response.code === 200 && response.content) {
                setNotificationCount(response.content);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const fetchRecentNotifications = async () => {
        try {
            const response: ResCommonSuccess<NotificationResponse[]> =
                await notificationApi.getRecentNotifications();

            if (response.code === 200 && response.content) {
                const unreadNotifications = response.content.filter(
                    (notification) => notification.checked_at === null
                );
                setNotifications(unreadNotifications);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                disableRipple
                color="secondary"
                sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {/* <Badge badgeContent={4} color="primary">
                    <BellOutlined />
                </Badge> */}
                {/* 알림 여부 빨간 점으로 표시되도록 */}
                <Badge
                    badgeContent={Number(notificationCount) > 0 ? undefined : 0}
                    color="error"
                    variant={Number(notificationCount) > 0 ? 'dot' : 'standard'}
                >
                    <BellOutlined />
                </Badge>
            </IconButton>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
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
                                offset: [matchesXs ? -5 : 0, 9],
                            },
                        },
                    ],
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                width: '100%',
                                minWidth: 285,
                                maxWidth: 420,
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: 285,
                                },
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="Notification"
                                    elevation={0}
                                    border={false}
                                    content={false}
                                    secondary={
                                        <>
                                            <IconButton size="small" onClick={handleMarkAllAsRead}>
                                                <Typography
                                                    variant="body2"
                                                    color="primary"
                                                    sx={{ textDecoration: 'underline' }}
                                                >
                                                    Mark All as Read
                                                </Typography>
                                            </IconButton>
                                            <IconButton size="small" onClick={handleToggle}>
                                                <CloseOutlined />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <List component="nav" sx={listSx}>
                                        {notifications.map((notification) => (
                                            <div key={notification.notification_no}>
                                                <ListItemButton>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            sx={{
                                                                color: 'success.main',
                                                                bgcolor: 'success.lighter',
                                                            }}
                                                        >
                                                            <NotificationOutlined />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="h6">
																<SanitizeHTML html={notification.notification_content} options={null}/>
                                                            </Typography>
                                                        }
                                                        secondary={new Date(
                                                            notification.created_at
                                                        ).toLocaleString()}
                                                    />
                                                </ListItemButton>
                                                <Divider />
                                            </div>
                                        ))}
                                        <ListItemButton
                                            sx={{ textAlign: 'center', py: '12px !important' }}
                                            onClick={handleViewAll}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6" color="primary">
                                                        View All
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Notification;
