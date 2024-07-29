import { PreviewProps } from "@/store/reducers/preview";
import { ExampleList } from "@/types/survey";
import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";

const InputTextField = ({ cardId }: Pick<PreviewProps, "cardId">) => {
	
	  
	return(
		<TextField size="small"  />
	)
}

export default InputTextField;