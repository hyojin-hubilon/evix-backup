import { ExampleList, ExampleTypes } from "@/types/survey";
import * as S from './styles';
import { useRef } from "react";
import { PreviewProps, PreviewStateProps } from "@/store/reducers/preview";
import { useSelector } from "react-redux";

const InputRadio = ({ cardId }: Pick<PreviewProps, "cardId">) => {
	const etcRef = useRef<HTMLInputElement>(null);
  	const etcRefRadio = useRef<HTMLInputElement>(null);

	const exampleList = useSelector((state: PreviewStateProps) => {
		const currentCard = state.previewCards.find((card) => card.cardId === cardId) as PreviewProps;
		return currentCard.exampleList;
	}) as ExampleList[];

	const onChange = (e) => {
		console.log(e);
	}
	
	return (
		
		<S.RadioContainer>
			{exampleList.map((example) => (
				<div key={example.example_no}>
					<S.Radio
						ref={etcRefRadio}
						type="radio"
						name={cardId}
						id={`radio-${example.example_no}`}
						value={example.example_type === ExampleTypes.OTHER ? etcRef.current?.value : example.example_title}
						onChange={(e) => onChange(e)}
					/>
					<S.Label htmlFor={`radio-${example.example_no}`}>
						{example.example_type === ExampleTypes.OTHER ? (
							<>
							<span>기타: </span>
							<S.TextField
								name={cardId}
								variant="standard"
								inputRef={etcRef}
								onChange={(e) => onChange(e)}
							/>
							</>
						) : (
							example.example_title
						)}
					</S.Label>	
				</div>
			))}
		</S.RadioContainer>
		
	)
}

export default InputRadio;