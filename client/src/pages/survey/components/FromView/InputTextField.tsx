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

	  
	return(
		<Field name={`question${example.question_no}`} type="text">
			{({
				field,
				form: { touched, errors },
				meta,
			}) => (
			
				<TextField size="small" name={field.name} onChange={field.onChange} />
			)}
		</Field>
	)
}

export default InputTextField;