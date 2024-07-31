import React, { useEffect } from "react";
import { MenuItem, Select, SelectChangeEvent, TextField as MuiTextField, Theme, useTheme, Box, styled, TextField, Typography} from "@mui/material";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { CardProps, setTitle, StateProps, typeChange } from "@/store/reducers/survey";
import { extendedCardProps } from "./FormQuestion";
import { QuestionTypes } from "@/types/survey";
import { Field, useFormikContext } from "formik";
  

const CardHeader = ({ id, isTitle }: Pick<extendedCardProps, "id" | "isTitle">) => {
	const theme = useTheme();
  	const dispatch = useDispatch();

	const { setValues } = useFormikContext();
  
  	const isFocused = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    	return currentCard.isFocused;
  	}, shallowEqual);

	const { cardTitle, inputType } = useSelector(
		(state: StateProps) => state.cards.find((card) => card.id === id) as CardProps,
		shallowEqual,
	);

	const handleCardTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		dispatch(setTitle({ cardId: id, text: e.target.value }));
		setValues({[id] : e.target.value});
	};

	const handleInputTypeChange = (e: SelectChangeEvent<unknown>) => {
		dispatch(typeChange({ id, inputType: e.target.value as string }));
	};

	const validateCheck = (value) => {//survey submit validate
		console.log(value)
		let error;
		if (!value) {
			error = '필수항목 입니다.';
		} else {	
			return false;
		}
		return error;
	}

  	return (
		<Box display="flex" gap={1} alignItems="center">
			<Field name={id} type="text" validate={validateCheck}>
			{({
				field,
				form: { touched, errors },
				meta,
			}) => (
				<TextField
					id="filled-basic"
					{...field}
					value={cardTitle}
					onChange={(e) => {
						handleCardTitleChange(e);
					}}
					placeholder={isTitle ? "설문지 제목" : "질문"}
					variant="filled"
					sx={{
						flexGrow: 1,
						'div': {
							fontSize: isTitle ? "24px" : "16px",
							padding: isFocused ? (isTitle ? '5px' : '16px') : '5px 0',
							backgroundColor: isFocused ? (isTitle ? 'transparent' : theme.palette.grey[50]) : 'transparent',
							'::before': {
								borderBottom: isFocused ? ( errors[id] ? `1px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.grey[700]}` ):  `1px solid ${theme.palette.error.main}`
							},
							'::after' : {
								borderBottom: errors[id] ? `2px solid ${theme.palette.error.main}` : `2px solid ${theme.palette.grey[700]}`,
							}
						},
						'input' : {
							padding: 0
						}				
						 
					}}
				/>
			)}
			</Field>
			{!isTitle && isFocused ? (
				<Select onChange={handleInputTypeChange} defaultValue={QuestionTypes.WRITE} value={inputType}>
					<MenuItem value={QuestionTypes.WRITE}>주관식 답변</MenuItem>
					<MenuItem value={QuestionTypes.SINGLE}>객관식 답변(단일응답)</MenuItem>
					<MenuItem value={QuestionTypes.MULTIPLE}>객관식 답변(복수응답)</MenuItem>
				</Select>
			) : null}
		</Box>
  	);
};

export default React.memo(CardHeader);
