import Breadcrumbs2 from "@/components/@extended/Breadcrumbs2";
import MainCard from "@/components/MainCard";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Box, Button, Chip, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import aImage1 from '@assets/images/users/avatar-1.png';
import CircleChart, { ApexDonutChartSeriesType } from "./components/CircleChart";
import GenderAgeChart from "./components/GenderAgeChart";

const StudyDetail = () => {
	const [ activeTab, setActiveTab ] = useState('0');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		event.preventDefault();
		setActiveTab(newValue);
	};

	const participationCompletionRate: ApexDonutChartSeriesType = {
		labels: ['참여완료율', '미완료율'],
		series: [75, 25]
	};
	
	return (
		<>
			<Breadcrumbs2 />
			<Grid container rowSpacing={3} columnSpacing={1}>
				<Grid container item xs={12}>
					<Box display="flex" alignItems="center" gap={1}>
						<Chip label="진행중" color="primary" />
						<Typography variant="h3">중증 아토피 피부염 임상연구 – 부작용</Typography>
						<Button variant="outlined" sx={{width: "3rem", minWidth: "48px"}}>
							<EditOutlined style={{fontSize: "1.2rem"}} />
						</Button>
					</Box>
				</Grid>

				<Grid container item xs={12} sx={{ borderBottom: 1, borderColor: 'divider' }} alignItems="center">
					<Grid item xs={10}>
						<Tabs value={activeTab} onChange={handleChange} aria-label="Study Status Tab">
							{/* 스터디 결과 요약 정보 */}
							<Tab label="Overview " value="0" />
							{/* 스터디 개요, 연결/과금정보, 멤버관리 */}
							<Tab label="Study Info " value="1" />
							{/* 설문 참여자 상세 리스트 */}
							<Tab label="Participants " value="2" />
							{/* 설문 결과 상세 */}
							<Tab label="Survey Report" value="3" />
						</Tabs>
					</Grid>
					<Grid container item xs={2} justifyContent="flex-end">
						<Box display="flex" gap={1}>
							<Avatar alt="Remy Sharp" src={aImage1} />
							<Box>
								<Typography variant="caption" sx={{mb: "0"}}>Owner</Typography>
								<Typography color="primary">Ben Kim</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>

				<Grid container item columnSpacing={1.5}>
					<Grid item xs={2}>
						<MainCard sx={{height: '190px'}}>
							<CircleChart title="참여완료율" series={participationCompletionRate} />
						</MainCard>
					</Grid>
					<Grid item xs={2}>
						<MainCard sx={{height: '190px'}}>
							<Typography variant="h6" color="textSecondary">
								참여자수
							</Typography>
							<Box>
								<Typography variant="h2" color="primary" sx={{display: 'block', textAlign: 'center', mt: '2rem'}}>1500</Typography>
								<Typography variant="h5" sx={{display: 'block', textAlign: 'center', ml: '2rem'}}>/2000</Typography>
							</Box>
						</MainCard>
					</Grid>
					<Grid item xs={8}>
						<MainCard sx={{height: '190px'}}>
							<GenderAgeChart />
						</MainCard>
					</Grid>
				</Grid>
			</Grid>			
			
		</>
	)
}

export default StudyDetail;