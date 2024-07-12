import { RegistrableSurvey } from "@/apis/survey";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, useTheme, FormControl, Checkbox, IconButton } from "@mui/material";
import dayjs from 'dayjs';
import { ChangeEvent, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';

type SurveyListTableProps = {
	surveyList: RegistrableSurvey[],
	handleSelected: (survey: RegistrableSurvey[]) => void
}
const SurveyListTable = ({surveyList, handleSelected}: SurveyListTableProps) => {
	const theme = useTheme();
	const { divider } = theme.palette;
	const [selectedSurvey, setSelectedSurvey] = useState<RegistrableSurvey[]>([]);

	const handleSelectSurvey = (e:ChangeEvent, survey) => {
		console.log(e, survey);
		handleSelected(selectedSurvey);
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650  }} aria-label="simple table" size="small">
			<TableHead>
				<TableRow
					sx={{ 'td, th': {borderBottom: `1px solid ${theme.palette.grey[400]}`}}}
				>
					<TableCell></TableCell>
					<TableCell align="left">Survey 제목</TableCell>
					<TableCell align="center">업데이트</TableCell>
					<TableCell align="center">미리보기</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{surveyList.map((survey) => (
				<TableRow
					key={survey.survey_no}
					sx={{ 'td, th': {borderBottom: `1px solid ${divider}`}, '&:last-child td, &:last-child th': { border: 0 } }}
				>
					<TableCell>
						<FormControl>
							<Checkbox onChange={(e) => handleSelectSurvey(e, survey)} />
						</FormControl>
					</TableCell>
					<TableCell component="th" scope="row">
						{survey.title}
					</TableCell>
					<TableCell align="center">{dayjs(survey.updated_date).format('YYYY-MM-DD')}</TableCell>
					<TableCell align="center">
						<IconButton color="primary">
							<PreviewIcon />
						</IconButton>
					</TableCell>
				</TableRow>
				))}
			</TableBody>
			</Table>
		</TableContainer>
	)
}

export default SurveyListTable;