import MainCard from "@/components/MainCard";
import { LinkOutlined } from "@ant-design/icons";
import { Box, Grid, List, ListItem, Typography, Button, Chip, Card, useTheme, Divider, Link } from "@mui/material";
import StudyMemberStatus from "./study-info/StudyMemberStatus";

const StudyInfo = () => {

	const theme = useTheme();

	return (
		<Grid container item rowSpacing={2} className="study-info">
			<Grid item xs={12}>
				<Typography variant="h5">Study 상태</Typography>
				<MainCard>
					<List>
						<ListItem>
							<Typography variant="h5">Study Status</Typography>
							<Box display="flex" gap={1}>
								<Typography variant="h6" color="primary">진행중</Typography>
								<Typography>(최근 업데이트 2024.06.27)</Typography>

								{/* <Typography variant="h6" color="error">진행중단</Typography> */}
								
							</Box>
						</ListItem>
						<ListItem>
							<Typography variant="h5">Study 기간</Typography>
							<Box display="flex" gap={1}>
								<Typography>2024.06.01 ~ 2024.12.31</Typography>
							</Box>
						</ListItem>
						<ListItem>
							<Typography variant="h5">유료이용기간</Typography>
							<Box display="flex" gap={1} alignItems="center">
								{/* 진행중, 혹은 오너가 중단처리했을때  */}
								<Typography>2024.05.28 ~ 2024.08.31</Typography>
								<Typography color="error">(만료 67일전)</Typography>
								
								{/* 유료이용기간 만료 - 진행중단 상태일때  */}
								{/* <Typography>유료이용기간이 만료되었습니다. 연장결제 후 다시 진행 가능합니다.</Typography> */}

								{/* 종료
									<Typography>2024.05.28 ~ 2024.08.31</Typography> */}
								
								{/* 종료 : 연장 결제하기 버튼 안나옴 */}
								<Button variant="contained" size="small">연장결제하기</Button>
								
								<Button variant="outlined" size="small">지난 결제내역</Button>
							</Box>
						</ListItem>
					</List>
				</MainCard>
			</Grid>
			<Grid container item columnSpacing={1.5}>
				<Grid item xs={7}>
					<Typography variant="h5">Study 개요</Typography>
				</Grid>
				<Grid item xs={5}>
					<Box display="flex" gap={1} alignItems="center">
						<LinkOutlined style={{marginBottom: "0.5rem", color: theme.palette.grey[500]}} />
						<Typography variant="h5">연결정보</Typography>
					</Box>
				</Grid>
				<Grid item xs={7} alignSelf="stretch">
					<MainCard sx={{height:"100%"}}>
						<List>
							<ListItem>
								<Typography variant="h5">Study 타입</Typography>
								<Box display="flex" gap={1}>
									<Chip color="primary" label="ePRO" />
								</Box>
							</ListItem>
							<ListItem>
								<Typography variant="h5">Study 제목</Typography>
								<Box display="flex" gap={1}>
									<Typography>중증 아토피 피부염 임상연구 – 부작용</Typography>
								</Box>
							</ListItem>
							<ListItem>
								<Typography variant="h5">대상인원</Typography>
								<Box display="flex" gap={1}>
									<Typography>2,000 명</Typography>
								</Box>
							</ListItem>
							<ListItem>
								<Typography variant="h5">개요</Typography>
								<Box display="flex" gap={1}>
									<Typography>피부염 특수 환자군 최근 1년간 부작용 발생 모니터링</Typography>
								</Box>
							</ListItem>
							<ListItem>
								<Typography variant="h5">질환</Typography>
								<Box display="flex" gap={1}>
									<Typography>아토피성 피부염</Typography>
								</Box>
							</ListItem>
							<ListItem sx={{alignItems: "flex-start"}}>
								<Typography variant="h5">의약품 정보</Typography>
								<Box>
									<Typography>더마플라스트스포트(DermaplastSport)</Typography>
									<Card sx={{
										backgroundColor: theme.palette.grey[100],
										boxShadow: 'none',
										p: '0.5rem',
										mt: '0.5rem'
									}}>
										<ul style={{margin:0, paddingLeft: '1.5rem', listStyle:'disc' }}>
											<li>업체명: (주)나음케어</li>
											<li>품목기준코드: 200410177</li>
											<li>품목구분: 의약품</li>
											<li>허가번호: 8</li>
											<li>허가일: 2004-06-24</li>
										</ul>
									</Card>
								</Box>
							</ListItem>
						
						</List>
					</MainCard>
				</Grid>
				<Grid item xs={5} alignSelf="stretch">
					<MainCard sx={{height:"100%"}}>
						<Typography variant="h5">Survey</Typography>
						<List sx={{
							listStyle: 'disc', 
							pl: '20px',
							'li': {
								display: 'list-item',
								pl:0,
								pb:0
							}}}>
							<ListItem>
								<Box display="flex" gap={1}>
									<Link>Survey_abc_20240125</Link>
									<Typography>월마다 1회반복</Typography>
								</Box>
							</ListItem>
							<ListItem>
								<Box display="flex" gap={1}>
									<Link>atopic dermatitis_2024</Link>
									<Typography>주마다 1회반복</Typography>
								</Box>
							</ListItem>
						</List>

						<Divider sx={{mt: '1rem', mb:'1rem'}} />
						
						<Typography variant="h5">전자동의서</Typography>
						<List sx={{
							listStyle: 'disc', 
							pl: '20px',
							'li': {
								display: 'list-item',
								pl:0,
								pb:0
							}}}>
							<ListItem>
								<Link>개인정보 제공 및 참여 동의서</Link>
							</ListItem>
						</List>
					</MainCard>
				</Grid>
			</Grid>

			<Grid item xs={12}>
				<Grid item container>
					<Grid item xs={10}>
						<Box display="flex" alignItems="center" gap={1}>
							<Typography variant="h5">Study 멤버현황</Typography>
							<Typography variant="caption" sx={{mb: '0.5rem'}}>*최근 승인일 순으로 보여집니다.</Typography>
						</Box>
					</Grid>
					<Grid item xs={2}>
						<Box display="flex"justifyContent="flex-end">
							<Button size="small" sx={{mb: "0.3rem"}} variant="contained">멤버관리</Button>
						</Box>
					</Grid>
				</Grid>
				<MainCard>
					<StudyMemberStatus />
				</MainCard>
			</Grid>
		</Grid>
	)
}

export default StudyInfo;