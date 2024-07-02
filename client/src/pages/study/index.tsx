import { EditOutlined, FundViewOutlined, PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { Grid, Box, Typography, Chip, Container, Card, Tabs, Tab, Button, useTheme, Avatar, AvatarGroup } from '@mui/material';
import { useState } from 'react';
import aImage1 from '@assets/images/users/avatar-1.png';
import aImage2 from '@assets/images/users/avatar-2.png';

const StudyList = () => {
	const theme = useTheme();
	const [ studyCount, setStudyCount ] = useState(0);
	const [ activeTab, setActiveTab ] = useState('0');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		event.preventDefault();
		setActiveTab(newValue);
	};
	

    return (
		<Container maxWidth="lg">
			<Grid container rowSpacing={3} columnSpacing={2.75}>			
				<Grid container item xs={12}>
					<Box display="flex" alignItems="center" gap={1}>
						<Typography variant="h3">Study 목록</Typography>
						<Chip label={studyCount} color="primary" size="small" />
					</Box>
				</Grid>

				<Grid container item xs={12} sx={{ borderBottom: 1, borderColor: 'divider' }} alignItems="center">
					<Grid item xs={10}>
						<Tabs value={activeTab} onChange={handleChange} aria-label="Study Status Tab">
							{/* 나의 스터디 전체 목록 출력(최근 생성순) */}
							<Tab label="전체" value="0" />
							{/* 내가 생성한(Owner) Study 목록 출력 */}
							<Tab label="My Study" value="1" />
							{/* 내가 매니저인 Study 목록 출력 */}
							<Tab label="Maintainer" value="2" />
							{/* 내가 멤버로 참여된 Study 목록 출력 */}
							<Tab label="Developer" value="3" />
						</Tabs>
					</Grid>
					<Grid container item xs={2} justifyContent="flex-end">
						<Button variant="contained">
							<PlusOutlined /><Typography sx={{ml: 1}}>Study 생성</Typography>
						</Button>
					</Grid>
				</Grid>


				<Grid item xs={12}>
					<Card sx={{bgcolor: theme.palette.primary.lighter, p: "1rem"}}>
						<Grid container>
							<Grid item xs={8}>
								{/* 진행중/배포전/진행종료/일시정지/중단/Demo */}
								<Typography variant="h6" color="primary.main">진행중</Typography>
								<Typography variant="h4">중증 아토피 피부염 임상연구 – 부작용</Typography>
								<Typography sx={{fontSize: "0.7rem", color: theme.palette.grey[500]}}>2024.06.01 ~ 2024.12.31</Typography>
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
				</Grid>
			</Grid>
		</Container>
	);
};

export default StudyList;
