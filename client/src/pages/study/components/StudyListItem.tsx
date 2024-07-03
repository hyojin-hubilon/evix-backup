import { EditOutlined, FundViewOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, AvatarGroup, Box, Button, Card, Grid, Typography, useTheme } from "@mui/material";
import aImage1 from '@assets/images/users/avatar-1.png';
import aImage2 from '@assets/images/users/avatar-2.png';

const StudyListItem = () => {
	const theme = useTheme();
	return (
		<Card sx={{bgcolor: theme.palette.primary.lighter, p: "1rem"}}>
			<Grid container>
				<Grid item xs={8}>
					{/* 진행중/배포전/진행종료/일시정지/중단/Demo */}
					<Typography variant="h6" color="primary.main">진행중</Typography>
					<Typography variant="h4">중증 아토피 피부염 임상연구 – 부작용</Typography>
					<Typography variant="caption" sx={{color: theme.palette.grey[500]}}>2024.06.01 ~ 2024.12.31</Typography>
					<Box display="flex" mt={1}>
						<AvatarGroup total={4}>
							<Avatar alt="Remy Sharp" src={aImage1} />
							<Avatar alt="Travis Howard" src={aImage2} />
							<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
						</AvatarGroup>
					</Box>
				</Grid>
				<Grid item container xs={4} alignItems="center" justifyContent="flex-end" gap={1}>
					{/* 멤버초대 */}
					<Button size="large" variant="outlined">
						<UserAddOutlined style={{fontSize: "1.5rem"}} />
					</Button>
					
					{/* 수정 */}
					<Button size="large" variant="outlined">
						<EditOutlined style={{fontSize: "1.5rem"}} />
					</Button>
					
					{/* Overview  */}
					<Button size="large" variant="outlined">
						<FundViewOutlined style={{fontSize: "1.5rem"}} />
					</Button>
				</Grid>
			</Grid>
		</Card>
	)
}

export default StudyListItem;