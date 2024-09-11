import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Tooltip, useTheme } from "@mui/material";

import { addCard, StateProps } from "@store/reducers/survey";
import { t } from "i18next";

const AddCardButton = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const cards = useSelector((state: StateProps) => state.cards);
	const focusedCardIndex = useSelector((state: StateProps) =>
		state.cards.findIndex((card) => card.isFocused),
	);

	useEffect(() => {
		if (cards.length < 2)
			dispatch(
				addCard({
					cardTitle: t('survey.an_untitled_survey'),
					focusedCardIndex: String(focusedCardIndex),
					cardId: String(Date.now()),
				}),
			);
	}, []);

	return (
		<Tooltip title={t('survey.add_a_question')} placement="right">
		<Fab
			color="primary"
			aria-label="add"
			onClick={() => {
				dispatch(
					addCard({ focusedCardIndex: String(focusedCardIndex), cardId: String(Date.now()) }),
				);
			}}
			sx={{
				position: 'sticky',
				top: '160px',
				backgroundColor: 'white',
				color: theme.palette.grey[900],
				border: `1px solid ${theme.palette.grey[300]}`,
				borderRadius: '8px',
				boxShadow: 'none',
				marginLeft: '16px',
				'&:hover' : {
				  backgroundColor: theme.palette.grey[50]
				}}}
		>
			<AddIcon />
		</Fab>
		</Tooltip>
	);
};

export default AddCardButton;
