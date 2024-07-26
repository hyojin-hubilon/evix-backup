import { QuestionList, QuestionTypes } from "@/types/survey";
import * as S from './styles';
import { Box, Typography } from "@mui/material";
import InputTextField from "../InputTextField";
import InputRadio from "../InputRadio/InputRadio";

type ViewCardProps = {
	question: QuestionList,
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const ViewCard = ({question, onChange}: ViewCardProps) => {
	console.log(onChange)
	return(
		<S.SCard needToCompleteRequired={question.required_answer_yn}>
			<Box mb={1}>
				<Typography variant="h4">
					{question.question}
					{question.required_answer_yn === 'Y' ? <S.RequireMark>*</S.RequireMark> : null}
				</Typography>
			</Box>
			
			{/* {question.question_type === QuestionTypes.WRITE ? <InputTextField example={question.exampleList[0]} onChange={onChange} /> : null} */}
			{/* {question.question_type === QuestionTypes.SINGLE ? <InputRadio exampleList={question.exampleList} onChange={onChange} /> : null} */}
			{/* {question.question_type === QuestionTypes.MULTIPLE ? <InputCheckbox id={id} /> : null} */}
		</S.SCard>
	)
}

export default ViewCard;