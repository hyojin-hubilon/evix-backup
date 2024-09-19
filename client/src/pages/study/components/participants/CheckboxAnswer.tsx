import { ParticipantSurveyExampleList, SurveyQuestionAnswer } from "@/types/participant";
import { ExampleList } from "@/types/survey";
import * as S from './styles';
import { Box, Typography, useTheme } from "@mui/material";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { t } from "i18next";

type CheckboxAnswerType = {
	exampleList: ExampleList[], 
	answer : SurveyQuestionAnswer
}
const CheckboxAnswer = ({exampleList, answer} : CheckboxAnswerType) => {
	const theme = useTheme();
	console.log(exampleList, answer)
	return (<>
		{
			exampleList.map(example => 
				<Box key={example.example_no} display="flex" gap={1} pl="30px" position="relative" mb="10px">
					<Box sx={{
						position: 'absolute',
						left:0,
						top:0,
						'&::after' : {
							display: answer.answer_select === example.example_value ? 'block' : 'none',
							content: '""',
							width: '9px',
							height: '9px',
							borderRadius: '50%',
							position:'absolute',
							left:'7px',
							top:'7px',
							backgroundColor: theme.palette.primary.main
						}
					}}>
						<CircleOutlinedIcon sx={{
							color: theme.palette.grey[500],
							width: '23px',
							height: '23px',
							position: 'absolute',
							
						}}/>
					</Box>
					{
						answer.answer_write ? 
						<Box display="flex" gap={1} sx={{width: `calc(100% - 30px)`}}>
							<Typography>{t('survey.etc')}</Typography>
							<Box sx={{borderBottom: `1px solid ${theme.palette.grey[500]}`, width:'auto'}}>{ answer.answer_write }</Box>
						</Box>
						:
						<Typography>{ example.example_title }</Typography>
					}
				</Box>
			)
		}
	</>)
};

export default CheckboxAnswer;