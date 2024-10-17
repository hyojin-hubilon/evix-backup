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
	Select,
	MenuItem,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import SurveyListItem from './components/SurveyListItem';
import surveyApi from '@/apis/survey';
import { MySurveyList, SurveyApiResponse } from '@/types/survey';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { paginator } from '@/utils/helper';
import DatePicker from "antd/lib/date-picker";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { t } from 'i18next';
dayjs.extend(isBetween);
const { RangePicker } = DatePicker;


const SurveyList = () => {
    const [surveyCount, setSurveyCount] = useState<number>(0); // Survey 개수 상태
    const [ surveyList, setSurveyList ] = useState<MySurveyList[]>([]); // 내 Survey 목록 상태
	const [ searched, setSearched ] = useState<MySurveyList[]>([]);
    const navigate = useNavigate();
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ pageCount, setPageCount ] = useState(0);
	const [ page, setPage] = useState(1);
	const [ itemPerPage, setItemPerPage ] = useState(10);
	const [activeDateSetting, setActiveDateSetting] = useState('full');
	const [ dateSet, setDateSet ] = useState<{startDt: string, endDt: string}>({startDt : '', endDt: ''});
    
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

	
    const handleCreateSurvey = () => {
        navigate('/survey/samples');
    };

	const handleSearch = (text) => {
		setSearchTerm(text);
	}

	const handleChangePage = (_e, value) => {
		setPage(paginator(searched, value, itemPerPage).page);
	}

	const handleChangeDateSetting = (newValue) => {
        setActiveDateSetting(newValue);
		if(newValue == 'full') {
			setDateSet({
				startDt: '',
				endDt: ''
			});
		}
	}

	const onChangeDate = (date, dateString: string[]) => {
		console.log(date, dateString)
		if(date == null) {
			setActiveDateSetting('full')
		}
		setDateSet({
			startDt: dateString[0],
			endDt: dateString[1]
		});
	};


	useEffect(() => {
		let newSearchedList = surveyList.filter(survey => {
			if(dateSet.startDt && dateSet.endDt) {
				if( dayjs(survey.created_at).isSame(dayjs(dateSet.startDt), 'day') || dayjs(survey.created_at).isSame(dayjs(dateSet.endDt), 'day') || dayjs(survey.created_at).isBetween(dayjs(dateSet.startDt), dayjs(dateSet.endDt), 'day') ) return true;
				else return false;
			} else {
				return true;
			}
		});


		if(searchTerm) {
			newSearchedList = newSearchedList.filter(survey => {
				if(survey.title.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				else return false;
			});
		}

		setSearched(newSearchedList);
		setPageCount(Math.ceil(newSearchedList.length/itemPerPage));
		setPage(1);
	}, [dateSet, searchTerm])


    return (
        <Container maxWidth="lg">
            <Grid container flexDirection="row" rowSpacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h3">{t('survey.survey_list')}</Typography>
						{/* Survey 목록 */}
                        <Chip label={surveyCount} color="primary" size="small" />
                    </Box>
                </Grid>

				<Grid
					container
					item
					xs={12}
					sx={{ borderBottom: 1, borderColor: 'divider' }}
					alignItems="center"
					justifyContent="space-between"
					pb={1}
					mt={2}
				>
					<Grid container item xs={10} alignItems="center" justifyContent="space-between">
						<Grid item xs={activeDateSetting == 'full' ? 8 : 5.7}>
							<OutlinedInput size="small" fullWidth sx={{bgcolor: 'white'}} 
								startAdornment={
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								}
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
								placeholder={t('survey.search_placeholder')}
							/>
						</Grid>
						<Grid item xs={activeDateSetting == 'full' ? 3.9 : 2.1}>
							<Select
								size='small'
								onChange={(e) => handleChangeDateSetting(e.target.value)}
								value={activeDateSetting} fullWidth
								sx={{bgcolor: 'white'}}
								>
								<MenuItem value="full">Full Period</MenuItem>
								<MenuItem value="dates">Date Setting</MenuItem>
							</Select>
						</Grid>
						{
							activeDateSetting == 'dates' &&
							<Grid item xs={4}>
								<RangePicker
									placement="bottomRight"
									style={{
										padding: '6px 11px',
										borderRadius: '4px',
										minHeight: '1.4375em',
										borderColor: 'rgba(0, 0, 0, 0.23)'
									}}
									onChange={onChangeDate}
								/>
							</Grid>
						}
					</Grid>
					<Grid item xs={1.9}>
						<Box display="flex" justifyContent="flex-end" width={1}>
							<Button variant="contained" onClick={handleCreateSurvey} fullWidth>
								<PlusOutlined />
								{/* Survey 생성 */}
								<Typography sx={{ ml: 1 }}>{t('survey.new_survey')}</Typography>
							</Button>
						</Box>
					</Grid>
				</Grid>

                {surveyList.length > 0 ? (
                    <>
						{paginator(searched, page, itemPerPage).data.map((survery, index) => {
							return (
								<Grid item xs={12} key={index}>
									<SurveyListItem survey={survery} refresh={fetchSurvey} />
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

							<Box onClick={handleCreateSurvey}
								sx={{
									display:'flex',
									flexDirection: 'column',
									alignItems:'center',
									cursor: 'pointer',
									marginTop: '7%',
									marginBottom: '10%',
									'&:hover' : {
										'.MuiButtonBase-root' : {
											backgroundColor: 'rgba(22, 119, 255, 0.04)'
										}
									}
								}}>
                                <IconButton color="primary">
                                    <PlusOutlined />
                                </IconButton>
								<Typography sx={{ ml: 1 }} variant='h3' fontWeight="normal" color="primary" mt="1rem">
									{t('survey.new_survey')}
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
