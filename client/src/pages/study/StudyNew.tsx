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
import { InviteMemberTempType } from '@/types/study';
import MemberInvitement from './components/study-new/MemberInvitement';
import MemberManagement from './components/study-new/MemberManagement';

const FormTooltip = ({ text }) => {
    return (
        <Tooltip title={text} placement="right">
            <IconButton size="small" sx={{ fontSize: '1em' }}>
                <ExclamationCircleOutlined />
            </IconButton>
        </Tooltip>
    );
};

const StudyNew = () => {
    const theme = useTheme();
    const { divider, primary } = theme.palette;
    const [dateRange, setDateRange] = useState({ startDt: dayjs(), endDt: dayjs() });
    const [medicineYOrN, setMedicineYOrN] = useState<'true' | 'false'>('false');
    const [mode, setMode] = useState<'write' | 'edit'>('write');
    const [title, setTitle] = useState('');
    const [participants, setParticipants] = useState('');
    const [description, setDescription] = useState('');
    const [disease, setDisease] = useState('');
    const [eicFile, setEicFile] = useState(null);
    const [isOpenMember, setIsOpenMember] = useState(false);
    const [isOpenSurvey, setIsOpenSurvey] = useState(false);
    const [inviteList, setInviteList] = useState<InviteMemberTempType[]>([]);
    const [managerList, setManagerList] = useState<any[]>([]);
    const [studySurveySetList, setStudySurveySetList] = useState<[]>([]);

    const [members, setMembers] = useState<InviteMemberTempType[]>([]);

    const [drug, setDrug] = useState<Drug>();
    const [country, setCountry] = useState('KO_KR');

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as { mode: 'write' | 'edit'; stdNo?: number };
    const stdNo = location.state?.stdNo;

    const [ownerName, setOwnerName] = useState('');

    const changeDateRange = (e: DateRage) => {
        setDateRange(e);
    };

    const handleChangeMedicine = (e) => {
        setMedicineYOrN(e);
    };

    const handleFileChange = (e) => {
        setEicFile(e.target.files[0]);
    };

    // 멤버관리 모달에서 owner 정보를 가져오기 위함
    const getMyProfile = async () => {
        try {
            const response = await userApi.getMyProfile();
            setOwnerName(response.content['first_name'] + ' ' + response.content['last_name']);
        } catch (error) {
            console.error('Failed to fetch owner profile:', error);
        }
    };

    const handleSubmit = async () => {
        console.log(members);

        console.log('studySurveySetList: ', studySurveySetList);

        const studyData = {
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

        console.log('studyData: ', studyData);

        // FormData 객체 생성 및 데이터 추가
        const formData = new FormData();

        const json = JSON.stringify(studyData);
        const blob = new Blob([json], { type: 'application/json' });

        formData.append('requestDto', blob);
        // 전자동의서 파일이 있는 경우 FormData에 추가
        if (eicFile) {
            formData.append('eic_file', eicFile);
        }

        try {
            const response = await studyApi.createStudy(formData);
            if (response.code === 200) {
                navigate(-1);
            }
        } catch (error) {
            console.error('Failed to Create study:', error);
        }
    };

    const handleCloseMember = () => {
        setIsOpenMember(!isOpenMember);
    };

    const handleCloseSurvey = () => {
        setIsOpenSurvey(!isOpenSurvey);
    };

    useEffect(() => {
        getMyProfile();
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
                    : '초대하기 팝업에서 설정해주세요.';
            };
        } else if (mode === 'edit') {
            return (privilege: string): string => {
                const inviteEmails = managerList
                    .filter((i) => i.std_privilege === privilege)
                    .map((i) => i.email);
                return inviteEmails.length > 0
                    ? inviteEmails.join(', ')
                    : '초대하기 팝업에서 설정해주세요.';
            };
        }
        return (privilege: string) => '초대하기 팝업에서 설정해주세요.';
    }, [members, inviteList, mode]);

    const fetchStudyDetail = async (stdNo) => {
        try {
            const response = await studyApi.getStudyDetail(stdNo);

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

            // 나머지 필드들도 필요에 따라 업데이트
        } catch (error) {
            console.error('Failed to fetch study detail:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const requestBody = {
                std_no: stdNo,
            };

            const response = await studyApi.deleteStudy(requestBody);

            if (response.code === 200) {
                alert('삭제 성공');
                navigate('/study');
            }
        } catch (error) {
            console.error('Failed to Delete Study: ', error);
        }
    };

    const handleUpdate = async () => {
        const studyData = {
            std_no: stdNo,
            title: title,
            std_type: 'E-PRO',
            std_start_date: dateRange.startDt.format('YYYY-MM-DD'),
            std_end_date: dateRange.endDt.format('YYYY-MM-DD'),
            target_number: parseInt(participants),
            description: description,
            disease: disease,
            // location: country,   requestDto에 없음
            drug_code: medicineYOrN === 'true' ? drug?.itemCode ?? null : null,
            drug_brand_name: medicineYOrN === 'true' ? drug?.companyName ?? null : null,
            drug_manufacturer_name: medicineYOrN === 'true' ? drug?.productName ?? null : null,
            // studySurveySetList: [],
            // inviteList: [],
        };

        console.log('studyData: ', studyData);

        // FormData 객체 생성 및 데이터 추가
        const formData = new FormData();

        const json = JSON.stringify(studyData);
        const blob = new Blob([json], { type: 'application/json' });

        formData.append('requestDto', blob);
        // 전자동의서 파일이 있는 경우 FormData에 추가
        if (eicFile) {
            formData.append('eic_file', eicFile);
        }

        try {
            const response = await studyApi.updateStudy(formData);
            if (response.code === 200) {
                navigate(-1);
            }
        } catch (error) {
            console.error('Failed to update study:', error);
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

        // FormData 객체 생성 및 데이터 추가
        const formData = new FormData();

        const json = JSON.stringify(studyData);
        const blob = new Blob([json], { type: 'application/json' });

        formData.append('requestDto', blob);
        // 전자동의서 파일이 있는 경우 FormData에 추가
        if (eicFile) {
            formData.append('eic_file', eicFile);
        }

        try {
            const response = await studyApi.deployStudy(formData);
            if (response.code === 200) {
                alert('Study가 배포되었습니다.');
                navigate('/study');
            }
        } catch (error) {
            console.error('Failed to deploy study: ', error);
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
                                    <span style={{ color: 'red' }}>*</span> Study Type
                                </Typography>
                                <FormTooltip text="Select the Study Type" />
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
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 제목 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">
                                    <span style={{ color: 'red' }}>*</span> 제목
                                </Typography>
                                <FormTooltip text="Enter the title of the Study" />
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small" fullWidth>
                                <OutlinedInput
                                    placeholder="제목"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <FormHelperText>Helper Text 예시</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 기간 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">
                                    <span style={{ color: 'red' }}>*</span> 기간
                                </Typography>
                                <FormTooltip text="Enter the duration of the Study" />
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
                                    <span style={{ color: 'red' }}>*</span>대상인원
                                </Typography>
                                <FormTooltip text="Enter the number of participants" />
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
                                    <Typography>명</Typography>
                                </Box>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 개요 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">개요</Typography>
                                <FormTooltip text="Enter a brief summary of the Study" />
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small" fullWidth>
                                <OutlinedInput
                                    placeholder="Study에 대한 간략한 정보와 요약내용"
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
                                    <span style={{ color: 'red' }}>*</span>질환
                                </Typography>
                                <FormTooltip text="Enter the disease for the Study" />
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small" fullWidth>
                                <OutlinedInput
                                    placeholder="Study를 진행할 대상 질환"
                                    value={disease}
                                    onChange={(e) => setDisease(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* 의약품 정보 */}
                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">
                                    <span style={{ color: 'red' }}>*</span>의약품 정보
                                </Typography>
                                <FormTooltip text="Enter the drug information if applicable" />
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
                                        label="있음"
                                    />
                                    <FormControlLabel
                                        value="false"
                                        control={<Radio size="small" />}
                                        label="없음"
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
                                        <FormTooltip text="Connect the Survey before Study deployment." />
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setIsOpenSurvey(true);
                                        }}
                                    >
                                        Survey 연결
                                    </Button>
                                    <span style={{ color: 'red' }}>
                                        {'  '}* Study 배포전에 반드시 연결해주세요.
                                    </span>
                                </Grid>
                            </Grid>

                            {/* EIC(전자동의서) */}
                            <Grid container alignItems="flex-start">
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{ pt: '0.2rem' }}
                                        gap={0.5}
                                    >
                                        <Typography variant="h5">EIC(전자동의서)</Typography>
                                        <FormTooltip text="Connect the EIC before Study deployment." />
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Button variant="contained">EIC 연결</Button>
                                    <span style={{ color: 'red' }}>
                                        {'  '}* Study 배포전에 반드시 연결해주세요.
                                    </span>
                                </Grid>
                            </Grid>

                            <Divider flexItem />

                            {/* 멤버 관리 */}
                            <Grid container alignItems="flex-start">
                                <Grid item xs={3}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{ pt: '0.2rem' }}
                                        gap={0.5}
                                    >
                                        <Typography variant="h5">멤버 관리</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setIsOpenMember(true);
                                        }}
                                    >
                                        초대하기
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
                                        <Typography variant="h5">멤버 권한 안내</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        <li>
                                            <Typography>
                                                Owner (Study의 생성, 수정, 배포, 멤버 초대) :{' '}
                                                <span
                                                    style={{
                                                        fontWeight: 'bold',
                                                        color: primary.main,
                                                    }}
                                                >
                                                    {ownerName}
                                                </span>
                                            </Typography>
                                        </li>

                                        {mode === 'write' ? (
                                            <>
                                                <li>
                                                    <Typography>
                                                        초대 멤버(Maintainer) :{' '}
                                                        <span style={{ color: 'red' }}>
                                                            {getEmailByPrivilege('MAINTAINER')}
                                                        </span>
                                                    </Typography>
                                                </li>
                                                <li>
                                                    <Typography>
                                                        초대 멤버(Developer) :{' '}
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
                                                        Maintainer (Study의 수정, 멤버 초대) :{' '}
                                                        <span style={{ color: 'red' }}>
                                                            {getEmailByPrivilege('MAINTAINER')}
                                                        </span>
                                                    </Typography>
                                                </li>
                                                <li>
                                                    <Typography>
                                                        Developer (Study 조회) :{' '}
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
                        취소
                    </Button>
                    <Button variant="contained" size="large" onClick={handleSubmit}>
                        생성
                    </Button>
                </Box>
            ) : (
                // 수정 모드에서 보여질 UI
                <Grid container pt="1rem">
                    <Grid item xs={2}>
                        {/* 오너에게만 표시 */}
                        <Button variant="outlined" color="error" onClick={handleDelete}>
                            스터디 삭제
                        </Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Box justifyContent="flex-end" display="flex" gap={1}>
                            <Button variant="outlined">취소</Button>
                            <Button variant="outlined" onClick={handleUpdate}>
                                수정
                            </Button>
                            <Button variant="outlined" color="info">
                                미리보기
                            </Button>
                            <Button variant="contained" onClick={handleDeploy}>
                                배포
                            </Button>
                        </Box>
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
            />
        </Container>
    );
};

export default StudyNew;
