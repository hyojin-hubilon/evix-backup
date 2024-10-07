import React, { useEffect, useState } from 'react';
import MainCard from '@/components/MainCard';
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
    Dialog,
} from '@mui/material';
import StudyMemberStatus from './study-info/StudyMemberStatus';
import { STUDY_STATUS, STUDY_STATUS_KEY } from './StudyListItem';
import MemberManagement from './study-new/MemberManagement';
import { surveyCycle, surveyCycleEn } from '@/types/study';
import studyApi from '@/apis/study';
import DeleteModal from './eic/DeleteModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PreviewEic from './eic/PreviewEic';
import EditEic from './eic/EditEic';
import EicParent from './eic/EicParent';
import { useNavigate } from 'react-router-dom';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { useUserProfile } from '@/context/UserProfileContext';
import SurveyConnectDialog from './study-new/SurveyConnetDialog';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import SurveyPreview from '@/pages/survey/SurveyPreview';

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
    ownerId: number;
    onSurveyClose: () => void;
}

const StudyInfo = ({ studyDetail, ownerId, onSurveyClose }: StudyInfoProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { stdStatus } = theme.palette;

    const confirm = useConfirmation();
    const { userProfile } = useUserProfile();
    const userId = userProfile?.user_no;

    const { t, i18n } = useTranslation();

    const formatDate = (dateString: string): string => {
        return dayjs(dateString).format('YYYY-MM-DD');
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
        onSurveyClose();
    };

    const today = dayjs().format('YYYY-MM-DD');
    const endDate = studyDetail.std_end_date;

    const getStatusLabel = () => {
        if (endDate < today) {
            return 'Expired';
        }
        return STUDY_STATUS[studyDetail.std_status as STUDY_STATUS_KEY];
    };

    const statusLabel = getStatusLabel();

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
    const [basePdfFile, setBasePdfFile] = useState<File | null>(null);
    const [isUploadBasePdfOpen, setIsUploadBasePdfOpen] = useState<boolean>(false);
    const [isCreateEicOpen, setIsCreateEicOpen] = useState<boolean>(false);
    const [managerList, setManagerList] = useState<any[]>(studyDetail.managerList);
    const [inviteList, setInviteList] = useState<any[]>(studyDetail.inviteList);

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
        setIsUploadBasePdfOpen(true);
    };
    const handleCloseUploadBasePdf = () => {
        setIsUploadBasePdfOpen(false);
    };
    const handleOpenCreateEic = () => {
        setIsCreateEicOpen(true);
    };
    const handleCloseCreateEic = () => {
        setIsCreateEicOpen(false);
    };
    const handleConfirm = (file: File) => {
        setBasePdfFile(file);
        handleCloseUploadBasePdf();
        handleOpenCreateEic();
    };

    const handleEicFile = async (eicFile: File) => {
        // FormData 객체 생성 및 데이터 추가
        const formData = new FormData();
        // 전자동의서 파일이 있는 경우 FormData에 추가

        if (eicFile) {
            formData.append('eic_file', eicFile, `${studyDetail.title}.json`);
        }

        try {
            const response = await studyApi.editEicFile(studyDetail.std_no, formData);
            if (response.code === 200) {
                confirm({
                    description: t('eic.has_been_saved'),
                    variant: 'info',
                }).then(() => {
                    handleEditViewClose();
                    onSurveyClose();
                });
            }
        } catch (error) {
            console.error('Failed to deploy study: ', error);
        }
    };

    const handleDownloadEicFile = async () => {
        try {
            if (studyDetail.eic_name) {
                const response = await studyApi.downloadEicFile(
                    studyDetail.std_no,
                    studyDetail.eic_name
                );
                setEicFile(() => response);
            }
        } catch (error) {
            console.error('Failed to Download EIC File', error);
        }
    };

    const handleDeleteEicFile = async () => {
        try {
            if (studyDetail.eic_name) {
                const response = await studyApi.deleteEicFile(studyDetail.std_no);
                if (response.code === 200) {
                    confirm({
                        description: t('eic.has_been_deleted'),
                        variant: 'info',
                    }).then(() => {
                        handleDeleteClose();
                        onSurveyClose();
                    });
                }
            }
        } catch (error) {
            console.error('Failed to delete EIC File', error);
        }
    };

    const [surveyNo, setSurveyNo] = useState<number | null>(null);
    const [isPreview, setIsPreview] = useState(false);

    const handleShowSurvey = (surveyNo) => {
        setSurveyNo(surveyNo);
        setIsPreview(true);
    };

    const handleClosePreview = () => {
        setIsPreview(false);
        setSurveyNo(null);
    };

    useEffect(() => {
        handleDownloadEicFile();
    }, [studyDetail.eic_name]);

    return (
        <Grid container item rowSpacing={2} className="study-info">
            <Grid item xs={12}>
                <Typography variant="h4">
                    {t('study.study_status')}
                    {/* Study 상태 */}
                </Typography>
                <MainCard>
                    <List>
                        <ListItem>
                            <Typography variant="h5">Study Status</Typography>
                            <Box display="flex" gap={1}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: stdStatus.new,
                                        ...(studyDetail?.std_status === 'STD-PROGRESSION' && {
                                            color: stdStatus.ongoing,
                                        }), //Ongoing
                                        ...(studyDetail?.std_status === 'STD-DONE' && {
                                            color: stdStatus.completed,
                                        }), //Completed
                                        ...(endDate < today &&
                                            'STD-Expired' && {
                                                color: stdStatus.expired,
                                            }), //Expired
                                    }}
                                >
                                    {statusLabel}
                                </Typography>
                                {studyDetail.updated_at && (
                                    <Typography>
                                        {/* 최근 업데이트 */}({t('study.recent_updates')}{' '}
                                        {formatDate(studyDetail.updated_at)})
                                    </Typography>
                                )}
                            </Box>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h5">
                                {t('study.study_period')}
                                {/* Study 기간 */}
                            </Typography>
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
                    <Typography variant="h4">
                        {t('study.study_summary')}
                        {/* Study 개요 */}
                    </Typography>
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
                                <Typography variant="h5">
                                    {t('study.study_type_02')}
                                    {/* Study 타입 */}
                                </Typography>
                                <Box display="flex" gap={1}>
                                    <Chip color="primary" label={studyDetail.std_type} />
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">
                                    {t('study.study_title')}
                                    {/* Study 제목 */}
                                </Typography>
                                <Box display="flex" gap={1}>
                                    <Typography>{studyDetail.title}</Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">
                                    {t('study.target_number')}
                                    {/* 대상인원 */}
                                </Typography>
                                <Box display="flex" gap={1}>
                                    <Typography>
                                        {studyDetail.target_number} {t('study.person')}
                                    </Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">
                                    {t('study.summary')}
                                    {/* 개요 */}
                                </Typography>
                                <Box display="flex" gap={1}>
                                    <Typography>{studyDetail.description}</Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">
                                    {t('study.disease')}
                                    {/* 질환 */}
                                </Typography>
                                <Box display="flex" gap={1}>
                                    <Typography>{studyDetail.disease}</Typography>
                                </Box>
                            </ListItem>
                            {studyDetail.drug_code && (
                                <ListItem sx={{ alignItems: 'flex-start' }}>
                                    <Typography variant="h5">
                                        {t('study.pharmaceutical_information')}
                                        {/* 의약품 정보 */}
                                    </Typography>
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
                                                {/* 업체명 */}
                                                <li>
                                                    {t('study.company_name')} :{' '}
                                                    {studyDetail.drug_brand_name}
                                                </li>
                                                {/* 품목기준코드 */}
                                                <li>
                                                    {t('study.item_standard_code')} :{' '}
                                                    {studyDetail.drug_code}
                                                </li>
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
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        handleShowSurvey(survey.survey_no)
                                                    }
                                                >
                                                    {survey.title}
                                                </Link>
                                                <Typography sx={{ display: 'inline-block' }}>
                                                    {i18n.language === 'en' ? (
                                                        <>
                                                            {t('study.repeat')}{' '}
                                                            {surveySet.number_in_cycle === 1
                                                                ? 'once a'
                                                                : surveySet.number_in_cycle +
                                                                  t('study.time_per')}{' '}
                                                            {surveyCycleEn[surveySet.survey_cycle]}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {surveyCycle[surveySet.survey_cycle]}
                                                            {t('study.repeat')}{' '}
                                                            {surveySet.number_in_cycle}
                                                            {t('study.time_per')}
                                                        </>
                                                    )}
                                                    {/* {surveyCycle[surveySet.survey_cycle]}마다{' '}
                                                    {surveySet.number_in_cycle}회 반복 */}
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
                                <Typography variant="h5">
                                    {t('study.electronic_consent_form')}
                                </Typography>
                                <Box display="flex" gap={0.5}>
                                    {userId === ownerId && studyDetail.eic_origin_name && (
                                        <>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={handleDeleteOpen}
                                            >
                                                {t('common.delete')}
                                                {/* Delete */}
                                            </Button>
                                            <Button variant="outlined" onClick={handleEditViewOpen}>
                                                {t('common.edit')}
                                                {/* Edit */}
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
                                        <Link
                                            style={{ cursor: 'pointer' }}
                                            onClick={handlePreviewOpen}
                                        >
                                            Preview
                                        </Link>
                                    </ListItem>
                                </List>
                            )}
                            {userId === ownerId &&
                                !studyDetail.eic_origin_name &&
                                (studyDetail.std_status === 'STD-CREATED' || studyDetail.std_status === 'STD-PROGRESSION' || studyDetail.std_status === 'STD-PAUSE') && (
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
                                        <IconButton
                                            color="inherit"
                                            onClick={handleOpenUploadBasePdf}
                                        >
                                            <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
                                        </IconButton>
                                        <Typography variant="body1" color="textSecondary">
                                            {t('study.register_electronic_consent')}
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
                            <Typography variant="h4">{t('study.members')}</Typography>
                            <Typography variant="caption">
                                {t('study.displayed_most_recent_approval')}
                                {/* *최근 승인일 순으로 보여집니다. */}
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
                                {t('study.member_management')}
                                {/* 멤버관리 */}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <StudyMemberStatus managerList={managerList} inviteList={inviteList} />
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
                startDate={studyDetail.std_start_date}
                endDate={studyDetail.std_end_date}
            />
            <DeleteModal
                open={isDelete}
                onClose={handleDeleteClose}
                onDelete={handleDeleteEicFile}
            />
            <PreviewEic open={isPreviewEicOpen} onClose={handlePreviewClose} eicFile={eicFile} />
            <EditEic
                open={isEditEicOpen}
                onClose={handleEditViewClose}
                eicFile={eicFile}
                studyDetail={studyDetail}
                fetchStudyDetail={onSurveyClose}
            />
            <EicParent
                isUploadBasePdfOpen={isUploadBasePdfOpen}
                handleCloseUploadBasePdf={handleCloseUploadBasePdf}
                handleConfirm={handleConfirm}
                isCreateEicOpen={isCreateEicOpen}
                handleCloseCreateEic={handleCloseCreateEic}
                handleEicFile={handleEicFile}
                basePdfFile={basePdfFile}
            />
            {surveyNo && isPreview && (
                <Dialog open={isPreview} maxWidth="lg" onClose={handleClosePreview} fullWidth>
                    <SurveyPreview
                        surveyNo={surveyNo}
                        handleClose={handleClosePreview}
                        isDialog={true}
                    />
                </Dialog>
            )}
        </Grid>
    );
};

export default StudyInfo;
