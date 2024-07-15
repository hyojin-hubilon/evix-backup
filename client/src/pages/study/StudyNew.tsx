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
    Link,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';
import DateRangePicker, { DateRage } from './components/study-new/Daterangepicker';
import MedicineInfo from './components/study-new/MedicineInfo';
import MemberMangement from "./components/study-new/MemberManagement";

import * as StudyApiType from '@/types/study';
import studyApi from '@/apis/study';
import { useNavigate } from 'react-router-dom';
import SurveyConnectDialog from './components/study-new/SurveyConnetDialog';

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
	const [ isOpenMember, setIsOpenMemmber ] = useState(false);
	const [ isOpenSurvey, setIsOpenSurvey ] = useState(false);

    const navigate = useNavigate();

    const changeDateRange = (e: DateRage) => {
        setDateRange(e);
    };

    const handleChangeMedicine = (e) => {
        setMedicineYOrN(e);
    };

    const handleFileChange = (e) => {
        setEicFile(e.target.files[0]);
    };

    // const handleSubmit = async () => {
    //     const studyData = {
    //         std_status: 'STD-CREATED',
    //         title: title,
    //         std_type: 'E-PRO',
    //         std_start_date: dateRange.startDt.format('YYYY-MM-DD'),
    //         std_end_date: dateRange.endDt.format('YYYY-MM-DD'),
    //         target_number: parseInt(participants),
    //         description: description,
    //         disease: disease,
    //         drug_code: null,
    //         studySurveySetList: [],
    //         inviteList: [],
    //     };

    //     // FormData 객체 생성 및 데이터 추가
    //     const formData = new FormData();
    //     formData.append('requestDto', JSON.stringify(studyData));
    //     // eic_file은 무시

    //     try {
    //         const response = await studyApi.createStudy(formData);
    //         if (response.code === 200) {
    //             navigate(-1);
    //         }
    //     } catch (error) {
    //         console.error('Failed to Create study:', error);
    //     }
    // };
    const handleSubmit = async () => {
        const studyData = {
            std_status: 'STD-CREATED',
            title: title,
            std_type: 'E-PRO',
            std_start_date: dateRange.startDt.format('YYYY-MM-DD'),
            std_end_date: dateRange.endDt.format('YYYY-MM-DD'),
            target_number: parseInt(participants),
            description: description,
            disease: disease,
            drug_code: null,
            studySurveySetList: [],
            inviteList: [],
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
            const response = await studyApi.createStudy(formData);
            if (response.code === 200) {
                navigate(-1);
            }
        } catch (error) {
            console.error('Failed to Create study:', error);
        }
    };

	const handleCloseMember = () => {
		setIsOpenMemmber(!isOpenMember);
	}

	const handleCloseSurvey = () => {
		setIsOpenSurvey(!isOpenSurvey);
	}

    return (
        <Container maxWidth="lg">
            <Typography variant="h2" mb={2}>
                Create Study
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
                                <FormTooltip text="Study Type을 선택할 수 있습니다" />
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl size="small">
                                <Select value="ePRO" sx={{ width: '10rem' }}>
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
                                <FormTooltip text="Study의 제목을 입력해주세요." />
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
                                <FormTooltip text="Study를 진행할 기간을 날짜와 시간으로 입력해주세요." />
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
                                <FormTooltip text="Study에 참여할 전체 인원수를 입력해주세요." />
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
                                <FormTooltip text="Study에 대한 간략한 정보와 요약내용을 입력해주세요." />
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
                                <FormTooltip text="Study를 진행할 대상 질환을 입력해주세요." />
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
                                <FormTooltip text="대상 의약품이 있을 경우, 의약품 검색으로 정보를 입력할 수 있습니다." />
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
                        {medicineYOrN === 'true' && <MedicineInfo />}
                    </Grid>

                    <Divider flexItem />

                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">Survey</Typography>
                                <FormTooltip text="* Study 배포전에 반드시 연결해주세요." />
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Button variant="contained" onClick={() => setIsOpenSurvey(true)}>Survey 연결</Button>
                        </Grid>
                    </Grid>

                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">EIC(전자동의서)</Typography>
                                <FormTooltip text="* Study 배포전에 반드시 연결해주세요." />
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Button variant="contained">EIC 연결</Button>
                            {/* <input type="file" onChange={handleFileChange} /> 임시로*/}
                        </Grid>
                    </Grid>

                    <Divider flexItem />

                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">멤버관리</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Button variant="contained" onClick={() => {setIsOpenMemmber(true)}}>초대하기</Button>
                        </Grid>
                    </Grid>

                    <Grid container alignItems="flex-start">
                        <Grid item xs={3}>
                            <Box display="flex" alignItems="center" sx={{ pt: '0.2rem' }} gap={0.5}>
                                <Typography variant="h5">멤버 권한 안내</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                <li>
                                    <Typography>
                                        Owner (Study의 생성, 수정, 배포, 멤버 초대) :{' '}
                                        <span style={{ fontWeight: 'bold', color: primary.main }}>
                                            Ben Park
                                        </span>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography>
                                        Maintainer (Study의 수정, 멤버 초대) : Steve 외 1명{' '}
                                        <Link>더보기</Link>
                                    </Typography>
                                    {/* 아래는 초대멤버 없을때 */}
                                    {/* <Typography>Maintainer (Study의 수정, 멤버 초대) : <span style={{ color: 'red'}}>초대하기 팝업에서 설정해주세요.</span></Typography> */}
                                </li>
                                <li>
                                    <Typography>
                                        Developer (Study 조회) : Linda Lim 외 3명{' '}
                                        <Link>더보기</Link>
                                    </Typography>
                                    {/* 아래는 초대멤버 없을때 */}
                                    {/* <Typography>Developer (Study 조회) : <span style={{ color: 'red'}}>초대하기 팝업에서 설정해주세요.</span></Typography> */}
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {mode == 'write' ? (
                <Box display="flex" justifyContent="flex-end" pt="1rem" gap={2}>
                    <Button variant="outlined" size="large">
                        취소
                    </Button>
                    <Button variant="contained" size="large" onClick={handleSubmit}>
                        생성
                    </Button>
                </Box>
            ) : (
                // 일반멤버에게는 하단 전체 다 표시 안됨
                <Grid container pt="1rem">
                    <Grid item xs={2}>
                        {/* 오너에게만 표시 */}
                        <Button variant="outlined" color="error">
                            스터디 삭제
                        </Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Box justifyContent="flex-end" display="flex" gap={1}>
                            <Button variant="outlined">취소</Button>
                            <Button variant="outlined">수정</Button>
                            <Button variant="outlined" color="info">
                                미리보기
                            </Button>
                            <Button variant="contained">배포</Button>

                            {/* <Button variant="outlined" color="warning">일시중지</Button>
                        <Button variant="outlined" color="error">종료</Button>
                        <Button variant="outlined" color="info">재시작</Button> */}
                        </Box>
                    </Grid>
                </Grid>
            )}
			<MemberMangement isOpen={isOpenMember} handleClose={handleCloseMember} />
			<SurveyConnectDialog isOpen={isOpenSurvey} handleClose={handleCloseSurvey}/>
        </Container>
		
    );
};

export default StudyNew;
