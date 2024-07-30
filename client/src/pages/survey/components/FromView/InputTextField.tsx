import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { ExampleList } from "@/types/survey";
import { TextField } from "@mui/material";
import { Field, useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";


  

const InputTextField = ({ cardId }: Pick<PreviewProps, "cardId">) => {
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
			error = 'Required';
		} else {
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
					{ errors[cardId] && touched[cardId] && <div style={{display:'block'}}>{ errors[cardId] }</div>}
				</>
			)}
		</Field>
	)
}

export default InputTextField;