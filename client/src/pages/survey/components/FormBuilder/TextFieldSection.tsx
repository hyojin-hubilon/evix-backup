import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardProps, InputTypes, setText, StateProps } from "@store/reducers/survey";
import { Input, OutlinedInput, TextField, useTheme } from "@mui/material";
import { ExampleList } from '../../../../types/survey';

const TextFieldSection = ({ id }: Pick<CardProps, "id">) => {
	const theme = useTheme();
	const dispatch = useDispatch();

	const inputType = useSelector((state: StateProps) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardProps;
		return currentCard.inputType;
	}) as string;

	const exampleListFirst = useSelector((state: StateProps) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardProps;
		return currentCard.exampleList[0]
	})

	console.log(exampleListFirst);

	const isFocused = useSelector((state: StateProps) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardProps;
		return currentCard.isFocused;
	}) as boolean;

	const isTitle = inputType === InputTypes.TITLE;

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		dispatch(setText({ cardId: id, text: e.target.value }));
	};

	return (
		<Input
			id="standard-basic"
			sx={{
				border:0,
				borderBottom: `1px dotted ${theme.palette.grey[900]}`,
				flexGrow: 1,
				...(isTitle && {
					borderBottom: isFocused ? `1px solid ${theme.palette.grey[900]}` : 'none',					
				}),
				'::before, ::after' : {
					display: 'none'
				},
			}}
			value={exampleListFirst?.text}
			onChange={(e) => {
				handleDescriptionChange(e);
			}}
			placeholder={isTitle ? "설문지 설명" : "답변"}
			disabled={!isTitle}
		/>
	);
};

export default TextFieldSection;
