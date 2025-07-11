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
    Chip,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import DateRangePicker, { DateRage } from './components/study-new/Daterangepicker';
import MedicineInfo from './components/study-new/MedicineInfo';

import studyApi from '@/apis/study';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drug } from '@/apis/test/drug/drugsAPI_TEST';
import SurveyConnectDialog from './components/study-new/SurveyConnetDialog';
import { InviteMemberTempType, Manager, StdType, Study, StudyCrfSet, StudyDetail, StudySurveyList, StudySurveySetList } from '@/types/study';
import MemberInvitement from './components/study-new/MemberInvitement';
import MemberManagement from './components/study-new/MemberManagement';
import StudyDeleteConfirmDialog from './components/study-new/StudyDeleteConfirmDialog';
import EicParent from './components/eic/EicParent';
import { t } from 'i18next';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { useUserProfile } from '@/context/UserProfileContext';
import AddLinkIcon from '@mui/icons-material/AddLink';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DatePicker from 'antd/lib/date-picker';
import ECrfConnectDialog from './components/study-new/ECrfConnectDialog';
import { MyCRFList, StudyCrfListRespone } from '@/types/ecrf';
import ecrfApi from '@/apis/ecrf';

const FormTooltip = ({text}: {text: React.ReactNode}) => {
    return (
        <Tooltip title={text} placement="right">
            <IconButton size="small" sx={{ fontSize: '1em' }}>
                <ExclamationCircleOutlined />
            </IconButton>
        </Tooltip>
    );
};

const { RangePicker } = DatePicker;

type ActionType = 'delete' | 'pause' | 'stop' | 'restart';

const StudyNew = () => {
    const { userProfile, setUserProfile } = useUserProfile();

    const theme = useTheme();
    const { divider, primary } = theme.palette;
    const [dateRange, setDateRange] = useState({ startDt: dayjs(), endDt: dayjs() });
    const [dateSet, setDateSet] = useState({ startDt: '', endDt: '' });
    // const [dateRange, setDateRange] = useState({ startDt: dayjs(), endDt: dayjs() });

	const [stdType, setStdType] = useState<StdType>('ePRO');
    const [medicineYOrN, setMedicineYOrN] = useState<'true' | 'false'>('false');
    const [mode, setMode] = useState<'write' | 'edit'>('write');
    const [title, setTitle] = useState('');
    const [participants, setParticipants] = useState<string>('');
    const [description, setDescription] = useState('');
    const [disease, setDisease] = useState('');
    const [eicFile, setEicFile] = useState<File | null>(null);
    const [isOpenMember, setIsOpenMember] = useState(false);
    const [isOpenSurvey, setIsOpenSurvey] = useState(false);
	const [isOpenCrf, setIsOpenCrf] = useState(false);
    const [inviteList, setInviteList] = useState<InviteMemberTempType[]>([]);
    const [managerList, setManagerList] = useState<Manager[]>([]);
    const [studySurveySetList, setStudySurveySetList] = useState<StudySurveySetList[]>([]);
	
	const [surveyTitles, setSurveyTitles] = useState<string[]>();
	const [studyCrfSetList, setStudyCrfSetList] = useState<StudyCrfSet[]>([]);
	// const [eCrfList, setECrfList] = useState<StudyCrfListRespone[]>([]);
	// const [eCRFTitles, setECRFTitles] = useState<string[]>();
	const [eicYorN, setEicYorN] = useState<'Y' | 'N'>('N');



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
    const stdNo = location.state?.stdNo as number;
    const [stdStatus, setStdStatus] = useState<string>('');
	const [rangePickerDisable, setRangePickerDisable] = useState<[boolean, boolean]>([false, false]);
	
	
    // 유효성 검사
    const [errors, setErrors] = useState({
        title: '',
        participants: '',
        disease: '',
    });

    const validate = () => {
        const tempErrors = { ...errors };

        tempErrors.title = title ? '' : t('study.please_enter_title'); //제목을 입력해 주세요
        tempErrors.participants = participants ? '' : t('study.please_enter_target'); //대상인원을 입력해 주세요
        tempErrors.disease = disease ? '' : t('study.please_enter_disease'); //질환을 입력해 주세요

        setErrors(tempErrors);

        return Object.values(tempErrors).every((x) => x === '');
    };

	const handleChangeStdType = (e:StdType) => {
		setStdType(e);
	}

    const changeDateRange = (e: DateRage) => {
        setDateRange(e);
    };

    const handleChangeMedicine = (e:"true" | "false") => {
        setMedicineYOrN(e);
    };

	
	const handleChangeEicYorN = (e:"Y" | "N") => {
        setEicYorN(e);
    };

    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    const handleDeleteSuccess = () => {
        navigate('/study');
    };

    const handleOpenStudyDelete = () => {
        setOpenDeleteConfirm(!openDeleteConfirm);
    };

    type ActionType = 'delete' | 'pause' | 'done' | 'progression';
    const [actionType, setActionType] = useState<ActionType>('delete');

    const handleOpenDialog = (action:ActionType) => {
        setActionType(action);
        setOpenDeleteConfirm(true);
    };

    const handleCloseDialog = () => {
        setOpenDeleteConfirm(false);
    };

    

    const handleSubmit = async () => {
        if (validate()) {
            const studyData : Study = {
                std_payment_status: 'WAIT',
                deploy_method: 'IMMEDIATE',
                std_status: 'STD-CREATED',
                title,
                std_type: stdType === 'ePRO' ? 'E-PRO' : (stdType === 'eCOA' ? 'E-COA' : 'E-CRF'),
                std_start_date: dateSet.startDt,
                std_end_date: dateSet.endDt,
                target_number: parseInt(participants),
                description,
                disease,
                location: country,
                drug_code: drug?.itemCode ? drug.itemCode :  null,
                drug_brand_name: drug?.companyName ? drug.companyName :  null,
                drug_manufacturer_name: drug?.productName ? drug.productName :  null,
                studySurveySetList: studySurveySetList ? studySurveySetList :  [], //Study Type이 ePRO, eCOA 일 경우 연결할 Survey 목록
				studyCaseReportFormPairList: studyCrfSetList ? studyCrfSetList : [], //Study Type이 eCRF일 경우 연결할 CRF Sheet 목록
                inviteList: members ? members : [],
				use_your_own_consent_form: stdType === 'eCRF' ?  eicYorN : null//Study Type이 eCRF일 경우 EIC를 DCT에 파일 업로드 없이 기관에서 받을 경우 필요한 컬럼
            };

			if(stdType === 'eCRF') {
				delete studyData.studySurveySetList; //Study Type이 eCRF일 경우 연결할 Survey 리스트 항목 지움
			} else {
				delete studyData.studyCaseReportFormPairList; //Study Type이 ePRO, eCOA일 경우 CRF Sheet 리스트 항목 지움
				delete studyData.use_your_own_consent_form; //Study Type이 ePRO, eCOA일 경우 EIC 유무 지움
			}

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
                const response = await studyApi.createStudy(formData, stdType);
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

	const handleCloseCrf = () => {
		setIsOpenCrf(!isOpenCrf);
	}

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
            fetchStudyDetail(state.stdNo as number); // 스터디 상세 정보 가져오기
			setRangePickerDisable([true, false]);
			
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
                    .filter((i) => i.std_privilege === privilege) //InviteMemberTempType..?
                    .map((i) => i.email); //edit에선 추가 불가능 하니까 빼도 될듯..?
                return inviteEmails.length > 0
                    ? inviteEmails.join(', ')
                    : t('study.please_set_it_invite'); //'초대하기 팝업에서 설정해주세요.';
            };
        }
        return (privilege: string) => t('study.please_set_it_invite'); //'초대하기 팝업에서 설정해주세요.';
    }, [members, inviteList, mode]);

	const [crfSetList, setCrfSetList] = useState<StudyCrfListRespone[]>([]);
	const getECRFList = async (stdNo) => {
		const reponse = await ecrfApi.getStudyCrfpair(stdNo);
		const crfList = reponse.content;
		setCrfSetList(crfList);
	};
	
    const [studyDetail, setStudyDetail] = useState<StudyDetail>();

    const fetchStudyDetail = async (stdNo:number) => {
        try {
            const response = await studyApi.getStudyDetail(stdNo);

			const studyContents = response.content;
            setStudyDetail(studyContents);
			const std_type = studyContents.std_type === 'E-PRO' ? 'ePRO' : (studyContents.std_type === 'E-COA' ? 'eCOA' : 'eCRF');
			setStdType(std_type);
            setTitle(studyContents['title']);
            setParticipants(studyContents['target_number']);
            setDescription(studyContents['description']);
            setDisease(studyContents['disease']);
            setDateSet({
                startDt: studyContents['std_start_date'],
                endDt: studyContents['std_end_date'],
            });
            setStudySurveySetList(studyContents['studySurveySetList']);

			const titles = studyContents['studySurveySetList']?.map((cycle: StudySurveySetList) => {
				return cycle.surveyList.map((survey: StudySurveyList) => survey.title).join(', ');
			});

			setSurveyTitles(titles);
            setInviteList(studyContents['inviteList']);
            setManagerList(studyContents['managerList']);

			if(studyContents['std_type'] === 'E-CRF') {
				getECRFList(studyContents['std_no'])
			}


            if (studyContents['drug_code']) {
                setDrug({
                    itemCode: studyContents['drug_code'],
                    companyName: studyContents['drug_brand_name'],
                    productName: studyContents['drug_manufacturer_name'],
                });
                setMedicineYOrN('true');
            }
            setStdStatus(studyContents['std_status']);
        } catch (error) {
            console.error('Failed to fetch study detail:', error);
        }
    };

    console.log('studyDetail:', studyDetail);
    console.log('dateSet::', dateSet);

    const handleUpdate = async () => {
        if (validate()) {
            const studyData :Study = {
                std_no: stdNo,
                title,
                std_type: stdType === 'ePRO' ? 'E-PRO' : (stdType === 'eCOA' ? 'E-COA' : 'E-CRF'),
                std_start_date: dateSet.startDt,
                std_end_date: dateSet.endDt,
                target_number: parseInt(participants),
                description,
                disease,
                drug_code: medicineYOrN === 'true' ? drug?.itemCode ?? null : null,
                drug_brand_name: medicineYOrN === 'true' ? drug?.companyName ?? null : null,
                drug_manufacturer_name: medicineYOrN === 'true' ? drug?.productName ?? null : null
            };

			if(stdType === 'eCRF') {
				studyData.use_your_own_consent_form = eicYorN; //Study Type이 eCRF일 경우 EIC를 DCT에 파일 업로드 없이 기관에서 받을 경우 필요한 컬럼
			}

            try {
                const response = await studyApi.updateStudy(studyData, stdType);
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
        const { studySurveySetList, eic_name, std_type, use_your_own_consent_form } = studyDetail || {};

		
        if (std_type !=='E-CRF' && (!studySurveySetList || !eic_name)) {
            return confirm({
                description: t('study.deployFailure'), // Survey와 EIC를 연결해주세요.
                variant: 'info',
            });
        }

		if (std_type ==='E-CRF' && (!crfSetList || (use_your_own_consent_form == 'N' && !eic_name))) {
            return confirm({
                description: t('study.deployFailure2'), //  eCRF Sheet와 EIC를 연결해주세요.
                variant: 'info',
            });
        }

        const studyData : Study = {
            std_no: stdNo,
            title,
			std_type: stdType === 'ePRO' ? 'E-PRO' : (stdType === 'eCOA' ? 'E-COA' : 'E-CRF'),
            std_start_date: dateSet.startDt,
            std_end_date: dateSet.endDt,
            target_number: parseInt(participants),
            description,
            disease,
            drug_code: medicineYOrN === 'true' ? (drug?.itemCode ? drug?.itemCode : null) : null,
            drug_brand_name: medicineYOrN === 'true' ? (drug?.companyName ? drug?.companyName : null) : null,
            drug_manufacturer_name: medicineYOrN === 'true' ? (drug?.productName ?  drug.productName : null) : null,
            std_status: 'STD-PROGRESSION'
        };

		if(stdType === 'eCRF') {
			studyData.use_your_own_consent_form = eicYorN; //Study Type이 eCRF일 경우 EIC를 DCT에 파일 업로드 없이 기관에서 받을 경우 필요한 컬럼
		}

        try {
            const response = await studyApi.deployStudy(studyData, stdType);
            if (response.code === 200) {
                const inviteCodeRes = await studyApi.createParticipantInviteCode({
                    std_no: stdNo,
                });

                if (inviteCodeRes.code === 200) {
                    void confirm({
                        description: t('study.study_has_been_deployed'), // Study가 배포되었습니다.
                        variant: 'info',
                    }).then(() => navigate('/study'));
                }
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

    const onChangeDate = (date, dateString) => {
        if (date && date.length > 0) {
            setDateSet({
                startDt: dateString[0],
                endDt: dateString[1],
            });
        }
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
                                    value={stdType}
                                    disabled={mode === 'edit'} // 수정 모드에서는 비활성화
                                    sx={{ width: '10rem' }}
									onChange={(e) => handleChangeStdType(e.target.value as StdType)}
                                >
                                    <MenuItem value="ePRO">ePRO</MenuItem>
                                    <MenuItem value="eCOA" disabled>
                                        eCOA
                                        <Chip
                                            color="warning"
                                            size="small"
                                            label="COMING SOON"
                                            sx={{ fontSize: '0.6rem', ml: '5px' }}
                                        />
                                    </MenuItem>
                                    <MenuItem value="eCRF">
                                        eCRF
                                        {/* <Chip
                                            color="warning"
                                            size="small"
                                            label="COMING SOON"
                                            sx={{ fontSize: '0.6rem', ml: '5px' }}
                                        /> */}
                                    </MenuItem>
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
                                {/* <DateRangePicker
                                    startDt={dateRange.startDt}
                                    endDt={dateRange.endDt}
                                    changeDate={(e) => changeDateRange(e)}
                                /> */}
                                <RangePicker
                                    placement="bottomRight"
                                    style={{
                                        padding: '6px 11px',
                                        borderRadius: '4px',
                                        minHeight: '1.4375em',
                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                    }}
                                    // value={[dayjs(dateSet.startDt), dayjs(dateSet.endDt)]} // dayjs로 날짜 변환
                                    value={
                                        dateSet.startDt && dateSet.endDt
                                            ? [dayjs(dateSet.startDt), dayjs(dateSet.endDt)]
                                            : null
                                    }
									disabled={rangePickerDisable}
									allowEmpty
									minDate={dateSet.startDt ? dayjs(dateSet.startDt) : dayjs()}
                                    onChange={onChangeDate}
									allowClear={false}
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
                                    onChange={(e) => handleChangeMedicine(e.target.value as 'true' | 'false')}
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

                            {/* eCRF or Survey */}
							{
								stdType === 'eCRF' ?
								
								<Grid container alignItems="flex-start">
									<Grid item xs={3}>
										<Box
											display="flex"
											alignItems="center"
											sx={{ pt: '0.2rem' }}
											gap={0.5}
										>
											<Typography variant="h5">eCRF Sheet</Typography>
											<FormTooltip text={t('study.connect_the_eCRF')} />
											{/* Connect the Survey before Study deployment. */}
										</Box>
									</Grid>
									<Grid item xs={9}>
										<Button
											variant="contained"
											onClick={() => {
												setIsOpenCrf(true);
											}}
											sx={{ minWidth: '166px' }}
										>
											<AddLinkIcon sx={{ mr: '5px', fontSize: '1.2rem' }} />
											{t('study.connect_eCRF')}
											{/* eCRF 연결 */}
										</Button>
										{'  '}
										{surveyTitles && surveyTitles.length > 0 ? (
											<span
												style={{
													fontWeight: 'bold',
													color: primary.main,
												}}
											>
												{surveyTitles}
											</span>
										) : (
											<span style={{ color: 'red' }}>
												{t('study.make_sure_connect')}
												{/* * Study 배포전에 반드시 연결해주세요. */}
											</span>
										)}
									</Grid>
								</Grid>
								:
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
											sx={{ minWidth: '166px' }}
										>
											<AddLinkIcon sx={{ mr: '5px', fontSize: '1.2rem' }} />
											{t('study.connect_survey')}
											{/* Survey 연결 */}
										</Button>
										{'  '}
										{surveyTitles && surveyTitles.length > 0 ? (
											<span
												style={{
													fontWeight: 'bold',
													color: primary.main,
												}}
											>
												{surveyTitles}
											</span>
										) : (
											<span style={{ color: 'red' }}>
												{t('study.make_sure_connect')}
												{/* * Study 배포전에 반드시 연결해주세요. */}
											</span>
										)}
									</Grid>
								</Grid>
							}
                            

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
                                            {/* {t('study.eic')} */}
                                            {t('study.eic')
                                                .split('\n')
                                                .map((line, index) => (
                                                    <React.Fragment key={index}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                        </Typography>
										{
											eicYorN !== 'Y' &&
											<FormTooltip text={ t('study.connect_the_eic') } />
										}
                                        
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
									{
										stdType === 'eCRF' ?
										<Box>
										<FormControl size="small">
											<RadioGroup
												aria-labelledby="medicine-group"
												name="medicine-group"
												value={eicYorN}
												onChange={(e) => handleChangeEicYorN(e.target.value as 'Y' | 'N')}
												sx={{
													display: 'flex',
													flexDirection: 'row',
												}}
											>
												<FormControlLabel
													value="Y"
													control={<Radio size="small" />}
													label={t('study.yes')} //있음
												/>
												<FormControlLabel
													value="N"
													control={<Radio size="small" />}
													label={t('study.no')} //없음
												/>
											</RadioGroup>
										</FormControl>
										<>
										{
											eicYorN === 'N' && <>
											<Button
												variant="contained"
												onClick={handleOpenUploadBasePdf}
												sx={{ minWidth: '166px' }}
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
										</>
										}
										</>
										</Box>
										:
										<>
										<Button
                                        variant="contained"
                                        onClick={handleOpenUploadBasePdf}
                                        sx={{ minWidth: '166px' }}
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
									</>

									}
                                    
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
                                        sx={{ minWidth: '166px' }}
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
												{
													studyDetail && studyDetail?.std_end_date > dayjs().format('YYYY-MM-DD') &&
													<Button
                                                    variant="outlined"
                                                    color="info"
                                                    onClick={() => handleOpenDialog('pause')}
                                                >
                                                    {t('common.pause')}
                                                    {/* 일시중지 */}
                                                </Button>
												}
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

			<ECrfConnectDialog
                isOpen={isOpenCrf}
                handleClose={handleCloseCrf}
                setStudyCrfSetList={setStudyCrfSetList}
                initialCrfSetList={null}
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
