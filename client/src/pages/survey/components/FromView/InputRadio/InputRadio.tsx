import { ExampleList, ExampleTypes } from "@/types/survey";
import * as S from './styles';
import { useRef } from "react";
import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { useSelector } from "react-redux";
import { Field } from "formik";
import { requiredCheck } from "@/utils/helper";
import { Typography } from "@mui/material";

type InputRadioProps = {
	cardId: string,
	index: number,
	changeIsRequired: (e:boolean) => void
}

const InputRadio = ({ cardId, index, changeIsRequired }: InputRadioProps) => {
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
		<Field name={`questions.${index}.answer`}  type="radio">
			{/* validate={(value) => requiredCheck(value, ieReqired, changeIsRequired)} 밸리데이트 YUP으로 변경하기 */}
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
										<span>기타 : </span>
										<S.TextField
											name={cardId}
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

					{ errors[cardId] && touched[cardId] && <Typography paddingTop="0.5rem" sx={{display:'block', color: 'red'}}>{ errors[cardId] }</Typography>}
				</S.RadioContainer>
			)}
		</Field>
	)
}

export default InputRadio;