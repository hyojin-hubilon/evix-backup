import { ExampleList, ExampleTypes } from "@/types/survey";
import * as S from './styles';
import { useRef } from "react";
import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { useSelector } from "react-redux";
import { Field } from "formik";

const InputRadio = ({ cardId }: Pick<PreviewProps, "cardId">) => {
	const etcRef = useRef<HTMLInputElement>(null);
  	const etcRefRadio = useRef<HTMLInputElement>(null);

	const exampleList = useSelector((state: PreviewStateProps) => {
		const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
		return currentCard.exampleList;
	}) as ExampleList[];

	return (
		<Field name={`question${exampleList[0].question_no}`} type="radio">
			{({
				field,
				form: { touched, errors },
				meta,
			}) => (
				<S.RadioContainer>
					{exampleList.map((example) => (
						<div key={example.example_no}>
							<S.Radio
								ref={etcRefRadio}
								type="radio"
								name={field.name}
								id={`radio-${example.question_no}-${example.example_no}`}
								value={example.example_type === ExampleTypes.OTHER ? etcRef.current?.value : example.example_title}
								onChange={(e) => field.onChange(e)}
							/>
							<S.Label htmlFor={`radio-${example.question_no}-${example.example_no}`}>
								{example.example_type === ExampleTypes.OTHER ? (
									<>
									<span>기타: </span>
									<S.TextField
										name={cardId}
										variant="standard"
										inputRef={etcRef}
										onChange={(e) => field.onChange(e)}
									/>
									</>
								) : (
									example.example_title
								)}
							</S.Label>	
						</div>
					))}
				</S.RadioContainer>
			)}
		</Field>
	)
}

export default InputRadio;