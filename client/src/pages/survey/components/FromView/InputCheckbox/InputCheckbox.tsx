import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as S from "./styles";
import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { ExampleList, ExampleTypes } from "@/types/survey";
import { Field, useField, useFormikContext } from "formik";
import { requiredCheck } from "@/utils/helper";
import { Typography } from "@mui/material";

type InputCheckboxProps = {
	cardId: string,
	index : number,
	changeIsRequired: (e:boolean) => void
}

const InputCheckbox = ({ cardId, index, changeIsRequired }: InputCheckboxProps) => {
  	const exampleList = useSelector((state: PreviewStateProps) => {
    	const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
    	return currentCard.exampleList;
  	}) as ExampleList[];

	const ieReqired = useSelector((state: PreviewStateProps) => {
    	const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
    	return currentCard.isRequired;
  	}) as 'Y' | 'N';


  	const onChange = (e) => {
		console.log(e);
  	}

  	// const { values, submitForm } = useFormikContext();

  	// useEffect(() => {
	// 	console.log(values);
  	// }, [values, submitForm]);

  return (
	<Field name={`questions.${index}.answer`} type="checkbox">
		{/* validate={(value) => requiredCheck(value, ieReqired, changeIsRequired)} 밸리데이트 YUP으로 변경하기*/}
		{({
		field, // { name, value, onChange, onBlur }
		form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
		meta,
		}) => (
		<S.Container>
			{exampleList.map((example, index) => (
				<S.CheckboxContainer key={index}>
					<S.Checkbox
						type="checkbox"
						id={`checkbox-${example.question_no}-${example.example_no}`}
						value={example.example_value}
						name={field.name}
						onChange={(e) => {
							field.onChange(e);
						}}
					/>

					<S.Label htmlFor={`checkbox-${example.question_no}-${example.example_no}`}>
						{example.example_type === ExampleTypes.OTHER ? (
							<S.EtcContainer>
								<span>기타 : </span>
								<S.TextField
									name={cardId}
									variant="standard"
									onChange={(e) => field.onChange(e)}
								/>
							</S.EtcContainer>
						) : (
							<span>{ example.example_title }</span>
						)}
					</S.Label>	
				</S.CheckboxContainer>
			))}
			{ errors[cardId] && touched[cardId] && <Typography paddingTop="0.5rem" sx={{display:'block', color: 'red'}}>{ errors[cardId] }</Typography>}
		</S.Container>
		)}
	</Field>
  );
};

export default InputCheckbox;
