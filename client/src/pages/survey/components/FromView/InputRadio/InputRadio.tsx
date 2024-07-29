import { ExampleList, ExampleTypes } from "@/types/survey";
import * as S from './styles';
import { useRef } from "react";
import { Formik, useFormik } from "formik";
import { RadioGroup } from "@mui/material";

type InputRadioProps = {
	exampleList: ExampleList[],
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const InputRadio = ({exampleList, onChange, ...field}: InputRadioProps) => {
	const etcRef = useRef<HTMLInputElement>(null);
  	const etcRefRadio = useRef<HTMLInputElement>(null);
	
	return (
		
		<S.RadioContainer>
			{exampleList.map((example) => (
				<RadioGroup key={example.example_no}>
					<S.Radio
						ref={etcRefRadio}
						type="radio"
						name={`radio-${example.example_no}`}
						id={`radio-${example.example_no}`}
						value={example.example_type === ExampleTypes.OTHER ? etcRef.current?.value : example.example_title}
						onChange={(e) => onChange(e)}
					/>
					<S.Label htmlFor={example.example_title}>
						{example.example_type === ExampleTypes.OTHER ? (
							<>
							<span>기타: </span>
							<S.TextField
								id="standard-basic"
								variant="standard"
								inputRef={etcRef}
								onChange={(e) => onChange(e)}
							/>
							</>
						) : (
							example.example_value
						)}
					</S.Label>	
				</RadioGroup>
			))}
		</S.RadioContainer>
		
	)
}

export default InputRadio;