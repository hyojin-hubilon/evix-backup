import { ParticipantSurveyDetail } from "@/types/participant";
import { Box, Card, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import * as S from './styles';

type AnswerDetailViewType = {
	survey: ParticipantSurveyDetail | null
}

const AnswerDetailView = ({survey} : AnswerDetailViewType) => {
	const theme = useTheme();
	const {primary} = theme.palette;

	const [ hasRequired, setHasRequired ] = useState(false);

	useEffect(() => {
		if(survey) {
			const hasRequiredCheck = survey.questionList.some((card) => card.required_answer_yn === 'Y');
			setHasRequired(hasRequiredCheck);
		}
		

	}, [survey])

	return(
		<Box display="flex" flexDirection="column" gap={2} p={5}>
			{
				survey &&
				<>
					<Card sx={{width: '100%', p: '1.5rem', borderRadius:'8px', borderTop: `5px solid ${primary.main}`}}>
						<Typography variant="h3">{survey.title}</Typography>
						<Typography mt="1rem">{survey.description}</Typography>
						{
							hasRequired && <S.RequireMark>* 필수항목</S.RequireMark>
						}
						
					</Card>

					{
						survey.questionList.map(answer => 
							<S.SCard key={answer.question_no}>

							</S.SCard>
						)
					}
				</>
			}
		
		
				
			
		</Box>
		
	)
}

export default AnswerDetailView;