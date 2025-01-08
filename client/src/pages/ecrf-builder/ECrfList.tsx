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
import ECrfListItem from './components/ECrfListItem';
import ecrfApi from '@/apis/ecrf';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { paginator } from '@/utils/helper';
import DatePicker from "antd/lib/date-picker";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { t } from 'i18next';
import { MyCRFList } from '@/types/ecrf';
import PreivewDialog from './components/PreviewDialog';
dayjs.extend(isBetween);
const { RangePicker } = DatePicker;


const ECrfList = () => {
    const [ count, setCount] = useState<number>(0);
    const [ crfList, setCrfList ] = useState<MyCRFList[]>([]); // 내 Survey 목록 상태
	const [ searched, setSearched ] = useState<MyCRFList[]>([]);
    const navigate = useNavigate();
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ pageCount, setPageCount ] = useState(0);
	const [ page, setPage] = useState(1);
	const [ itemPerPage, setItemPerPage ] = useState(10);
	const [activeDateSetting, setActiveDateSetting] = useState('full');
	const [ dateSet, setDateSet ] = useState<{startDt: string, endDt: string}>({startDt : '', endDt: ''});


	const [previewOpen, setPreviewOpen] = useState(false);
	const [selectedCrfNo, setSelectedCrfNo] = useState<number | null>(null);
	const handleCloseDialog = () => {
		setPreviewOpen(false);
	}
    
    // Surrvey 데이터 불러오기
    const fetchCrf = async () => {
        try {
            const response = await ecrfApi.getCRFList();
            if (response.result && response.code === 200) {
				const newCrfList = response.content ?? [];
				console.log(newCrfList);
				
				setCrfList(newCrfList);
				setSearched(newCrfList);
                setCount(newCrfList.length);
				setPageCount(Math.ceil(newCrfList.length/itemPerPage));
            }
        } catch (error) {
            console.error('Failed to fetch study list:', error);
        }
    };

    
    useEffect(() => {
		void fetchCrf();	
    }, []);

	
    const handleCreateCrf = () => {
        navigate('/e-crf/builder');
    };

	const handleSearch = (text:string) => {
		setSearchTerm(text);
	}

	const handleChangePage = (_e, value:number) => {
		setPage(paginator(searched, value, itemPerPage).page);
	}

	const handleChangeDateSetting = (newValue:string) => {
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
		let newSearchedList = crfList.filter(crf => {
			if(dateSet.startDt && dateSet.endDt) {
				if( dayjs(crf.created_at).isSame(dayjs(dateSet.startDt), 'day') || dayjs(crf.created_at).isSame(dayjs(dateSet.endDt), 'day') || dayjs(crf.created_at).isBetween(dayjs(dateSet.startDt), dayjs(dateSet.endDt), 'day') ) return true;
				else return false;
			} else {
				return true;
			}
		});


		if(searchTerm) {
			newSearchedList = newSearchedList.filter(crf => {
				if(crf.crf_title.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				else return false;
			});
		}

		setSearched(newSearchedList);
		setPageCount(Math.ceil(newSearchedList.length/itemPerPage));
		setPage(1);
	}, [dateSet, searchTerm])

	const handlePreview = (crfNo:number) => {
		setSelectedCrfNo(crfNo);
		setPreviewOpen(true);
	}


    return (
        <Container maxWidth="lg">
            <Grid container flexDirection="row" rowSpacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h3">{t('ecrf.ecrf')}</Typography>
                        <Chip label={count} color="primary" size="small" />
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
							<Button variant="contained" onClick={handleCreateCrf} fullWidth>
								<PlusOutlined />
								{/* E-CRF 생성 */}
								<Typography sx={{ ml: 1 }}>{t('ecrf.add_new')}</Typography>
							</Button>
						</Box>
					</Grid>
				</Grid>

                {crfList.length > 0 ? (
                    <>
						{paginator(searched, page, itemPerPage).data.map((crf, index) => {
							
							return (
								<Grid item xs={12} key={index}>
									<ECrfListItem crf={crf} refresh={fetchCrf} preivew={(crfNo:number) => handlePreview(crfNo)} />
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

							<Box onClick={handleCreateCrf}
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
									{t('ecrf.add_new')}
								</Typography>
                            </Box>                            
                        </Grid>
                    </>
                )}                
            </Grid>
			<PreivewDialog isOpen={previewOpen} handleClose={handleCloseDialog} selectedCrf={selectedCrfNo} />
        </Container>
    );
};

export default ECrfList;
