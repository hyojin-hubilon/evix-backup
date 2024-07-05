import { Avatar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
  
const StudyMemberStatus = () => {
	const theme = useTheme();
	const { divider } = theme.palette;
	const createData = (
		profilePic: string,//프로필이미지
		name: string,//이름
		authority: string,//권한
		belong: string,//소속
		email: string, //이메일
		inviteDate: string, //초대발송일자
		inviteStatus: string //승인상태
	) =>	
	{
		return { profilePic, name, authority, belong, email, inviteDate, inviteStatus  };
	}
	
	const rows = [
		createData('', 'Kate Brown', 'Maintainer', '순천향대학교 중앙의료원', 'apple2024@naver.com', '2024.06.01 22:15', 'Approved'),
		createData('', 'Daniel Heny', 'Developer', '건국대학교 병원', 'banana2024@naver.com', '2024.06.01 22:15', 'Approved'),
		createData('', 'Julia hose Yoon', 'Developer', '순천향대학교 중앙의료원', 'mango2024@naver.com', '2024.06.01 22:15', 'Approved'),
		createData('', '-', 'Maintainer', '-', 'Clara_dew_Mio@gmail.com', '2024.06.01 22:15', 'Waiting for approval'),
	];

	
	return (
		<Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650  }} aria-label="simple table" size="small">
				<TableHead>
					<TableRow
						sx={{ 'td, th': {borderBottom: `1px solid ${theme.palette.grey[400]}`}}}
					>
						<TableCell></TableCell>
						<TableCell>Name</TableCell>
						<TableCell align="center">권한</TableCell>
						<TableCell align="center">소속</TableCell>
						<TableCell align="center">email</TableCell>
						<TableCell align="center">초대발송일자</TableCell>
						<TableCell align="center">승인상태</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
					<TableRow
						key={row.name}
						sx={{ 'td, th': {borderBottom: `1px solid ${divider}`}, '&:last-child td, &:last-child th': { border: 0 } }}
					>
						<TableCell component="th" scope="row">
							<Avatar alt={row.name} src={row.profilePic} />
						</TableCell>
						<TableCell component="th" scope="row">
						{row.name}
						</TableCell>
						<TableCell align="center">{row.authority}</TableCell>
						<TableCell align="center">{row.belong}</TableCell>
						<TableCell align="center">{row.email}</TableCell>
						<TableCell align="center">{row.inviteDate}</TableCell>
						<TableCell align="center">{row.inviteStatus}</TableCell>
					</TableRow>
					))}
				</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default StudyMemberStatus;