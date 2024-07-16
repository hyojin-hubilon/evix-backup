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
} from '@mui/material';
import { useEffect, useState } from 'react';
import StudyListItem from './components/StudyListItem';
import studyApi from '@/apis/study';
import { MyStudyList, StudyApiResponse } from '@/types/study';
import { getDecodedToken } from '@/utils/Cookie';
import StudyInvitedItem from './components/StudyInvitedItem';
import { useNavigate } from 'react-router-dom';

const StudyList = () => {
    const [studyCount, setStudyCount] = useState<number>(0); // Study 개수 상태
    const [activeTab, setActiveTab] = useState<string>('0'); // 활성 탭 상태
    const [studies, setStudies] = useState<MyStudyList[]>([]); // 내 Study 목록 상태
    const [invitedStudies, setInvitedStudies] = useState<any[]>([]); // 초대 받은 스터디 목록 상태
    const [fullName, setFullName] = useState<string>(''); // 사용자 전체 이름 상태
    const navigate = useNavigate();

    // Study 데이터 불러오기
    const fetchStudies = async () => {
        try {
            const response: StudyApiResponse = await studyApi.myStudyList(1, 100); // TODO: 창덕님께 수정 요청(페이징 필요 없음)
            if (response.result && response.code === 200) {
                const studyList = response.content?.studyMyList ?? [];
                setStudies(studyList);
                setStudyCount(studyList.length);
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
        fetchInvitedStudies();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setActiveTab(newValue);
    };

    const handleCreateStudy = () => {
        navigate('/study/new');
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

    return (
        <Container maxWidth="lg">
            <Grid container rowSpacing={3} columnSpacing={2.75}>
                <Grid container item xs={12}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h3">Study 목록</Typography>
                        <Chip label={studyCount} color="primary" size="small" />
                    </Box>
					<Button variant="contained" onClick={handleCreateStudy} sx={{ml:'auto'}}>
						<PlusOutlined />
						<Typography sx={{ ml: 1 }}>Study 생성</Typography>
					</Button>
                </Grid>

                {studyCount !== 0 ? (
                    <>
                        <Grid
                            container
                            item
                            xs={12}
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                            alignItems="center"
                        >
                            <Grid item xs={8}>
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
                            </Grid>
							<Grid container item xs={4} justifyContent="flex-end">
                                <form>
                                    <Box display="flex" gap="0.5rem">
										<OutlinedInput size="small" />
										<Button variant="outlined">검색</Button>
                                    </Box>
								</form>
                            </Grid>
                        </Grid>

                        {studies
                            .filter((study) => {
                                if (activeTab === '0') return true;
                                if (activeTab === '1' && study.std_privilege === 'OWNER')
                                    return true;
                                if (activeTab === '2' && study.std_privilege === 'MAINTAINER')
                                    return true;
                                if (activeTab === '3' && study.std_privilege === 'DEVELOPER')
                                    return true;
                                return false;
                            })
                            .map((study) => (
                                <Grid item xs={12} key={study.std_no}>
                                    <StudyListItem study={study} />
                                </Grid>
                            ))}
						<Grid item xs={12}>
                            <Box display="flex" justifyContent="center" alignContent="center">
                                <Button size="large" variant="contained" color="secondary" sx={{ml: "auto", mr:"auto"}}>더 보기</Button>
                            </Box>
                        </Grid>
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

                {invitedStudies.length > 0 && (
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
                )}
            </Grid>
        </Container>
    );
};

export default StudyList;
