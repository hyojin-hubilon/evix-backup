import { ParticipantSurveyExampleList, SurveyQuestionAnswer } from "@/types/participant";
import { ExampleList } from "@/types/survey";
import * as S from './styles';
import { Box, Typography, useTheme } from "@mui/material";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { t } from "i18next";

type RadioAnswerType = {
	exampleList: ExampleList[], 
	answer : SurveyQuestionAnswer
}
const RadioAnswer = ({exampleList, answer} : RadioAnswerType) => {
	const theme = useTheme();
	return (<>
		{
			exampleList.map(example => 
				<Box key={example.example_no} display="flex" gap={1} mb="10px">
					<Box sx={{
						border: (answer.answer_select === example.example_value || (answer.answer_write && example.example_type == 'OTHER')) ? `6px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.grey[500]}`,
						borderRadius: '50%',
						width: '20px',
						height: '20px',
						boxSizing: 'border-box',
					}} />						
					<Typography>{ example.example_title }</Typography>
					{
						answer.answer_write && example.example_type == 'OTHER' && <Typography> : {answer.answer_write}</Typography>
					}
				</Box>
			)
		}
	</>)
};

export default RadioAnswer;