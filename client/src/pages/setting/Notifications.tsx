import { useEffect, useState } from 'react';
import MainCard from '@/components/MainCard';
import { NotificationOutlined, UserOutlined } from '@ant-design/icons';
import {
    Avatar,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Pagination,
    Typography,
} from '@mui/material';
import notificationApi from '@/apis/notification';
import { NotificationResponse } from '@/types/notification';
import { ResCommonSuccess } from '@/apis/axios-common';
import SanitizeHTML from '@/components/@extended/SanitizeHtml';
import { paginator } from '@/utils/helper';
import { t } from 'i18next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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
	const [ searched, setSearched ] = useState<NotificationResponse[]>([]);
	const [ pageCount, setPageCount ] = useState(0);
	const [ page, setPage] = useState(1);
	const itemPerPage = 10;
	

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    const fetchAllNotifications = async () => {
        try {
            const response: ResCommonSuccess<NotificationResponse[]> =
                await notificationApi.getAllNotifications();

            if (response.code === 200 && response.content) {
                setNotifications(response.content);
				setSearched(response.content);
				setPageCount(Math.ceil(response.content.length/itemPerPage));
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

	const handleChangePage = (_e, value) => {
		setPage(paginator(searched, value, itemPerPage).page);
	}

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
					{
						searched.length === 0 ?
						<ListItem sx={{textAlign: 'center', display: 'block', p: '1rem'}}>{t('settings.no_notifications_yet')}</ListItem>
						:
						paginator(searched, page, itemPerPage).data.map((notification : NotificationResponse, index) => {
							return (
								<div key={notification.notification_no}>
									<ListItemButton>
										<ListItemAvatar>
											{
												notification.notification_type.includes('INVITATION') ?
												<Avatar
												sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}
											>
												<UserOutlined />
											</Avatar>
												:
												<Avatar
												sx={{ color: 'success.main', bgcolor: 'success.lighter' }}
											>
												<NotificationOutlined />
											</Avatar>
											}
											
										</ListItemAvatar>
										<ListItemText
											primary={
												<Typography variant="h6">
													<SanitizeHTML html={notification.notification_content} options={null}/>
												</Typography>
											}
											secondary={dayjs.utc(notification.created_at).local().format('YYYY-MM-DD')}
										/>
										<ListItemSecondaryAction>
											<Typography variant="caption" noWrap>
												{dayjs.utc(notification.created_at).local().format('A HH:mm:ss')}
											</Typography>
										</ListItemSecondaryAction>
									</ListItemButton>
									<Divider />
								</div>
							)
						})
					}
				
                </List>
            </MainCard>

			{
				pageCount > 0 &&  
				<Grid item container xs={12} justifyContent="center" mt="2rem">
					<Pagination
						count={pageCount}
						page={page}
						onChange={handleChangePage}
						color="primary"
					/>
				</Grid>
			}
        </Container>
    );
};

export default Notifications;
