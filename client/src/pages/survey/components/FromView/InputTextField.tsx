import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { ExampleList } from "@/types/survey";
import { TextField, Typography } from "@mui/material";
import { Field, useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";


type InputTextFieldProps = {
	cardId: string,
	changeIsRequired: (e:boolean) => void
}

const InputTextField = ({ cardId, changeIsRequired }: InputTextFieldProps) => {
	const example = useSelector((state: PreviewStateProps) => {
    	const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
    	return currentCard.exampleList[0];
  	}) as ExampleList;

	const ieReqired = useSelector((state: PreviewStateProps) => {
    	const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
    	return currentCard.isRequired;
  	}) as 'Y' | 'N';

	
	const requiredCheck = (value) => {
		let error;
		if (!value && ieReqired == 'Y') {
			changeIsRequired(true)
			error = 'Required';
		} else {
			changeIsRequired(false)
			return false;

		}
		console.log(error)
		return error;
	}
	  
	return(
		<Field name={cardId} type="text" validate={requiredCheck}>
			{({
				field,
				form: { touched, errors },
				meta,
			}) => (
				<>
					<TextField size="small" name={cardId} onChange={(e) => field.onChange(e)} />
					{ errors[cardId] && touched[cardId] && <Typography paddingTop="0.5rem" sx={{display:'block', color: 'red'}}>{ errors[cardId] }</Typography>}
				</>
			)}
		</Field>
	)
}

export default InputTextField;