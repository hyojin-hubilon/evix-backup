import { PlusOutlined } from "@ant-design/icons";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { t } from "i18next";
  
const RecentParticipant = () => {
	const theme = useTheme();
	const { divider } = theme.palette;
	const createData = (
		name: string,
		dateOfBirth: string,
		enrollmentDate: string,
		roundInfo: string,
		status: string,
	) =>	
	{
		return { name, dateOfBirth, enrollmentDate, roundInfo, status };
	}
	
	const rows = [
		createData('Kate Brown', 'Dec 10, 2000', 'Jun 10, 2024', '3/12', 'In Progress'),
		createData('Daniel Heny', 'Nov 20, 1999', 'Jun 10, 2024', '12/12', 'Complete'),
		createData('Julia hose Yoon', 'Oct 24, 1982', 'Jun 10, 2024', '2/12', 'Pending'),
		createData('Clara dew Mio', 'Mar 11, 1988', 'Jun 10, 2024', '11/12', 'Approved'),
		createData('Lily Kim', 'Jul 01, 1999', 'Jun 10, 2024', '8/12', 'In Progress'),
	];

	
	return (
		<Box>
			<Grid container>
				<Grid item xs={6}>
					<Typography variant="h6" color="textSecondary">
						{t('study.recent_participant_logs')}
						{/* 최근 참여자 */}
					</Typography>
				</Grid>
				<Grid item xs={6} display="flex" justifyContent="flex-end">
					<Button><PlusOutlined style={{fontSize: '0.7rem', marginRight: '1rem'}} />more</Button>
				</Grid>
			</Grid>
			
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650  }} aria-label="simple table" size="small">
				<TableHead>
					<TableRow
						sx={{ 'td, th': {borderBottom: `1px solid ${theme.palette.grey[400]}`}}}
					>
						<TableCell>Name</TableCell>
						<TableCell align="right">Date of Birth</TableCell>
						<TableCell align="right">Enrollment Date</TableCell>
						<TableCell align="right">Round Info.</TableCell>
						<TableCell align="right">Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
					<TableRow
						key={row.name}
						sx={{ 'td, th': {borderBottom: `1px solid ${divider}`}, '&:last-child td, &:last-child th': { border: 0 } }}
					>
						<TableCell component="th" scope="row">
						{row.name}
						</TableCell>
						<TableCell align="right">{row.dateOfBirth}</TableCell>
						<TableCell align="right">{row.enrollmentDate}</TableCell>
						<TableCell align="right">{row.roundInfo}</TableCell>
						<TableCell align="right">{row.status}</TableCell>
					</TableRow>
					))}
				</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default RecentParticipant;