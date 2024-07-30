import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as S from "./styles";
import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { ExampleList, ExampleTypes } from "@/types/survey";
import { Field, useField, useFormikContext } from "formik";

const InputCheckbox = ({ cardId }: Pick<PreviewProps, "cardId">) => {
  	const exampleList = useSelector((state: PreviewStateProps) => {
    	const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
    	return currentCard.exampleList;
  	}) as ExampleList[];

  	const onChange = (e) => {
		console.log(e);
  	}

  	// const { values, submitForm } = useFormikContext();

  	// useEffect(() => {
	// 	console.log(values);
  	// }, [values, submitForm]);

  return (
	<Field name={cardId} type="checkbox">
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
						value={example.example_title}
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
		</S.Container>
		)}
	</Field>
  );
};

export default InputCheckbox;
