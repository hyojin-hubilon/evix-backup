import { PlusOutlined } from '@ant-design/icons';
import { Grid, Box, Typography, Chip, Container, Tabs, Tab, Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import StudyListItem from './components/StudyListItem';
import StudyInvitedItem from './components/StudyInvitedItem';
import studyApi from '@/api/Study/studyAPI';
interface Study {
	std_no: number;
	title: string;
	std_status: string;
	std_start_date: string;
	std_end_date: string;
}

const StudyList = () => {
	const [ studyCount, setStudyCount ] = useState(0);
	const [activeTab, setActiveTab] = useState('0');
	const [studies, setStudies] = useState<Study[]>([]);

    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const response = await studyApi.myStudyList(1, 4);
                if (response.result && response.code === 200) {
                    setStudies(response.content.studyMyList);
                    setStudyCount(response.content.studyMyList.length);
                }
            } catch (error) {
                console.error('Failed to fetch study list:', error);
            }
        };
        
        fetchStudies();
	}, []);
	
	console.log('studies : ', studies);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		event.preventDefault();
		setActiveTab(newValue);
	};

	// privilege 데이터가 어떻게 올까? 

    return (
		<Container maxWidth="lg">
			<Grid container rowSpacing={3} columnSpacing={2.75}>			
				<Grid container item xs={12}>
					<Box display="flex" alignItems="center" gap={1}>
						<Typography variant="h3">Study 목록</Typography>
						<Chip label={studyCount} color="primary" size="small" />
					</Box>
				</Grid>

				{
					studyCount !== 0 ? //Study가 존재할때
					<>
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

						{studies.map((study) => (
							<Grid item xs={12} key={study.std_no}>
								<StudyListItem study={study} />
							</Grid>
						))}
					</>

					: //Study가 0건일때
					<>
						<Grid container item xs={12} alignItems="center" justifyContent="center" sx={{ pb: 4, borderBottom: 1, borderColor: 'divider' }} >
							<Box display="flex" flexDirection="column" alignItems="center">
								<IconButton color="primary">
									<PlusOutlined />
								</IconButton>
								<Typography sx={{
									mt: 1,
									cursor: "pointer",
									'&:hover' : {textDecoration: "underline"}
								}} color="primary" variant="h5">Study 생성</Typography>
							</Box>
						</Grid>


						<Grid container xs={12} direction="column">
							<Box m={1}>
								<Typography color="primary" variant="caption">OOO</Typography>님, 초대 받은 Study가 있습니다.
							</Box>
							<StudyInvitedItem />
						</Grid>
					</>
				}

				
				
			</Grid>
		</Container>
	);
};

export default StudyList;
