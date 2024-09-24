import { ParticipantSurveyExampleList, SurveyQuestionAnswer } from "@/types/participant";
import { ExampleList } from "@/types/survey";
import * as S from './styles';
import { Box, Typography, useTheme } from "@mui/material";
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { t } from "i18next";

type CheckboxAnswerType = {
	exampleList: ExampleList[], 
	answer : SurveyQuestionAnswer
}
const CheckboxAnswer = ({exampleList, answer} : CheckboxAnswerType) => {
	const theme = useTheme();

	const isSelectedAnswer = (exampleValue) => {
		if(answer.multipleAnswerList && answer.multipleAnswerList.includes(exampleValue)) return true;
		else return false;
	}
	
	return (<>
		{
			exampleList.map(example => 
				<Box key={example.example_no} display="flex" gap={1} mb="10px">
					<Box sx={{
						width: '20px',
						height: '20px',
						border: isSelectedAnswer(example.example_value) ? `2px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.grey[500]}`,
						backgroundColor: isSelectedAnswer(example.example_value) ? theme.palette.primary.main : 'white',
						borderRadius: '4px',
						position: 'relative'
					}}>
						{
							isSelectedAnswer(example.example_value) &&
								<Box sx={{
									display:'block',
									position:'absolute',
									left: '50%',
									top: '50%',
									marginLeft:'-4px',
									marginTop:'-7px',
									width:'7px',
									height: '10px',
									border: 'solid white',
									borderWidth: '0 2px 2px 0',
									webkitTransform: 'rotate(45deg)',
									transform: 'rotate(45deg)'
								}}/>
						}
					</Box>
					<Typography>{ example.example_title }</Typography>
					{
						answer.answer_write && example.example_type == 'OTHER' && <Typography> : {answer.answer_write}</Typography>
					}
				</Box>
			)
		}
	</>)
};

export default CheckboxAnswer;