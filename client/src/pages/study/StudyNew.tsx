import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Box, Container, FormControl, FormHelperText, Grid, IconButton, MenuItem, OutlinedInput, Select, Tooltip, Typography, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const StudyNew = () => {
	const theme = useTheme();
	const { divider } = theme.palette;
	return (
	<Container maxWidth="lg">
		<Typography variant="h2" mb={2}>Create Study</Typography>
		<Box sx={{p:'1rem', borderRadius: '1rem', border: `1px solid ${divider}`}}>
			<Box display="flex" alignItems="center" flexDirection="column" gap={2} sx={{p: "1rem"}}>
			
				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
							<Box display="flex" alignItems="center" sx={{pt:"0.2rem"}}>
								<Typography variant="h5"><span style={{color: "red"}}>*</span> Study Type</Typography>
								<Tooltip title="Study Type을 선택할 수 있습니다" placement="right">
									<IconButton size="small">
										<ExclamationCircleOutlined />
									</IconButton>
								</Tooltip>
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
				
				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
							<Box display="flex" alignItems="center" sx={{pt:"0.5rem"}}>
								<Typography variant="h5"><span style={{color: "red"}}>*</span> 제목</Typography>
								<Tooltip title="Study의 제목을 입력해주세요." placement="right">
									<IconButton size="small">
										<ExclamationCircleOutlined />
									</IconButton>
								</Tooltip>
							</Box>
					</Grid>
					<Grid item xs={9}>
						<FormControl size="small" fullWidth>
							<OutlinedInput placeholder="제목" />
							<FormHelperText>Helper Text 예시</FormHelperText>
						</FormControl>
					</Grid>
				</Grid>


				<Grid container alignItems="flex-start">
					<Grid item xs={3}>
							<Box display="flex" alignItems="center" sx={{pt:"0.5rem"}}>
								<Typography variant="h5"><span style={{color: "red"}}>*</span> 기간</Typography>
								<Tooltip title="Study를 진행할 기간을 날짜와 시간으로 입력해주세요." placement="right">
									<IconButton size="small">
										<ExclamationCircleOutlined />
									</IconButton>
								</Tooltip>
							</Box>
					</Grid>
					<Grid item xs={9}>
						<FormControl size="small">
							{/* <DatePicker /> */}
						</FormControl>
					</Grid>
				</Grid>

			</Box>
		</Box>
	</Container>)
}

export default StudyNew;