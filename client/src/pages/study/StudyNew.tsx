import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
    Box,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    Tooltip,
    Typography,
    useTheme,
    Button,
    Divider,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import DateRangePicker, { DateRage } from './components/study-new/Daterangepicker';
import MedicineInfo from './components/study-new/MedicineInfo';

import studyApi from '@/apis/study';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drug } from '@/apis/test/drug/drugsAPI_TEST';
import userApi from '@/apis/user';
import SurveyConnectDialog from './components/study-new/SurveyConnetDialog';
import { InviteMemberTempType, StudyDetail, StudySurveySetList } from '@/types/study';
import MemberInvitement from './components/study-new/MemberInvitement';
import MemberManagement from './components/study-new/MemberManagement';
import StudyDeleteConfirmDialog from './components/study-new/StudyDeleteConfirmDialog';
import { MyProfile } from '@/types/user';
import EicParent from './components/eic/EicParent';
import { t } from 'i18next';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { useUserProfile } from '@/context/UserProfileContext';
import { useTranslation } from 'react-i18next';
import AddLinkIcon from '@mui/icons-material/AddLink';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const FormTooltip = ({ text }) => {
    return (
        <Tooltip title={text} placement="right">
            <IconButton size="small" sx={{ fontSize: '1em' }}>
                <ExclamationCircleOutlined />
            </IconButton>
        </Tooltip>
    );
};

type ActionType = 'delete' | 'pause' | 'stop' | 'restart';

const StudyNew = () => {
    const { userProfile, setUserProfile } = useUserProfile();

    const theme = useTheme();
    const { divider, primary } = theme.palette;
    const [dateRange, setDateRange] = useState({ startDt: dayjs(), endDt: dayjs() });
    const [medicineYOrN, setMedicineYOrN] = useState<'true' | 'false'>('false');
    const [mode, setMode] = useState<'write' | 'edit'>('write');
    const [title, setTitle] = useState('');
    const [participants, setParticipants] = useState<string>('');
    const [description, setDescription] = useState('');
    const [disease, setDisease] = useState('');
    const [eicFile, setEicFile] = useState<File | null>(null);
    const [isOpenMember, setIsOpenMember] = useState(false);
    const [isOpenSurvey, setIsOpenSurvey] = useState(false);
    const [inviteList, setInviteList] = useState<InviteMemberTempType[]>([]);
    const [managerList, setManagerList] = useState<any[]>([]);
    const [studySurveySetList, setStudySurveySetList] = useState<StudySurveySetList[]>([]);

    const [members, setMembers] = useState<InviteMemberTempType[]>([]);

    const [drug, setDrug] = useState<Drug>();
    const [country, setCountry] = useState('KO_KR');
    const [basePdfFile, setBasePdfFile] = useState<File | null>(null); //BasePDF File
    const [isUploadBasePdfOpen, setIsUploadBasePdfOpen] = useState(false); //BasePDF 업로드 팝업
    const [isCreateEicOpen, setIsCreateEicOpen] = useState(false); //EIC 생성 팝업

    const navigate = useNavigate();
    const location = useLocation();
    const confirm = useConfirmation();

    const state = location.state as { mode: 'write' | 'edit'; stdNo?: number };
    const stdNo = location.state?.stdNo;
    const [stdStatus, setStdStatus] = useState<String>('');

    // 유효성 검사
    const [errors, setErrors] = useState({
        title: '',
        participants: '',
        disease: '',
    });

    const validate = () => {
        let tempErrors = { ...errors };

        tempErrors.title = title ? '' : t('study.please_enter_title'); //제목을 입력해 주세요
        tempErrors.participants = participants ? '' : t('study.please_enter_target'); //대상인원을 입력해 주세요
        tempErrors.disease = disease ? '' : t('study.please_enter_disease'); //질환을 입력해 주세요

        setErrors(tempErrors);

        return Object.values(tempErrors).every((x) => x === '');
    };

    const changeDateRange = (e: DateRage) => {
        setDateRange(e);
    };

    const handleChangeMedicine = (e) => {
        setMedicineYOrN(e);
    };

    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    const handleDeleteSuccess = () => {
        navigate('/study');
    };

    const handleOpenStudyDelete = () => {
        setOpenDeleteConfirm(!openDeleteConfirm);
    };

    // const [actionType, setActionType] = useState<ActionType | null>(null);
    type ActionType = 'delete' | 'pause' | 'stop' | 'progression';
    const [actionType, setActionType] = useState<ActionType>('delete');

    const handleOpenDialog = (action) => {
        setActionType(action);
        setOpenDeleteConfirm(true);
    };

    const handleCloseDialog = () => {
        setOpenDeleteConfirm(false);
    };

    const titles = studySurveySetList?.map((cycle: any) => {
        return cycle.surveyList.map((survey: any) => survey.title).join(', ');
    });

    const handleSubmit = async () => {
        if (validate()) {
            const studyData = {
                std_payment_status: 'WAIT',
                deploy_method: 'IMMEDIATE',
                std_status: 'STD-CREATED',
                title: title,
                std_type: 'E-PRO',
                std_start_date: dateRange.startDt.format('YYYY-MM-DD'),
                std_end_date: dateRange.endDt.format('YYYY-MM-DD'),
                target_number: parseInt(participants),
                description: description,
                disease: disease,
                location: country,
                drug_code: drug?.itemCode ?? null,
                drug_brand_name: drug?.companyName ?? null,
                drug_manufacturer_name: drug?.productName ?? null,
                studySurveySetList: studySurveySetList ?? [],
                inviteList: members ?? [],
            };

            // FormData 객체 생성 및 데이터 추가
            const formData = new FormData();

            formData.append(
                'requestDto',
                new Blob([JSON.stringify(studyData)], { type: 'application/json' })
            );

            // 전자동의서 파일이 있는 경우 FormData에 추가
            if (eicFile) {
                formData.append('eic_file', eicFile, `${studyData.title}.json`);
            }

            try {
                const response = await studyApi.createStudy(formData);
                if (response.code === 200) {
                    navigate(-1);
                }
            } catch (error) {
                console.error('Failed to Create study:', error);
            }
        }
    };

    const handleCloseMember = () => {
        setIsOpenMember(!isOpenMember);
    };

    const handleCloseSurvey = () => {
        setIsOpenSurvey(!isOpenSurvey);
    };

    const handleOpenUploadBasePdf = () => {
        setIsUploadBasePdfOpen(true);
    };

    const handleCloseUploadBasePdf = () => {
        setIsUploadBasePdfOpen(false);
    };

    const handleEicFile = (file: File) => {
        setEicFile(file);
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

    useEffect(() => {
        if (state?.mode === 'edit') {
            setMode('edit');
            fetchStudyDetail(state.stdNo); // 스터디 상세 정보 가져오기
        }
    }, []);

    const getEmailByPrivilege = useMemo(() => {
        if (mode === 'write') {
            return (privilege: string): string => {
                const memberEmails = members
                    .filter((m) => m.std_privilege === privilege)
                    .map((m) => m.user_email);
                return memberEmails.length > 0
                    ? memberEmails.join(', ')
                    : t('study.please_set_it_invite'); //'초대하기 팝업에서 설정해주세요.';
            };
        } else if (mode === 'edit') {
            return (privilege: string): string => {
                const inviteEmails = managerList
                    .filter((i) => i.std_privilege === privilege)
                    .map((i) => i.email);
                return inviteEmails.length > 0
                    ? inviteEmails.join(', ')
                    : t('study.please_set_it_invite'); //'초대하기 팝업에서 설정해주세요.';
            };
        }
        return (privilege: string) => t('study.please_set_it_invite'); //'초대하기 팝업에서 설정해주세요.';
    }, [members, inviteList, mode]);

    const [studyDetail, setStudyDetail] = useState<StudyDetail>();

    const fetchStudyDetail = async (stdNo) => {
        try {
            const response = await studyApi.getStudyDetail(stdNo);
            setStudyDetail(response.content as StudyDetail); // `response.content`의 타입이 `StudyDetail`과 일치해야 함

            setTitle(response.content['title']);
            setParticipants(response.content['target_number']);
            setDescription(response.content['description']);
            setDisease(response.content['disease']);

            setDateRange({
                ...dateRange,
                startDt: dayjs(response.content['std_start_date']),
                endDt: dayjs(response.content['std_end_date']),
            });

            setStudySurveySetList(response.content['studySurveySetList']);
            setInviteList(response.content['inviteList']);
            setManagerList(response.content['managerList']);

            if (response.content['drug_code']) {
                setDrug({
                    itemCode: response.content['drug_code'],
                    companyName: response.content['drug_brand_name'],
                    productName: response.content['drug_manufacturer_name'],
                });
                setMedicineYOrN('true');
            }
            setStdStatus(response.content['std_status']);
        } catch (error) {
            console.error('Failed to fetch study detail:', error);
        }
    };

    console.log('studyDetail:', studyDetail);

    const handleUpdate = async () => {
        if (validate()) {
            const studyData = {
                std_no: stdNo,
                title: title,
                std_type: 'E-PRO',
                std_start_date: dateRange.startDt.format('YYYY-MM-DD'),
                std_end_date: dateRange.endDt.format('YYYY-MM-DD'),
                target_number: parseInt(participants),
                description: description,
                disease: disease,
                drug_code: medicineYOrN === 'true' ? drug?.itemCode ?? null : null,
                drug_brand_name: medicineYOrN === 'true' ? drug?.companyName ?? null : null,
                drug_manufacturer_name: medicineYOrN === 'true' ? drug?.productName ?? null : null,
            };

            // // FormData 객체 생성 및 데이터 추가
            // const formData = new FormData();

            // formData.append(
            //     'requestDto',
            //     new Blob([JSON.stringify(studyData)], { type: 'application/json' })
            // );

            // // 전자동의서 파일이 있는 경우 FormData에 추가
            // if (eicFile) {
            //     formData.append('eic_file', eicFile, `${studyData.title}.json`);
            // }

            try {
                const response = await studyApi.updateStudy(studyData);
                if (response.code === 200) {
                    // Survey OR EIC 미연결
                    if (!studyDetail?.studySurveySetList || !studyDetail?.eic_name) {
                        confirm({
                            description: t('study.study_has_been_modified_connect_survey'), //"Study가 수정되었습니다. Study 배포전에 Survey와 EIC를 연결해주세요.",
                            variant: 'info',
                        }).then(() => {
                            navigate('/study');
                        });
                    } else {
                        confirm({
                            description: t('study.study_has_been_modified'), //Study가 수정되었습니다.
                            variant: 'info',
                        }).then(() => {
                            navigate('/study');
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to update study:', error);
            }
        }
    };

    const handleDeploy = async () => {
        const studyData = {
            std_no: stdNo,
            title: title,
            std_type: 'E-PRO',
            std_start_date: dateRange.startDt.format('YYYY-MM-DD'),
            std_end_date: dateRange.endDt.format('YYYY-MM-DD'),
            target_number: parseInt(participants),
            description: description,
            disease: disease,
            drug_code: medicineYOrN === 'true' ? drug?.itemCode ?? null : null,
            drug_brand_name: medicineYOrN === 'true' ? drug?.companyName ?? null : null,
            drug_manufacturer_name: medicineYOrN === 'true' ? drug?.productName ?? null : null,
            std_status: 'STD-PROGRESSION',
        };

        // // FormData 객체 생성 및 데이터 추가
        // const formData = new FormData();

        // formData.append(
        //     'requestDto',
        //     new Blob([JSON.stringify(studyData)], { type: 'application/json' })
        // );

        // // 전자동의서 파일이 있는 경우 FormData에 추가
        // if (eicFile) {
        //     formData.append('eic_file', eicFile, `${studyData.title}.json`);
        // }

        try {
            const response = await studyApi.deployStudy(studyData);
            if (response.code === 200) {
                confirm({
                    description: t('study.study_has_been_deployed'), //Study가 배포되었습니다.
                    variant: 'info',
                }).then(() => {
                    navigate('/study');
                });
            }
        } catch (error) {
            console.error('Failed to deploy study: ', error);
        }
    };

    const userRole = managerList.find(
        (member) => member.user_no === userProfile?.user_no
    )?.std_privilege;

    console.log('userRole: ', userRole);

    const handlePreview = () => {
        // 미리보기 화면 출력
        navigate('/study/preview', { state: { mode: 'preview', studyDetail: studyDetail } });
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h2" mb={2}>
                {mode === 'write' ? 'Create Study' : 'Edit Study'}
            </Typography>
            <Box
                sx={{
                    p: '1rem',
                    borderRadius: '1rem',
                    border: `1px solid ${divider}`,
                    backgroundColor: '#fff',
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    gap={2}
                    sx={{ p: '1rem' }}
                >
                    {/* Study Type */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">
                                    <span style={{ color: 'red' }}>*</span> {t('study.study_type')}
                                </Typography>
                                <FormTooltip
                                    text={
                                        <Box
                                            sx={{
                                                'span': { display: 'block' },
                                            }}
                                        >
                                            <span>
                                                {t('study.epro_epro')}
                                                {/* - ePRO: ePRO(electronic Patient-Reported Outcome) is
                                                a service where patients electronically report their
                                                health status and treatment outcomes. */}
                                            </span>
                                            <span>
                                                {t('study.ecoa_ecoa')}
                                                {/* - eCOA: eCOA (electronic Clinical Outcome
                                                Assessment) refers to patient-reported outcomes and
                                                clinical assessment data collected electronically in
                                                clinical research. */}
                                            </span>
                                            <span>
                                                {t('study.ecrf_ecrf')}
                                                {/* - eCRF: eCRF (electronic Case Report Form) is a
                                                system used to collect and manage clinical data of
                                                patients electronically in clinical research. */}
                                            </span>
                                        </Box>
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small">
                                <Select
                                    value="ePRO"
                                    disabled={mode === 'edit'} // 수정 모드에서는 비활성화
                                    sx={{ width: '10rem' }}
                                >
                                    <MenuItem value="ePRO">ePRO</MenuItem>
                                    <MenuItem value="eCOA">eCOA</MenuItem>
                                    <MenuItem value="eCRF">eCRF</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 제목 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">
                                    <span style={{ color: 'red' }}>*</span> {t('study.title')}
                                </Typography>
                                {/* <FormTooltip text="Enter the title of the Study" /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small" fullWidth>
                                <OutlinedInput
                                    placeholder={t('study.title')}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <FormHelperText error>{errors.title}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 기간 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">
                                    <span style={{ color: 'red' }}>*</span> {t('study.period')}
                                </Typography>
                                {/* <FormTooltip text="Enter the duration of the Study" /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small">
                                <DateRangePicker
                                    startDt={dateRange.startDt}
                                    endDt={dateRange.endDt}
                                    changeDate={(e) => changeDateRange(e)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 대상인원 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">
                                    <span style={{ color: 'red' }}>* </span>{' '}
                                    {t('study.target_number')}
                                </Typography>
                                {/* <FormTooltip text="Enter the number of participants" /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small">
                                <Box display="flex" alignItems="center" gap={1}>
                                    <OutlinedInput
                                        placeholder="0"
                                        type="number"
                                        value={participants}
                                        onChange={(e) => setParticipants(e.target.value)}
                                        sx={{ width: '10rem' }}
                                    />
                                    <Typography>{t('study.person')}</Typography>
                                </Box>
                                <FormHelperText error>{errors.participants}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 개요 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">{t('study.summary')}</Typography>
                                {/* <FormTooltip text="Enter a brief summary of the Study" /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small" fullWidth>
                                <OutlinedInput
                                    placeholder={t('study.brief_information')}
                                    //"Study에 대한 간략한 정보와 요약내용"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 질환 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">
                                    <span style={{ color: 'red' }}>* </span>
                                    {t('study.disease')}
                                </Typography>
                                {/* <FormTooltip text="Enter the disease for the Study" /> */}
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small" fullWidth>
                                <OutlinedInput
                                    placeholder={t('study.subject_disease')}
                                    //"Study를 진행할 대상 질환"
                                    value={disease}
                                    onChange={(e) => setDisease(e.target.value)}
                                />
                                <FormHelperText error>{errors.disease}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 의약품 정보 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5" sx={{ width: '70%' }}>
                                    {t('study.pharmaceutical_information')}
                                </Typography>
                                <FormTooltip text={t('study.you_can_search_drug_information')} />
                                {/* "You can search drug information using KFDA open API, FDA open API." */}
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small" fullWidth>
                                <RadioGroup
                                    aria-labelledby="medicine-group"
                                    name="medicine-group"
                                    value={medicineYOrN}
                                    onChange={(e) => handleChangeMedicine(e.target.value)}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <FormControlLabel
                                        value="true"
                                        control={<Radio size="small" />}
                                        label={t('study.yes')} //있음
                                    />
                                    <FormControlLabel
                                        value="false"
                                        control={<Radio size="small" />}
                                        label={t('study.no')} //없음
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {medicineYOrN === 'true' && (
                            <MedicineInfo
                                country={country}
                                setCountry={setCountry}
                                drug={drug}
                                setDrug={setDrug}
                            />
                        )}
                    </Grid>
                    {mode === 'write' && ( // 생성시에만 노출
                        <>
                            <Divider flexItem />

                            {/* Survey */}
                            <Grid container alignItems="flex-start">
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{ pt: '0.2rem' }}
                                        gap={0.5}
                                    >
                                        <Typography variant="h5">Survey</Typography>
                                        <FormTooltip text={t('study.connect_the_survey')} />
                                        {/* Connect the Survey before Study deployment. */}
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setIsOpenSurvey(true);
                                        }}
                                        sx={{ minWidth: '105px' }}
                                    >
                                        <AddLinkIcon sx={{ mr: '5px', fontSize: '1.2rem' }} />
                                        {t('study.connect_survey')}
                                        {/* Survey 연결 */}
                                    </Button>
                                    {'  '}
                                    {titles && titles.length > 0 ? (
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                color: primary.main,
                                            }}
                                        >
                                            {titles}
                                        </span>
                                    ) : (
                                        <span style={{ color: 'red' }}>
                                            {t('study.make_sure_connect')}
                                            {/* * Study 배포전에 반드시 연결해주세요. */}
                                        </span>
                                    )}
                                </Grid>
                            </Grid>

                            {/* EIC(전자동의서) */}
                            <Grid container alignItems="center">
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{ pt: '0.2rem' }}
                                        gap={0.5}
                                    >
                                        <Typography variant="h5" sx={{ maxWidth: '70%' }}>
                                            {t('study.eic')}
                                        </Typography>
                                        <FormTooltip text={t('study.connect_the_eic')} />
                                        {/* Connect the EIC before Study deployment. */}
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenUploadBasePdf}
                                        sx={{ minWidth: '105px' }}
                                    >
                                        <AddLinkIcon sx={{ mr: '5px', fontSize: '1.2rem' }} />
                                        {t('study.connect_eic')}
                                        {/* EIC 연결 */}
                                    </Button>{' '}
                                    {basePdfFile?.name ? (
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                color: primary.main,
                                            }}
                                        >
                                            {basePdfFile?.name}
                                        </span>
                                    ) : (
                                        <span style={{ color: 'red' }}>
                                            {t('study.make_sure_connect')}
                                            {/* * Study 배포전에 반드시 연결해주세요. */}
                                        </span>
                                    )}
                                </Grid>
                            </Grid>

                            {/* 멤버 관리 */}
                            <Grid container alignItems="flex-start">
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{ pt: '0.2rem' }}
                                        gap={0.5}
                                    >
                                        <Typography variant="h5">
                                            {t('study.managing_members')}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setIsOpenMember(true);
                                        }}
                                        sx={{ minWidth: '105px' }}
                                    >
                                        <PersonAddAlt1Icon sx={{ mr: '5px', fontSize: '1.2rem' }} />
                                        {t('study.invite_as_partners')}
                                        {/* 초대하기 */}
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* 멤버 권한 안내 */}
                            <Grid container alignItems="flex-start">
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{ pt: '0.2rem' }}
                                        gap={0.5}
                                    >
                                        <Typography variant="h5">
                                            {t('study.member_permission_information')}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        <li>
                                            <Typography>
                                                {t('study.owner_permission')}
                                                {/* Owner (Study의 생성, 수정, 배포, 멤버 초대) :{' '} */}
                                                <span
                                                    style={{
                                                        fontWeight: 'bold',
                                                        color: primary.main,
                                                    }}
                                                >
                                                    {userProfile?.first_name}{' '}
                                                    {userProfile?.last_name}
                                                </span>
                                            </Typography>
                                        </li>

                                        {mode === 'write' ? (
                                            <>
                                                <li>
                                                    <Typography>
                                                        {t('study.invited_member_maintainer')}
                                                        {/* 초대 멤버(Maintainer) :{' '} */}
                                                        <span style={{ color: 'red' }}>
                                                            {getEmailByPrivilege('MAINTAINER')}
                                                        </span>
                                                    </Typography>
                                                </li>
                                                <li>
                                                    <Typography>
                                                        {t('study.invited_member_developer')}

                                                        {/* 초대 멤버(Developer) :{' '} */}
                                                        <span style={{ color: 'red' }}>
                                                            {getEmailByPrivilege('DEVELOPER')}
                                                        </span>
                                                    </Typography>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <Typography>
                                                        {t('study.maintainer')}
                                                        {/* Maintainer (Study의 수정, 멤버 초대) :{' '} */}
                                                        <span style={{ color: 'red' }}>
                                                            {getEmailByPrivilege('MAINTAINER')}
                                                        </span>
                                                    </Typography>
                                                </li>
                                                <li>
                                                    <Typography>
                                                        {t('study.developer')}
                                                        {/* Developer (Study 조회) :{' '} */}
                                                        <span style={{ color: 'red' }}>
                                                            {getEmailByPrivilege('DEVELOPER')}
                                                        </span>
                                                    </Typography>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Box>
            </Box>
            {mode === 'write' ? (
                <Box display="flex" justifyContent="flex-end" pt="1rem" gap={2}>
                    <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
                        {t('common.cancel')}
                        {/* 취소 */}
                    </Button>
                    <Button variant="contained" size="large" onClick={handleSubmit}>
                        {t('common.create')}
                        {/* 생성 */}
                    </Button>
                </Box>
            ) : (
                // 수정 모드에서 보여질 UI
                <Grid container pt="1rem">
                    <Grid container pt="1rem">
                        {userRole === 'OWNER' && (
                            <>
                                <Grid item xs={2}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleOpenDialog('delete')}
                                    >
                                        {t('study.delete_study')}
                                        {/* 스터디 삭제 */}
                                    </Button>
                                </Grid>
                                <Grid item xs={10}>
                                    <Box justifyContent="flex-end" display="flex" gap={1}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate('/study')}
                                        >
                                            {t('common.cancel')}
                                            {/* 취소 */}
                                        </Button>
                                        {stdStatus === 'STD-CREATED' && (
                                            <>
                                                <Button variant="outlined" onClick={handleUpdate}>
                                                    {t('common.edit')}
                                                    {/* 수정 */}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="info"
                                                    onClick={handlePreview}
                                                >
                                                    {t('common.preview')}
                                                    {/* 미리보기 */}
                                                </Button>
                                                <Button variant="contained" onClick={handleDeploy}>
                                                    {t('common.deploy')}
                                                    {/* 배포 */}
                                                </Button>
                                            </>
                                        )}
                                        {stdStatus === 'STD-PROGRESSION' && (
                                            <>
                                                {/* <Button variant="outlined" onClick={handleUpdate}>
                                                    수정
                                                </Button> */}
                                                <Button
                                                    variant="outlined"
                                                    color="info"
                                                    onClick={() => handleOpenDialog('pause')}
                                                >
                                                    {t('common.pause')}
                                                    {/* 일시중지 */}
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleOpenDialog('done')}
                                                >
                                                    {t('common.complete')}
                                                    {/* 종료 */}
                                                </Button>
                                            </>
                                        )}
                                        {stdStatus === 'STD-PAUSE' && (
                                            <>
                                                <Button variant="outlined" onClick={handleUpdate}>
                                                    {t('common.edit')}
                                                    {/* 수정 */}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="info"
                                                    onClick={() => handleOpenDialog('progression')}
                                                >
                                                    {t('common.restart')}
                                                    {/* 재시작 */}
                                                </Button>
                                            </>
                                        )}
                                        {stdStatus === 'STD-DONE' && <></>}
                                    </Box>
                                </Grid>
                            </>
                        )}
                        {userRole === 'MAINTAINER' && (
                            <Grid item xs={12}>
                                <Box justifyContent="flex-end" display="flex" gap={1}>
                                    <Button variant="outlined" onClick={() => navigate('/study')}>
                                        {t('common.cancel')}
                                        {/* 취소 */}
                                    </Button>
                                    <Button variant="outlined" onClick={handleUpdate}>
                                        {t('common.edit')}
                                        {/* 수정 */}
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            )}
            {mode === 'write' ? (
                <MemberInvitement
                    isOpen={isOpenMember}
                    handleClose={handleCloseMember}
                    title={title}
                    mode={mode}
                    members={members}
                    setMembers={setMembers}
                />
            ) : (
                <MemberManagement
                    isOpen={isOpenMember}
                    handleClose={handleCloseMember}
                    studyNo={stdNo}
                ></MemberManagement>
            )}
            <SurveyConnectDialog
                isOpen={isOpenSurvey}
                handleClose={handleCloseSurvey}
                setStudySurveySetList={setStudySurveySetList}
                initialSurveySetList={null}
                mode="create"
            />
            <StudyDeleteConfirmDialog
                open={openDeleteConfirm}
                handleClose={handleOpenStudyDelete}
                studyNo={stdNo}
                onDeleteSuccess={handleDeleteSuccess}
                action={actionType}
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
        </Container>
    );
};

export default StudyNew;
