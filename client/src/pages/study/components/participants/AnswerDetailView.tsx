import { ParticipantSurveyDetail } from "@/types/participant";
import { Box, Card, OutlinedInput, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import * as S from './styles';
import { QuestionTypes } from "@/types/survey";
import RadioAnswer from "./RadioAnswer";
import CheckboxAnswer from "./CheckboxAnswer";

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
						survey.questionList.map(question => 
							<S.SCard key={question.question_no}>
								<Box mb={1}>
									<Typography variant="h4">
										{question.question}
										{question.required_answer_yn == 'Y' ? <S.RequireMark>*</S.RequireMark> : null}
									</Typography>
								</Box>

								{ question.question_type === QuestionTypes.WRITE ? 
									//주관식 답변
									<Box
										sx={{
											border: `1px solid ${theme.palette.grey[300]}`,
											p: '10px',
											borderRadius: '5px'
										}}
									>
										{question.surveyQuestionAnswer?.answer_write}
									</Box>
								: null } 
								{ (question.question_type  === QuestionTypes.SINGLE || question.question_type  === QuestionTypes.RADIO) ? <RadioAnswer exampleList={question.exampleList} answer={question.surveyQuestionAnswer}  /> : null }
								{ question.question_type  === QuestionTypes.MULTIPLE ? <CheckboxAnswer  exampleList={question.exampleList} answer={question.surveyQuestionAnswer}  /> : null }
							</S.SCard>
						)
					}
				</>
			}
		
		
				
			
		</Box>
		
	)
}

export default AnswerDetailView;