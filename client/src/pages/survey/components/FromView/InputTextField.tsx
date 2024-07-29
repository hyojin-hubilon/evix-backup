import { ExampleList } from "@/types/survey";
import { TextField } from "@mui/material";

type InputTextFieldProps = {
	example: ExampleList,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputTextField = ({example, onChange, ...field} : InputTextFieldProps) => {
	return(
		<TextField size="small" onChange={onChange} {...field} />
	)
}

export default InputTextField;