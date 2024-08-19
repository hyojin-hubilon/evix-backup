import MainCard from "@/components/MainCard";
import { GiftOutlined, MessageOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Container, Divider, Grid, List, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Pagination, Typography } from "@mui/material";
import { paginator } from '@/utils/helper';
import { useState } from "react";

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
	const [ pageCount, setPageCount ] = useState(0);
	const [ page, setPage] = useState(1);
	const [ itemPerPage, setItemPerPage ] = useState(10);

	const [ notification, setNotification] = useState<[]>([]);
	const [searched, setSearched] = useState<[]>([]);

	const handleChangePage = (_e, value) => {
		setPage(paginator(searched, value, itemPerPage).page);
	}

	
	return(
		<Container maxWidth="md">
			<MainCard 
				title="Notification"
				elevation={0}
				border={false}
				content={false}
				boxShadow
				>


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
					<ListItemButton>
						<ListItemAvatar>
							<Avatar
								sx={{
									color: 'success.main',
									bgcolor: 'success.lighter',
								}}
							>
								<GiftOutlined />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography variant="h6">
									It&apos;s{' '}
									<Typography
										component="span"
										variant="subtitle1"
									>
										Cristina danny&apos;s
									</Typography>{' '}
									birthday today.
								</Typography>
							}
							secondary="2 min ago"
						/>
						<ListItemSecondaryAction>
							<Typography variant="caption" noWrap>
								3:00 AM
							</Typography>
						</ListItemSecondaryAction>
					</ListItemButton>
					<Divider />
					<ListItemButton>
						<ListItemAvatar>
							<Avatar
								sx={{
									color: 'primary.main',
									bgcolor: 'primary.lighter',
								}}
							>
								<MessageOutlined />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography variant="h6">
									<Typography
										component="span"
										variant="subtitle1"
									>
										Aida Burg
									</Typography>{' '}
									commented your post.
								</Typography>
							}
							secondary="5 August"
						/>
						<ListItemSecondaryAction>
							<Typography variant="caption" noWrap>
								6:00 PM
							</Typography>
						</ListItemSecondaryAction>
					</ListItemButton>
					<Divider />
					<ListItemButton>
						<ListItemAvatar>
							<Avatar
								sx={{
									color: 'error.main',
									bgcolor: 'error.lighter',
								}}
							>
								<SettingOutlined />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography variant="h6">
									Your Profile is Complete &nbsp;
									<Typography
										component="span"
										variant="subtitle1"
									>
										60%
									</Typography>{' '}
								</Typography>
							}
							secondary="7 hours ago"
						/>
						<ListItemSecondaryAction>
							<Typography variant="caption" noWrap>
								2:45 PM
							</Typography>
						</ListItemSecondaryAction>
					</ListItemButton>
					<Divider />
					<ListItemButton>
						<ListItemAvatar>
							<Avatar
								sx={{
									color: 'primary.main',
									bgcolor: 'primary.lighter',
								}}
							>
								C
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography variant="h6">
									<Typography
										component="span"
										variant="subtitle1"
									>
										Cristina Danny
									</Typography>{' '}
									invited to join{' '}
									<Typography
										component="span"
										variant="subtitle1"
									>
										Meeting.
									</Typography>
								</Typography>
							}
							secondary="Daily scrum meeting time"
						/>
						<ListItemSecondaryAction>
							<Typography variant="caption" noWrap>
								9:10 PM
							</Typography>
						</ListItemSecondaryAction>
					</ListItemButton>
					<Divider />
					{
							pageCount > 0 &&  
							<Grid container xs={12} justifyContent="center">
								<Pagination
									count={pageCount}
									page={page}
									onChange={handleChangePage}
									color="primary"
								/>
							</Grid>
						}
				</List>
			</MainCard>
		</Container>
	)
}

export default Notifications;