import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Box, Container, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Stack, Tooltip, Typography, useTheme, Button, Divider, Link } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";
import { useState } from "react";
import DateRangePicker, { DateRage } from "./components/study-new/Daterangepicker";
import MedicineInfo from "./components/study-new/MedicineInfo";

const FormTooltip = ({text}) => {
	return (
		<Tooltip title={text} placement="right">
			<IconButton size="small" sx={{fontSize: "1em"}}>
				<ExclamationCircleOutlined />
			</IconButton>
		</Tooltip>
	)
}

const StudyNew = () => {
	const theme = useTheme();
	const { divider, primary } = theme.palette;
	const [ dateRange, setDateRange ] = useState({ startDt: dayjs(), endDt: dayjs()})
	const [ medicineYOrN, setMedicineYOrN] = useState<'true' | 'false'>('false');

	const changeDateRange = (e: DateRage) => {
		//console.log(e.startDt.format('DD/MM/YYYY')); 포맷적용 예시
		setDateRange(e);
	}

	const handleChangeMedicine = (e) => {
		setMedicineYOrN(e);
	}

	return (
	<Container maxWidth="lg">
		<Typography variant="h2" mb={2}>Create Study</Typography>
		<Box sx={{p:'1rem', borderRadius: '1rem', border: `1px solid ${divider}`}}>
			<Box display="flex" alignItems="center" flexDirection="column" gap={2} sx={{p: "1rem"}}>


				{/* Study Type */}
				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5"><span style={{color: "red"}}>*</span> Study Type</Typography>
							<FormTooltip text="Study Type을 선택할 수 있습니다" />
						</Box>
					</Grid>
					<Grid item xs={9}>
						<FormControl size="small">
							<Select
								value="ePRO"
								sx={{width: "10rem"}}
								>
								<MenuItem value="ePRO">ePRO</MenuItem>
							</Select>
						</FormControl>		
					</Grid>
				</Grid>

				{/* <Divider flexItem /> */}
				
				{/* 제목 */}
				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5"><span style={{color: "red"}}>*</span> 제목</Typography>
							<FormTooltip text="Study의 제목을 입력해주세요." />
						</Box>
					</Grid>
					<Grid item xs={9}>
						<FormControl size="small" fullWidth>
							<OutlinedInput placeholder="제목" />
							<FormHelperText>Helper Text 예시</FormHelperText>
						</FormControl>
					</Grid>
				</Grid>


				{/* 기간 */}
				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5"><span style={{color: "red"}}>*</span> 기간</Typography>
							<FormTooltip text="Study를 진행할 기간을 날짜와 시간으로 입력해주세요." />
						</Box>
					</Grid>
					<Grid item xs={9}>
						<FormControl size="small">
							<DateRangePicker startDt={dateRange.startDt} endDt={dateRange.endDt} changeDate={(e) => changeDateRange(e)} />
						</FormControl>
					</Grid>
				</Grid>

				{/* 대상인원 */}
				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5"><span style={{color: "red"}}>*</span>대상인원</Typography>
							<FormTooltip text="Study에 참여할 전체 인원수를 입력해주세요." />
						</Box>
					</Grid>
					<Grid item xs={9}>
						<FormControl size="small">
							<Box display="flex" alignItems="center" gap={1}>
								<OutlinedInput placeholder="0" type="number" sx={{width: "10rem"}} /> <Typography>명</Typography>
							</Box>
						</FormControl>
					</Grid>
				</Grid>

				{/* 개요 */}
				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5">개요</Typography>
							<FormTooltip text="Study에 대한 간략한 정보와 요약내용을 입력해주세요." />
						</Box>
					</Grid>
					<Grid item xs={9}>
						<FormControl size="small" fullWidth>
							<OutlinedInput placeholder="Study에 대한 간략한 정보와 요약내용"  />
						</FormControl>
					</Grid>
				</Grid>

				{/* 질환 */}
				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5"><span style={{color: "red"}}>*</span>질환</Typography>
							<FormTooltip text="Study를 진행할 대상 질환을 입력해주세요." />
						</Box>
					</Grid>
					<Grid item xs={9}>
						<FormControl size="small" fullWidth>
							<OutlinedInput placeholder="Study를 진행할 대상 질환"  />
						</FormControl>
					</Grid>
				</Grid>

				{/* 의약품 정보 */}
				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5"><span style={{color: "red"}}>*</span>의약품 정보</Typography>
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
									display: "flex",
									flexDirection: "row"
								}}
							>
								<FormControlLabel value="true" control={<Radio size="small" />} label="있음" />
								<FormControlLabel value="false" control={<Radio size="small" />} label="없음" />
							</RadioGroup>
						</FormControl>
					</Grid>
					{
						medicineYOrN === 'true' &&
						<MedicineInfo />
					}
				</Grid>
				
				<Divider flexItem />

				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5">Survey</Typography>
							<FormTooltip text="* Study 배포전에 반드시 연결해주세요." />
						</Box>
					</Grid>
					<Grid item xs={9}>
						<Button variant="contained">Survey 연결</Button>
					</Grid>
				</Grid>

				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5">EIC(전자동의서)</Typography>
							<FormTooltip text="* Study 배포전에 반드시 연결해주세요." />
						</Box>
					</Grid>
					<Grid item xs={9}>
						<Button variant="contained">EIC 연결</Button>
					</Grid>
				</Grid>


				<Divider flexItem />

				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5">멤버관리</Typography>
						</Box>
					</Grid>
					<Grid item xs={9}>
						<Button variant="contained">초대하기</Button>
					</Grid>
				</Grid>

				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
						<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}} gap={0.5}>
							<Typography variant="h5">멤버 권한 안내</Typography>
						</Box>
					</Grid>
					<Grid item xs={9}>
						<ul style={{margin: 0, paddingLeft:"20px"}}>
							<li>
								<Typography>Owner (Study의 생성, 수정, 배포, 멤버 초대) : <span style={{fontWeight: "bold", color: primary.main }}>Ben Park</span></Typography>
							</li>
							<li>
								<Typography>Maintainer (Study의 수정, 멤버 초대) : Steve 외 1명 <Link>더보기</Link></Typography>
								{/* 아래는 초대멤버 없을때 */}
								{/* <Typography>Maintainer (Study의 수정, 멤버 초대) : <span style={{ color: 'red'}}>초대하기 팝업에서 설정해주세요.</span></Typography> */}
							</li>
							<li>
								<Typography>Developer (Study 조회) : Linda Lim 외 3명 <Link>더보기</Link></Typography>
								{/* 아래는 초대멤버 없을때 */}
								{/* <Typography>Developer (Study 조회) : <span style={{ color: 'red'}}>초대하기 팝업에서 설정해주세요.</span></Typography> */}
							</li>
						</ul>
					</Grid>
				</Grid>

			</Box>
		</Box>
		<Box display="flex" justifyContent="flex-end" pt="1rem" gap={2}>
			<Button variant="outlined" size="large">취소</Button>
			<Button variant="contained" size="large">생성</Button>
		</Box>
	</Container>)
}

export default StudyNew;