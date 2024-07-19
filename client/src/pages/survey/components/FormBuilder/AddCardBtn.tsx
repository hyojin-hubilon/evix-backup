import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { Button, Tooltip } from "@mui/material";

import { addCard, StateProps } from "@store/reducers/survey";

const AddCardButton = () => {
  const dispatch = useDispatch();
  const { cards } = useSelector((state: StateProps) => state);
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
		질문 추가
	</Button>
  );
};

export default AddCardButton;
