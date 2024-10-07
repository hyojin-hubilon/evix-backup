import { useEffect, useState } from 'react';
import MainCard from '@/components/MainCard';
import { NotificationOutlined } from '@ant-design/icons';
import {
    Avatar,
    Container,
    Divider,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@mui/material';
import notificationApi from '@/apis/notification';
import { NotificationResponse } from '@/types/notification';
import { ResCommonSuccess } from '@/apis/axios-common';
import SanitizeHTML from '@/components/@extended/SanitizeHtml';

const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem',
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none',
};

const Notifications = () => {
    const [notifications, setNotifications] = useState<NotificationResponse[]>([]);

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    const fetchAllNotifications = async () => {
        try {
            const response: ResCommonSuccess<NotificationResponse[]> =
                await notificationApi.getAllNotifications();

            if (response.code === 200 && response.content) {
                setNotifications(response.content);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <MainCard title="Notification" elevation={0} border={false} content={false} boxShadow>
                <List
                    component="nav"
                    sx={{
                        p: 0,
                        '& .MuiListItemButton-root': {
                            py: 0.5,
                            '& .MuiAvatar-root': avatarSX,
                            '& .MuiListItemSecondaryAction-root': {
                                ...actionSX,
                                position: 'relative',
                            },
                        },
                    }}
                >
                    {notifications.map((notification) => (
                        <div key={notification.notification_no}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{ color: 'success.main', bgcolor: 'success.lighter' }}
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
                                    secondary={new Date(notification.created_at).toLocaleString()}
                                />
                                <ListItemSecondaryAction>
                                    <Typography variant="caption" noWrap>
                                        {new Date(notification.created_at).toLocaleTimeString()}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                            <Divider />
                        </div>
                    ))}
                </List>
            </MainCard>
        </Container>
    );
};

export default Notifications;
