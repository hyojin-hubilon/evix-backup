import React, { useRef } from "react";
import { MenuItem, Select, SelectChangeEvent, useTheme, Box, TextField } from "@mui/material";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { CardProps, setTitle, StateProps, typeChange } from "@/store/reducers/survey";
import { QuestionTypes } from "@/types/survey";
import { Field } from "formik";
import { t } from "i18next";
  
type CardHeaderType = {
	id: string,
	isTitle: boolean,
	cardIndex: number
}
const CardHeader = ({ id, isTitle, cardIndex }: CardHeaderType) => {
	const theme = useTheme();
  	const dispatch = useDispatch();
	const timer = useRef<any>();
  
  	const [ isFocused, cardTitle, inputType ] = useSelector((state: StateProps) => {
    	const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    	return [ currentCard.isFocused, currentCard.cardTitle, currentCard.inputType ];
  	}, shallowEqual);

	const handleCardTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		dispatch(setTitle({ cardId: id, text: e.target.value }));
	};

	const handleInputTypeChange = (e) => {
		dispatch(typeChange({ id, inputType: e}));
	};

	const handleChangeTimeOut = (e) => {
		clearTimeout(timer.current)
		timer.current = setTimeout(() => {
			handleCardTitleChange(e)
		}, 300)
	}

	
  	return (
		<Box display="flex" gap={1} alignItems="center">
			<Field name={`cards.${cardIndex}.cardTitle`} type="text">
			{({
				field,
				form : {errors}
			}) => (
				<>
				<TextField
					id={field.name}
					name={field.name}
					defaultValue={cardTitle ? cardTitle : ''}
					onChange={(e) => {
						field.onChange(e.target.value);
					}}
					onBlur={(e) => handleCardTitleChange(e)}
					placeholder={isTitle ? t('survey.survey_title') : t('survey.question')}
					//설문지 제목 : 질문
					variant="filled"
					key={cardTitle as string}
					sx={{
						flexGrow: 1,
						'div': {
							fontSize: isTitle ? "24px" : "16px",
							padding: isFocused ? (isTitle ? '5px' : '16px') : '5px 0',
							backgroundColor: isFocused ? (isTitle ? 'transparent' : theme.palette.grey[50]) : 'transparent',
							'::before': {
								borderBottom: isFocused ? ( errors.cards && errors.cards[cardIndex]?.cardTitle ? `1px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.grey[700]}` ): 'none'
							},
							'::after' : {
								borderBottom: errors.cards && errors.cards[cardIndex]?.cardTitle ? `1px solid ${theme.palette.error.main}` : 'none',
								transform: 'scaleX(1)'
							}
						},
						'input' : {
							padding: 0
						}				
					}}
				/>
				</>
			)}
			</Field>
			{!isTitle && isFocused ? (
				<Field name={`cards.${cardIndex}.inputType`} type="select">
					{({
						field
					}) => (
						<Select onChange={(e) => {
								field.onChange(e.target.value);
								handleInputTypeChange(e.target.value);
							}}
							name={field.name}
							value={inputType ? inputType : "WRITE"}
						>
							<MenuItem value={QuestionTypes.WRITE}>
								{t('survey.subjective_answer')}
								{/* 주관식 답변 */}
							</MenuItem>
							<MenuItem value={QuestionTypes.SINGLE}>
								{t('survey.single_choice_answer')}
								{/* 객관식 답변(단일응답) */}
							</MenuItem>
							<MenuItem value={QuestionTypes.MULTIPLE}>
								{t('survey.multiple_choice_answer')}
								{/* 객관식 답변(복수응답) */}
							</MenuItem>
						</Select>
					)}
				</Field>
			) : null}
		</Box>
  	);
};

export default React.memo(CardHeader);
