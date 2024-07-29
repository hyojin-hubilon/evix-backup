import { QuestionList, QuestionTypes } from "@/types/survey";
import * as S from './styles';
import { Box, Typography } from "@mui/material";
import InputTextField from "../InputTextField";
import InputRadio from "../InputRadio/InputRadio";
import { useSelector } from "react-redux";
import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";

type ViewCardProps = {
	id: string
}

const ViewCard = ({id}: ViewCardProps) => {
	const inputType = useSelector((state: PreviewStateProps) => {
		const currentCard = state.previewCards.find((card) => card.cardId === id) as PreviewProps;
		return currentCard.questionType;
	}) as string;

	const cardTitle = useSelector((state: PreviewStateProps) => {
		const currentCard = state.previewCards.find((card) => card.cardId === id) as PreviewProps;
		return currentCard.question;
	}) as string;

	const isRequired = useSelector((state: PreviewStateProps) => {
		const currentCard = state.previewCards.find((card) => card.cardId === id) as PreviewProps;
		return currentCard.isRequired;
	}) as 'Y' | 'N';
	
	

	
	return(
		<S.SCard needToCompleteRequired={isRequired}>
			<Box mb={1}>
				<Typography variant="h4">
					{cardTitle}
					{isRequired == 'Y' ? <S.RequireMark>*</S.RequireMark> : null}
				</Typography>
			</Box>
			
			{inputType === QuestionTypes.WRITE ? <InputTextField cardId={id}  /> : null} 
			{inputType === QuestionTypes.SINGLE ? <InputRadio cardId={id} /> : null}
			{/* {question.question_type === QuestionTypes.MULTIPLE ? <InputCheckbox id={id} /> : null} */}
		</S.SCard>
	)
}

export default ViewCard;