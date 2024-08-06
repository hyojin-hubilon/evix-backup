import { PlusOutlined } from '@ant-design/icons';
import {
    Grid,
    Box,
    Typography,
    Chip,
    Container,
    Button,
    IconButton,
	OutlinedInput,
	InputAdornment,
	Pagination,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import SurveyListItem from './components/SurveyListItem';
import surveyApi from '@/apis/survey';
import { MySurveyList, SurveyApiResponse } from '@/types/survey';
import { useNavigate } from 'react-router-dom';
import { getDecodedToken } from '@/utils/Cookie';
import SearchIcon from '@mui/icons-material/Search';
import { paginator } from '@/utils/helper';

const SurveyList = () => {
    const [surveyCount, setSurveyCount] = useState<number>(0); // Survey 개수 상태
    const [activeTab, setActiveTab] = useState<string>('0'); // 활성 탭 상태
    const [ surveyList, setSurveyList ] = useState<MySurveyList[]>([]); // 내 Survey 목록 상태
	const [ searched, setSearched ] = useState<MySurveyList[]>([]);
    const navigate = useNavigate();
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ pageCount, setPageCount ] = useState(0);
	const [ page, setPage] = useState(1);
	const [ itemPerPage, setItemPerPage ] = useState(10);
    

	const decodedToken = getDecodedToken('userInfoToken');
	const userNo = decodedToken['user-no'];

    // Surrvey 데이터 불러오기
    const fetchSurvey = async () => {
        try {
            const response = await surveyApi.mySurveyList();
            if (response.result && response.code === 200) {
				const newSurveyList = response.content.surveyMyList ?? [];
				setSurveyList(newSurveyList);
				setSearched(newSurveyList);
                setSurveyCount(newSurveyList.length);
				setPageCount(Math.ceil(newSurveyList.length/itemPerPage));
            }
        } catch (error) {
            console.error('Failed to fetch study list:', error);
        }
    };

    
    useEffect(() => {
		fetchSurvey();	
    }, []);

	
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setActiveTab(newValue);
    };

    const handleCreateSurvey = () => {
        navigate('/survey/samples');
    };

	const handleSearch = (text) => {
		setSearchTerm(text);
	}

	const handleChangePage = (_e, value) => {
		setPage(paginator(searched, value, itemPerPage).page);
	}


    return (
        <Container maxWidth="lg">
            <Grid container flexDirection="row" rowSpacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h3">Survey 목록</Typography>
                        <Chip label={surveyCount} color="primary" size="small" />
                    </Box>
                </Grid>

                {surveyList.length > 0 ? (
                    <>
                        <Grid
                            container
                            item
                            xs={12}
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                            alignItems="center"
							justifyContent="space-between"
							pb={1}
							mt={2}
							columnGap={1}
                        >
                            {/* <Grid item xs={8}>
                                <Tabs
                                    value={activeTab}
                                    onChange={handleChange}
                                    aria-label="survey-status-tab"
                                >
                                    <Tab label="전체" value="0" />
                                    <Tab label="내 설문" value="1" />
                                    <Tab label="작성중 설문" value="2" />
                                    <Tab label="참여중인 Study 설문" value="3" />
                                </Tabs>
                            </Grid> */}
                            <Grid item xs={6}>
								<OutlinedInput size="small" fullWidth sx={{bgcolor: 'white'}} 
									startAdornment={
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									}
									value={searchTerm}
									onChange={(e) => handleSearch(e.target.value)}
									placeholder='타이틀'
								/>
                            </Grid>
							<Grid item xs={3.8}>
								<Box display="flex" justifyContent="flex-end" width={1}>
									<Button variant="contained" onClick={handleCreateSurvey}>
										<PlusOutlined />
										<Typography sx={{ ml: 1 }}>Survey 생성</Typography>
									</Button>
								</Box>
							</Grid>
                        </Grid>

						{paginator(searched, page, itemPerPage).data.map((survery, index) => {
							return (
								<Grid item xs={12} key={index}>
									<SurveyListItem survey={survery} userNo={userNo} refresh={fetchSurvey} />
								</Grid>
							)
						})}
						{
							pageCount > 0 &&  
							<Grid item container xs={12} justifyContent="center">
								<Pagination
									count={pageCount}
									page={page}
									onChange={handleChangePage}
									color="primary"
								/>
							</Grid>
						}
					
                    </>
                ) : (
                    <>
                        <Grid
                            container
                            item
                            xs={12}
                            alignItems="center"
                            justifyContent="center"
                            sx={{ pb: 4, borderBottom: 1, borderColor: 'divider' }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <IconButton color="primary" onClick={handleCreateSurvey}>
                                    <PlusOutlined />
                                </IconButton>
                                <Typography
                                    sx={{
                                        mt: 1,
                                        cursor: 'pointer',
                                        '&:hover': { textDecoration: 'underline' },
                                    }}
                                    color="primary"
                                    variant="h5"
                                    onClick={handleCreateSurvey}
                                >
                                    Survey 생성
                                </Typography>
                            </Box>
                        </Grid>
                    </>
                )}

                
            </Grid>
        </Container>
    );
};

export default SurveyList;
