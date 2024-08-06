import { QuestionList, QuestionTypes } from "@/types/survey";
import * as S from './styles';
import { Box, Typography } from "@mui/material";
import InputTextField from "../InputTextField";
import InputRadio from "../InputRadio/InputRadio";
import { useSelector } from "react-redux";
import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

type ViewCardProps = {
	id: string
}

const ViewCard = ({id, ...props}: ViewCardProps) => {
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

	const [needToCompleteRequired, setNeedToCompleteRequired] = useState(false);
	

	const changeIsRequired = (e) => {
		setNeedToCompleteRequired(e);
	}
	

	// const { values, submitForm } = useFormikContext();

  	// useEffect(() => {
	// 	console.log(values);
  	// }, [submitForm]);

	return(
		<S.SCard needToCompleteRequired={needToCompleteRequired}>
			<Box mb={1}>
				<Typography variant="h4">
					{cardTitle}
					{isRequired == 'Y' ? <S.RequireMark>*</S.RequireMark> : null}
				</Typography>
			</Box>
			
			{ inputType === QuestionTypes.WRITE ? <InputTextField cardId={id} changeIsRequired={changeIsRequired} /> : null } 
			{ inputType === QuestionTypes.SINGLE ? <InputRadio cardId={id} changeIsRequired={changeIsRequired} /> : null }
			{ inputType === QuestionTypes.MULTIPLE ? <InputCheckbox cardId={id} changeIsRequired={changeIsRequired} /> : null }
		</S.SCard>
	)
}

export default ViewCard;