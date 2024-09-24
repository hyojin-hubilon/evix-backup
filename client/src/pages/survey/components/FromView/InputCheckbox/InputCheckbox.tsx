import { useSelector } from "react-redux";
import * as S from "./styles";
import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { ExampleList, ExampleTypes } from "@/types/survey";
import { Field } from "formik";
import { Typography } from "@mui/material";
import { t } from "i18next";

type InputCheckboxProps = {
	cardId: string,
	questionIndex : number
}

const InputCheckbox = ({ cardId, questionIndex }: InputCheckboxProps) => {
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
	<Field name={`questions.${questionIndex}.answerMultiple`} type="checkbox">
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
								<span>{t('survey.etc')}</span>
								<S.TextField
									name={`questions.${questionIndex}.answerEtc`}
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
			{ errors.questions && errors.questions[questionIndex] && errors.questions[questionIndex].answerMultiple
 				?
				//  { errors.questions[questionIndex].answerMultiple }
				<Typography paddingTop="0.5rem" sx={{display:'block', color: 'red'}}>{ errors.questions[questionIndex].answer }</Typography> : ''
			}
		</S.Container>
		)}
	</Field>
  );
};

export default InputCheckbox;
