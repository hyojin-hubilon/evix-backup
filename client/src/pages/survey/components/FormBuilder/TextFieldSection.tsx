import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { CardProps, setText, StateProps } from "@store/reducers/survey";
import { Input, useTheme } from "@mui/material";
import { QuestionTypes } from '@/types/survey';
import { Field } from "formik";
import { t } from "i18next";

type TextFieldSectionType = {
	id:string,
	cardIndex: number
}
const TextFieldSection = ({ id, cardIndex }:TextFieldSectionType) => {
	const theme = useTheme();
	const dispatch = useDispatch();

	const [inputType, contents, isFocused] = useSelector((state: StateProps) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardProps;
		return [currentCard.inputType, currentCard.contents, currentCard.isFocused];
	}, shallowEqual);

	const isTitle = inputType === QuestionTypes.TITLE;

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		dispatch(setText({ cardId: id, text: e.target.value }));
	};

	return (
		<Field name={`cards.${cardIndex}.contents`}>
			{({
				field,
				form: {errors}
			}) => (
				<Input
					id={field.name}
					name={field.name}
					sx={{
						border:0,
						borderBottom: `1px dotted ${theme.palette.grey[900]}`,
						flexGrow: 1,
						...(isTitle && {
							borderBottom: errors.cards && errors.cards[cardIndex]?.contents ? `1px solid ${theme.palette.error.main}` : ( isFocused  ?  `1px solid ${theme.palette.grey[700]}`  : 'none' )
						}),
						'::before, ::after' : {
							display: 'none'
						},
					}}
					value={contents}
					onChange={(e) => {
						field.onChange(e.target.value);
						handleDescriptionChange(e);
					}}
					placeholder={isTitle ? t('survey.survey_description') : t('survey.answer')}
					// "설문지 설명" : "답변" 
					disabled={!isTitle}
				/>
			)}
		</Field>
	);
};

export default React.memo(TextFieldSection);