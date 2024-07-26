import { QuestionList, QuestionTypes } from "@/types/survey";
import * as S from './styles';
import { Box, Typography } from "@mui/material";

const ViewCard = ({question}: {question: QuestionList}) => {
	return(
		<S.SCard needToCompleteRequired={question.required_answer_yn}>
			<Box>
				<Typography variant="h4">
					{question.question}
					{question.required_answer_yn === 'Y' ? <S.RequireMark>*</S.RequireMark> : null}
				</Typography>
				
			</Box>
			
			{/* {question.question_type === QuestionTypes.WRITE ? <InputTextField id={id} /> : null}
			{question.question_type === QuestionTypes.SINGLE ? <InputRadio id={id} /> : null}
			{question.question_type === QuestionTypes.MULTIPLE ? <InputCheckbox id={id} /> : null} */}
		</S.SCard>
	)
}

export default ViewCard;