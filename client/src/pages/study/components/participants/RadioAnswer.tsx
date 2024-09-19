import { ParticipantSurveyExampleList, SurveyQuestionAnswer } from "@/types/participant";
import { ExampleList } from "@/types/survey";
import * as S from './styles';
import { Box, Typography, useTheme } from "@mui/material";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

type RadioAnswerType = {
	exampleList: ExampleList[], 
	answer : SurveyQuestionAnswer
}
const RadioAnswer = ({exampleList, answer} : RadioAnswerType) => {
	const theme = useTheme();
	console.log(exampleList, answer)
	return (<>
		{
			exampleList.map(example => 
				<Box key={example.example_no} display="flex" gap={1} alignItems="center">
					<Box sx={{
						position: 'relative',
						'&::after' : {
							display: answer.answer_select === example.example_value ? 'block' : 'none',
							content: '""',
							width: '9px',
							height: '9px',
							borderRadius: '50%',
							position:'absolute',
							left:'7px',
							top:'9px',
							backgroundColor: theme.palette.primary.main
						}
					}}>
						<CircleOutlinedIcon sx={{
							color: theme.palette.grey[500],
							width: '23px',
							height: '23px',
							position: 'relative',
							top: '2px'
						}}/>
					</Box>
					{
						answer.answer_write ? 
						<Typography>{ example.example_title }</Typography>
						:
						<Box display="flex" gap={1} sx={{width: `calc(100% - 23px)`}}>
							<Typography>기타 : </Typography>
							<Box sx={{borderBottom: `1px solid ${theme.palette.grey[500]}`}}>기타로 답변을 적었을 경우를 생각해 보자... { answer.answer_write }</Box>
						</Box>
					}
					
				</Box>
			)
		}
	</>)
};

export default RadioAnswer;