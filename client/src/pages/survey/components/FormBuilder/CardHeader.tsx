import React from "react";
import { MenuItem, Select, SelectChangeEvent, TextField as MuiTextField, Theme, useTheme, Box, styled, TextField} from "@mui/material";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { CardProps, setTitle, StateProps, typeChange } from "@/store/reducers/survey";
import { extendedCardProps } from "./FormQuestion";
import { QuestionTypes } from "@/types/survey";
  

const CardHeader = ({ id, isTitle }: Pick<extendedCardProps, "id" | "isTitle">) => {
	const theme = useTheme();
  	const dispatch = useDispatch();
  
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
	};

	const handleInputTypeChange = (e: SelectChangeEvent<unknown>) => {
		dispatch(typeChange({ id, inputType: e.target.value as string }));
	};

  	return (
		<Box display="flex" gap={1} alignItems="center">
			<TextField
				id="filled-basic"
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
							borderBottom: isFocused ? `1px solid ${theme.palette.grey[700]}` : "none"
						},
						'::after' : {
							borderBottom: `2px solid ${theme.palette.grey[700]}`
						}
					},
					'input' : {
							padding: 0
					}				
				}}
			/>
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
