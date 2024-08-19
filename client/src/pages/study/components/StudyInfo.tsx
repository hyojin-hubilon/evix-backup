import React, { useEffect, useState } from 'react';
import MainCard from '@/components/MainCard';
import moment from 'moment';
import {
    Box,
    Grid,
    List,
    ListItem,
    Typography,
    Button,
    Chip,
    Card,
    useTheme,
    Divider,
    Link,
    IconButton,
} from '@mui/material';
import StudyMemberStatus from './study-info/StudyMemberStatus';
import { STUDY_STATUS, STUDY_STATUS_KEY } from './StudyListItem';
import MemberManagement from './study-new/MemberManagement';
import { surveyCycle } from '@/types/study';
import SurveyConnectDialog from './study-new/SurveyConnetDialog';
import studyApi from '@/apis/study';
import DeleteModal from './eic/DeleteModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PreviewEic from './eic/PreviewEic';
import EditEic from './eic/EditEic';

interface StudyInfoProps {
    studyDetail: {
        std_no: number;
        std_type: string;
        title: string;
        std_start_date: string;
        std_end_date: string;
        description: string;
        disease: string;
        target_number: number;
        eic_name: string | null;
        eic_origin_name: string | null;
        std_status: string;
        updated_at: string;
        drug_brand_name: string;
        drug_code: string;
        drug_manufacturer_name: string;
        studySurveySetList: {
            set_no: number;
            std_no: number;
            survey_start_date: string;
            survey_end_date: string;
            survey_cycle: string;
            number_in_cycle: number;
            surveyList: {
                set_no: number;
                survey_no: number;
                survey_cnt: number;
                title: string;
                sort: number;
            }[];
        }[];
        managerList: {
            std_no: number;
            user_no: number;
            std_privilege: string;
            email: string;
            first_name: string;
            last_name: string;
            profile_image_url: string | null;
            profile_image_name: string | null;
            company_name: string;
            invited_at: string;
        }[];
        inviteList: {
            std_no: number;
            user_email: string;
            std_privilege: string;
            created_at: string;
            accepted_at: string | null;
        }[];
    };
}

const StudyInfo = ({ studyDetail }: StudyInfoProps) => {
    const theme = useTheme();
    console.log(studyDetail);

    const formatDate = (dateString: string): string => {
        return moment(dateString).format('YYYY-MM-DD');
    };

    const [isOpenMember, setIsOpenMember] = useState(false);

    const handleCloseMember = () => {
        setIsOpenMember(!isOpenMember);
    };

    const handleInviteMember = (std_no: number) => {
        setIsOpenMember(true);
    };

    const [isOpenSurvey, setIsOpenSurvey] = useState(false);
    const [studySurveySetList, setStudySurveySetList] = useState(studyDetail.studySurveySetList);

    const handleCloseSurvey = () => {
        setIsOpenSurvey(!isOpenSurvey);
    };

    const statusLabel = STUDY_STATUS[studyDetail.std_status as STUDY_STATUS_KEY];

    const [isDelete, setIsDelete] = useState<boolean>(false);
    const handleDeleteOpen = () => {
        setIsDelete(true);
    };
    const handleDeleteClose = () => {
        setIsDelete(false);
    };

    const [eicFile, setEicFile] = useState<any>(null);
    const [isPreviewEicOpen, setIsPreviewEicOpen] = useState<boolean>(false);
    const [isEditEicOpen, setIsEditEicOpen] = useState<boolean>(false);
    const [basePdf, setBasePdf] = useState<File | null>(null);

    const handlePreviewOpen = () => {
        setIsPreviewEicOpen(true);
    };
    const handlePreviewClose = () => {
        setIsPreviewEicOpen(false);
    };
    const handleEditViewOpen = () => {
        setIsEditEicOpen(true);
    };
    const handleEditViewClose = () => {
        setIsEditEicOpen(false);
    };

    const handleOpenUploadBasePdf = () => {

    }

    const handleDownloadEicFile = async () => {
        try {
            if (studyDetail.eic_name) {
                const response = await studyApi.downloadEicFile(
                    studyDetail.std_no,
                    studyDetail.eic_name
                );
                setEicFile(() => response);
            } else {
                console.log('Eic does not exist');
                return;
            }
        } catch (error) {
            console.error('Failed to Download EIC File', error);
        }
    };

    const handleDeleteEicFile = async () => {
        try {
            if (studyDetail.eic_name) {
                const response = await studyApi.deleteEicFile(studyDetail.std_no);
                console.log(response);
            } else {
                console.log('Eic does not exist');
                return;
            }
        } catch (error) {
            console.error('Failed to Download EIC File', error);
        }
    };

    useEffect(() => {
        handleDownloadEicFile();
    }, []);

    return (
        <Grid container item rowSpacing={2} className="study-info">
            <Grid item xs={12}>
                <Typography variant="h4">Study 상태</Typography>
                <MainCard>
                    <List>
                        <ListItem>
                            <Typography variant="h5">Study Status</Typography>
                            <Box display="flex" gap={1}>
                                <Typography variant="h6" color="primary">
                                    {statusLabel}
                                </Typography>
                                {studyDetail.updated_at && (
                                    <Typography>
                                        (최근 업데이트 {formatDate(studyDetail.updated_at)})
                                    </Typography>
                                )}
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h5">Study 기간</Typography>
                            <Box display="flex" gap={1}>
                                <Typography>
                                    {studyDetail.std_start_date} ~ {studyDetail.std_end_date}
                                </Typography>
                            </Box>
                        </ListItem>

                        {/* <ListItem> // TODO: Billing 기능 없음
                            <Typography variant="h5">유료이용기간</Typography>
                            <Box display="flex" gap={1} alignItems="center">
                                <Typography>2024.05.28 ~ 2024.08.31</Typography>
                                <Typography color="error">(만료 67일전)</Typography>
                                <Button variant="contained" size="small">
                                    연장결제하기
                                </Button>
                                <Button variant="outlined" size="small">
                                    지난 결제내역
                                </Button>
                            </Box>
                        </ListItem> */}
                    </List>
                </MainCard>
            </Grid>
            <Grid container item columnSpacing={1.5}>
                <Grid item xs={7}>
                    <Typography variant="h4">Study 개요</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Box display="flex" gap={1} alignItems="center">
                        <Typography variant="h4">Survey & Electronic consent form</Typography>
                    </Box>
                </Grid>
                <Grid item xs={7} alignSelf="stretch">
                    <MainCard sx={{ height: '100%' }}>
                        <List>
                            <ListItem>
                                <Typography variant="h5">Study 타입</Typography>
                                <Box display="flex" gap={1}>
                                    <Chip color="primary" label={studyDetail.std_type} />
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">Study 제목</Typography>
                                <Box display="flex" gap={1}>
                                    <Typography>{studyDetail.title}</Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">대상인원</Typography>
                                <Box display="flex" gap={1}>
                                    <Typography>{studyDetail.target_number} 명</Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">개요</Typography>
                                <Box display="flex" gap={1}>
                                    <Typography>{studyDetail.description}</Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">질환</Typography>
                                <Box display="flex" gap={1}>
                                    <Typography>{studyDetail.disease}</Typography>
                                </Box>
                            </ListItem>
                            {studyDetail.drug_code && (
                                <ListItem sx={{ alignItems: 'flex-start' }}>
                                    <Typography variant="h5">의약품 정보</Typography>
                                    <Box>
                                        <Typography>
                                            {studyDetail.drug_manufacturer_name}
                                        </Typography>
                                        <Card
                                            sx={{
                                                backgroundColor: theme.palette.grey[100],
                                                boxShadow: 'none',
                                                padding: '0.5rem 1rem 0.5rem 0.5rem',
                                                mt: '0.5rem',
                                            }}
                                        >
                                            <ul
                                                style={{
                                                    margin: 0,
                                                    paddingLeft: '1.5rem',
                                                    listStyle: 'disc',
                                                }}
                                            >
                                                <li>업체명: {studyDetail.drug_brand_name}</li>
                                                <li>품목기준코드: {studyDetail.drug_code}</li>
                                                {/* <li>품목구분: 의약품</li>
                                                <li>허가번호: 8</li>
                                                <li>허가일: 2004-06-24</li> */}
                                            </ul>
                                        </Card>
                                    </Box>
                                </ListItem>
                            )}
                        </List>
                    </MainCard>
                </Grid>
                <Grid item xs={5} alignSelf="stretch">
                    <MainCard sx={{ height: '100%' }}>
                        <Box
                            sx={{
                                p: '1rem',
                                bgcolor: theme.palette.grey[100],
                                borderRadius: '4px',
                                mb: '0.5rem',
                            }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography variant="h5">Survey</Typography>
                                {(statusLabel === 'New' || statusLabel === 'Pause') && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => setIsOpenSurvey(true)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </Box>
                            <List
                                sx={{
                                    listStyle: 'disc',
                                    pl: '20px',
                                    'li': {
                                        display: 'list-item',
                                        pl: 0,
                                        pb: 0,
                                    },
                                }}
                            >
                                {studyDetail.studySurveySetList &&
                                    studyDetail.studySurveySetList.length > 0 &&
                                    studyDetail.studySurveySetList.map((surveySet) =>
                                        surveySet.surveyList.map((survey) => (
                                            <ListItem
                                                key={survey.survey_no}
                                                sx={{ display: 'block' }}
                                            >
                                                <Link
                                                    sx={{
                                                        display: 'inline-block',
                                                        marginRight: '0.5rem',
                                                    }}
                                                >
                                                    {survey.title}
                                                </Link>
                                                <Typography sx={{ display: 'inline-block' }}>
                                                    {surveyCycle[surveySet.survey_cycle]}마다{' '}
                                                    {surveySet.number_in_cycle}회 반복
                                                </Typography>
                                            </ListItem>
                                        ))
                                    )}
                            </List>
                        </Box>
                        <Box
                            sx={{
                                p: '1rem',
                                bgcolor: theme.palette.grey[100],
                                borderRadius: '4px',
                            }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography variant="h5">전자동의서</Typography>
                                <Box display="flex" gap={0.5}>
                                    {studyDetail.eic_origin_name && (
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleDeleteOpen}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={handleEditViewOpen}
                                            >
                                                Edit
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </Box>
                            {studyDetail.eic_origin_name && (
                                <List
                                    sx={{
                                        listStyle: 'disc',
                                        pl: '20px',
                                        'li': {
                                            display: 'list-item',
                                            pl: 0,
                                            pb: 0,
                                        },
                                    }}
                                >
                                    <ListItem>
                                        {/* <Link>개인정보 제공 및 참여 동의서</Link> */}
                                        <Link
                                            style={{ cursor: 'pointer' }}
                                            onClick={handlePreviewOpen}
                                        >
                                            {studyDetail.eic_origin_name ?? ''}
                                        </Link>
                                    </ListItem>
                                </List>
                            )}
                            {!studyDetail.eic_origin_name && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        height: '130px',
                                    }}
                                >
                                    <IconButton color="inherit">
                                        <AddCircleOutlineIcon
                                            sx={{ fontSize: 40 }}
                                            onClick={handleOpenUploadBasePdf}
                                        />
                                    </IconButton>
                                    <Typography variant="body1" color="textSecondary">
                                        Register your electronic consent form.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </MainCard>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid item container>
                    <Grid item xs={10}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="h4">Study 멤버현황</Typography>
                            <Typography variant="caption">
                                *최근 승인일 순으로 보여집니다.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                onClick={() => handleInviteMember(studyDetail.std_no)}
                                size="small"
                                sx={{ mb: '0.3rem' }}
                                variant="contained"
                            >
                                멤버관리
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <StudyMemberStatus
                    managerList={studyDetail.managerList}
                    inviteList={studyDetail.inviteList}
                />
            </Grid>
            <MemberManagement
                isOpen={isOpenMember}
                studyNo={studyDetail.std_no}
                handleClose={handleCloseMember}
            />
            <SurveyConnectDialog
                isOpen={isOpenSurvey}
                handleClose={handleCloseSurvey}
                setStudySurveySetList={setStudySurveySetList}
                initialSurveySetList={studySurveySetList}
                mode="edit"
                studyNo={studyDetail.std_no}
            />
            <DeleteModal open={isDelete} onClose={handleDeleteClose} onDelete={() => {}} />
            <PreviewEic open={isPreviewEicOpen} onClose={handlePreviewClose} eicFile={eicFile}/>
            <EditEic open={isEditEicOpen} onClose={handleEditViewClose} eicFile={eicFile} studyDetail={studyDetail}/>
        </Grid>
    );
};

export default StudyInfo;
