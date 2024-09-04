import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { ExampleList } from "@/types/survey";
import { requiredCheck } from "@/utils/helper";
import { TextField, Typography } from "@mui/material";
import { Field, useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";


type InputTextFieldProps = {
	cardId: string,
	questionIndex:number
}

const InputTextField = ({ cardId, questionIndex }: InputTextFieldProps) => {
	const ieReqired = useSelector((state: PreviewStateProps) => {
    	const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
    	return currentCard.isRequired;
  	}) as 'Y' | 'N';

	  
	return(
		<Field name={`questions.${questionIndex}.answer`} type="text">
			{({
				field,
				form: { touched, errors },
			}) => {
				console.log(errors)
				return (
				<>
					<TextField size="small" name={field.name} onChange={(e) => field.onChange(e)} />
					{ errors[field.name] && touched[field.name] && <Typography paddingTop="0.5rem" sx={{display:'block', color: 'red'}}>{ errors[field.name] }</Typography>}
					{ errors.questions && errors.questions[questionIndex] && errors.questions[questionIndex].answer ?
						<Typography paddingTop="0.5rem" sx={{display:'block', color: 'red'}}>{ errors.questions[questionIndex].answer }</Typography> : ''
					}
				</>
			)}}
		</Field>
	)
}

export default InputTextField;