import { QuestionTypes } from "@/types/survey";
import * as S from './styles';
import { Box, Typography } from "@mui/material";
import InputTextField from "../InputTextField";
import InputRadio from "../InputRadio/InputRadio";
import { PreviewProps } from "@/store/reducers/preview";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import { useState } from "react";

type ViewCardProps = {
	index: number;
	card: PreviewProps
}

const ViewCard = ({index, card}: ViewCardProps) => {
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
					{card.question}
					{card.isRequired == 'Y' ? <S.RequireMark>*</S.RequireMark> : null}
				</Typography>
			</Box>
			
			{ card.questionType === QuestionTypes.WRITE ? <InputTextField cardId={card.cardId} questionIndex={index}  /> : null } 
			{ (card.questionType  === QuestionTypes.SINGLE || card.questionType  === QuestionTypes.RADIO) ? <InputRadio cardId={card.cardId} questionIndex={index}  /> : null }
			{ card.questionType  === QuestionTypes.MULTIPLE ? <InputCheckbox cardId={card.cardId} questionIndex={index}  /> : null }
		</S.SCard>
	)
}

export default ViewCard;