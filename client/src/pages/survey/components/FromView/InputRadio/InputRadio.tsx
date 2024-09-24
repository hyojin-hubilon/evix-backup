import { ExampleList, ExampleTypes } from "@/types/survey";
import * as S from './styles';
import { useRef } from "react";
import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { useSelector } from "react-redux";
import { Field } from "formik";
import { Typography } from "@mui/material";
import { t } from "i18next";

type InputRadioProps = {
	cardId: string,
	questionIndex: number
}

const InputRadio = ({ cardId, questionIndex }: InputRadioProps) => {
	const etcRef = useRef<HTMLInputElement>(null);
  	const etcRefRadio = useRef<HTMLInputElement>(null);

	const exampleList = useSelector((state: PreviewStateProps) => {
		const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
		return currentCard.exampleList;
	}) as ExampleList[];

	const ieReqired = useSelector((state: PreviewStateProps) => {
    	const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
    	return currentCard.isRequired;
  	}) as 'Y' | 'N';

	

	return (
		<Field name={`questions.${questionIndex}.answer`}  type="radio">
			{({
				field,
				form: { touched, errors },
				meta,
			}) => (
				<S.RadioContainer>
					{exampleList.map((example) => (
						<S.Container key={example.example_no}>
							<S.Radio
								ref={etcRefRadio}
								type="radio"
								name={field.name}
								id={`radio-${example.question_no}-${example.example_no}`}
								value={example.example_type === ExampleTypes.OTHER ? etcRef.current?.value : example.example_value}
								onChange={(e) => field.onChange(e)}
							/>
							<S.Label htmlFor={`radio-${example.question_no}-${example.example_no}`}>
								{example.example_type === ExampleTypes.OTHER ? (
									<S.EtcContainer>
										<span>{t('survey.etc')}</span>
										<S.TextField
											name={`questions.${questionIndex}.answerEtc`}
											variant="standard"
											inputRef={etcRef}
											onChange={(e) => field.onChange(e)}
										/>
									</S.EtcContainer>
								) : (
									<span>{ example.example_title }</span>
								)}
							</S.Label>
						</S.Container>
					))}

{ errors.questions && errors.questions[questionIndex] && errors.questions[questionIndex].answer ?
						<Typography paddingTop="0.5rem" sx={{display:'block', color: 'red'}}>{ errors.questions[questionIndex].answer }</Typography> : ''
					}
				</S.RadioContainer>
			)}
		</Field>
	)
}

export default InputRadio;