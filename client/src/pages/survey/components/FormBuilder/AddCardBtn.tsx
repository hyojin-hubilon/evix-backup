import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import { addCard, StateProps } from "@store/reducers/survey";

const AddCardButton = () => {
	const dispatch = useDispatch();
	const cards = useSelector((state: StateProps) => state.cards);
	const focusedCardIndex = useSelector((state: StateProps) =>
		state.cards.findIndex((card) => card.isFocused),
	);

	useEffect(() => {
		if (cards.length < 2)
			dispatch(
				addCard({
				cardTitle: "제목없는 질문",
				focusedCardIndex: String(focusedCardIndex),
				cardId: String(Date.now()),
			}),
		);
	}, []);

	return (
		<Button
			color="primary"
			aria-label="add"
			onClick={() => {
				dispatch(
					addCard({ focusedCardIndex: String(focusedCardIndex), cardId: String(Date.now()) }),
				);
			}}
		>
			<AddIcon sx={{fontSize: "1rem", mr: "0.5rem"}}/> <span>질문 추가</span>
		</Button>
	);
};

export default AddCardButton;
