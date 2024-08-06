import { PlusOutlined } from '@ant-design/icons';
import {
    Grid,
    Box,
    Typography,
    Chip,
    Container,
    Tabs,
    Tab,
    Button,
    IconButton,
    OutlinedInput,
	InputAdornment,
	Select,
	MenuItem,
	Pagination,
} from '@mui/material';
import { useEffect, useState } from 'react';
import StudyListItem from './components/StudyListItem';
import studyApi from '@/apis/study';
import { MyStudyList, StudyApiResponse } from '@/types/study';
import { getDecodedToken } from '@/utils/Cookie';
import StudyInvitedItem from './components/StudyInvitedItem';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import EastIcon from '@mui/icons-material/East';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
import DatePicker, { DatePickerProps } from "antd/lib/date-picker";
import { paginator } from '@/utils/helper';
const { RangePicker } = DatePicker;

const StudyList = () => {
    const [studyCount, setStudyCount] = useState<number>(0); // Study 개수 상태
    const [activeTab, setActiveTab] = useState<string>('0'); // 활성 탭 상태
    const [studies, setStudies] = useState<MyStudyList[]>([]); // 내 Study 목록 상태
	const [ searched, setSearched ] = useState<MyStudyList[]>([]);
    const [invitedStudies, setInvitedStudies] = useState<any[]>([]); // 초대 받은 스터디 목록 상태
    const [fullName, setFullName] = useState<string>(''); // 사용자 전체 이름 상태
	const [ searchTerm, setSearchTerm] = useState('');
	const [activeDateSetting, setActiveDateSetting] = useState('full');
	const [ dateSet, setDateSet ] = useState<{startDt: string, endDt: string}>({startDt : '', endDt: ''});
	const [ pageCount, setPageCount ] = useState(0);
	const [ page, setPage] = useState(1);
	const [ itemPerPage, setItemPerPage ] = useState(10);
    const navigate = useNavigate();

    // Study 데이터 불러오기
    const fetchStudies = async () => {
        try {
            const response: StudyApiResponse = await studyApi.fullMyStudyList(); // TODO: 창덕님께 수정 요청(페이징 필요 없음) -> 페이징 10 으로 수정 -> 더보기 없음 > 페이징 뺌
            if (response.result && response.code === 200) {
                const studyList = response.content?.studyMyList ?? [];
                setStudies(studyList);
				setSearched(studyList);
                setStudyCount(studyList.length);
				setPageCount(Math.ceil(studyList.length/itemPerPage));
            }
        } catch (error) {
            console.error('Failed to fetch study list:', error);
        }
    };

    // 초대 받은 Study 데이터 불러오기
    const fetchInvitedStudies = async () => {
        try {
            const response: any = await studyApi.unauthorizedInvitation();
            setInvitedStudies(response.content);

            const userInfo: string = getDecodedToken('userInfoToken');
            if (userInfo) {
                const fullName = `${userInfo['user-firstname']} ${userInfo['user-lastname']}`;
                setFullName(fullName);
            }
        } catch (error) {
            console.error('Failed to fetch Invited Study List:', error);
        }
    };

    useEffect(() => {
        fetchStudies();
        // fetchInvitedStudies();
    }, []);

    const handleChange = (newValue: string) => {
        setActiveTab(newValue);
    };

    const handleCreateStudy = () => {
        navigate('/study/new', { state: { mode: 'write' } });
        // navigate('/study/new');
    };

    // 초대 승인 성공 시,
    const handleAcceptInvite = async () => {
        try {
            fetchStudies();
            fetchInvitedStudies();
        } catch (error) {
            console.error('Failed to accept invitation:', error);
        }
    };

	const handleSearchStudy = (text) => {
		setSearchTerm(text);
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

	const handleChangePage = (_e, value) => {
		setPage(paginator(searched, value, itemPerPage).page);
	}


	useEffect(() => {
		let newSearchedList = studies.filter(study => {
			if(dateSet.startDt && dateSet.endDt) {
				if(dayjs(dateSet.startDt).isSameOrBefore(dayjs(study.std_start_date)) && dayjs(study.std_end_date).isSameOrBefore(dayjs(dateSet.endDt))) return true;
				else return false;
			} else {
				return true;
			}
		});


		if(searchTerm) {
			newSearchedList = newSearchedList.filter(study => {
				if(study.title.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				else if(study.disease.toLowerCase().includes(searchTerm.toLowerCase())) return true;
				else return false;
			});
		}

		newSearchedList = newSearchedList.filter((study) => {
			if (activeTab === '0') return true;
			if (activeTab === '1' && study.std_privilege === 'OWNER')
				return true;
			if (activeTab === '2' && study.std_privilege === 'MAINTAINER' || activeTab === '3' && study.std_privilege === 'DEVELOPER')
				return true;
			return false;
		})

		setSearched(newSearchedList);
		setPageCount(Math.ceil(newSearchedList.length/itemPerPage));
		setPage(1);
	}, [dateSet, searchTerm, activeTab])

    return (
        <Container maxWidth="lg">
            <Grid container flexDirection="row" rowSpacing={2}>
                <Grid container item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h3">Study 목록</Typography>
                        <Chip label={studyCount} color="primary" size="small" />
                    </Box>
                   
                </Grid>

                {studyCount !== 0 ? (
                    <>
                        <Grid
                            container
                            item
                            xs={12}
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                            alignItems="center"
							pb={1}
							mt={2}
							columnGap={1}
                        >
                            {/* <Grid item xs={8}>
                                <Tabs
                                    value={activeTab}
                                    onChange={handleChange}
                                    aria-label="Study Status Tab"
                                >
                                    <Tab label="전체" value="0" />
                                    <Tab label="My Study" value="1" />
                                    <Tab label="Maintainer" value="2" />
                                    <Tab label="Developer" value="3" />
                                </Tabs>
                            </Grid> */}
                            <Grid item xs={activeDateSetting == 'full' ? 5.9 : 4.5}>
								<OutlinedInput size="small" fullWidth sx={{bgcolor: 'white'}} 
									startAdornment={
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									}
									value={searchTerm}
									onChange={(e) => handleSearchStudy(e.target.value)}
									placeholder='타이틀, 질환명, 상태 검색'
								/>
                            </Grid>
							<Grid item xs={activeDateSetting == 'full' ? 2 : 1.6}>
								<Select
									size='small'
									onChange={(e) => handleChange(e.target.value)}
									value={activeTab} fullWidth
									sx={{bgcolor: 'white'}}
									>
									<MenuItem value="0">All Studies</MenuItem>
									<MenuItem value="1">My Studies</MenuItem>
									<MenuItem value="2">Included Studies</MenuItem>
								</Select>
								{/* My Studies : Owner, Included Studies : MAINTAINER, DEVELOPER */}
							</Grid>
							<Grid item xs={activeDateSetting == 'full' ? 2 : 1.5}>
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
								<Grid item xs={2.5}>
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
							<Grid item xs={activeDateSetting == 'full' ? 1.7 : 1.5}>
								<Button variant="contained" onClick={handleCreateStudy} sx={{ ml: 'auto' }} fullWidth>
									<PlusOutlined />
									<Typography sx={{ ml: 1 }}>Study 생성</Typography>
								</Button>
							</Grid>
                        </Grid>

						{paginator(searched, page, itemPerPage).data.map((study, index) => {
							return (
								<Grid item xs={12} key={study.std_no}>
									<StudyListItem study={study} />
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
                                <IconButton color="primary" onClick={handleCreateStudy}>
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
                                    onClick={handleCreateStudy}
                                >
                                    Study 생성
                                </Typography>
                            </Box>
                        </Grid>
                    </>
                )}

                {/* {invitedStudies.length > 0 && (
                    <Grid container item xs={12} direction="column">
                        <Box m={1}>
                            <Typography color="primary" variant="caption">
                                {fullName}
                            </Typography>
                            님, 초대 받은 Study가 있습니다.
                        </Box>
                        {invitedStudies.map((invitedStudy: any) => (
                            <StudyInvitedItem
                                invitedStudy={invitedStudy}
                                key={invitedStudy.std_no}
                                onAcceptInvite={handleAcceptInvite}
                            />
                        ))}
                    </Grid>
                )} */}
            </Grid>
        </Container>
    );
};

export default StudyList;
