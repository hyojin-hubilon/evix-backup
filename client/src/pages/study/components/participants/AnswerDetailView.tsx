import { ParticipantSurveyDetail } from "@/types/participant";
import { Box, Card, OutlinedInput, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import * as S from './styles';
import { QuestionTypes } from "@/types/survey";
import RadioAnswer from "./RadioAnswer";

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
									<OutlinedInput
										sx={{
											'.MuiInputBase-input.Mui-disabled' : {
												color: `${theme.palette.common.black}`,
												WebkitTextFillColor : `${theme.palette.common.black}`,
												TextFillColor : `${theme.palette.common.black}`
											}
										}}
										value={question.surveyQuestionAnswer?.answer_write}
										disabled
									/>
								: null } 
								{ (question.question_type  === QuestionTypes.SINGLE || question.question_type  === QuestionTypes.RADIO) ? <RadioAnswer exampleList={question.exampleList} answer={question.surveyQuestionAnswer}  /> : null }
								{/* { answer.question_type  === QuestionTypes.MULTIPLE ? <InputCheckbox cardId={card.cardId} questionIndex={index}  /> : null } */}
							</S.SCard>
						)
					}
				</>
			}
		
		
				
			
		</Box>
		
	)
}

export default AnswerDetailView;