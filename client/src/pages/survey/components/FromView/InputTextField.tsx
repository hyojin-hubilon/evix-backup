import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { ExampleList } from "@/types/survey";
import { requiredCheck } from "@/utils/helper";
import { TextField, Typography } from "@mui/material";
import { Field, useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";


type InputTextFieldProps = {
	cardId: string,
	index:number,
	changeIsRequired: (e:boolean) => void
}

const InputTextField = ({ cardId, index, changeIsRequired }: InputTextFieldProps) => {
	const ieReqired = useSelector((state: PreviewStateProps) => {
    	const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
    	return currentCard.isRequired;
  	}) as 'Y' | 'N';

	  
	return(
		<Field name={`questions.${index}.answer`} type="text">
			 {/* validate={(value) => requiredCheck(value, ieReqired, changeIsRequired)} 밸리데이트 YUP으로 변경하기 */}
			{({
				field,
				form: { touched, errors },
			}) => (
				<>
					<TextField size="small" name={field.name} onChange={(e) => field.onChange(e)} />
					{ errors[cardId] && touched[cardId] && <Typography paddingTop="0.5rem" sx={{display:'block', color: 'red'}}>{ errors[cardId] }</Typography>}
				</>
			)}
		</Field>
	)
}

export default InputTextField;