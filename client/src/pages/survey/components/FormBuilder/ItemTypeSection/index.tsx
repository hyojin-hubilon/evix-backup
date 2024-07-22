import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";

import {
  addSelectItem,
  CardProps,
  InputTypes,
  ItemTypeProps,
  removeSelectItem,
  setText,
  StateProps,
} from "@store/reducers/survey";
import * as S from "./styles";
import { Box, Container, useTheme } from "@mui/material";

const ItemTypeSection = ({ id }: Pick<CardProps, "id">) => {
	const theme = useTheme();
	const dispatch = useDispatch();

	const inputType = useSelector(
		(state: StateProps) => state.cards.find((card) => card.id === id)?.inputType,
	) as string;

	const isFocused = useSelector((state: StateProps) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardProps;
		return currentCard.isFocused;
	});

	const contents = useSelector(
		(state: StateProps) => state.cards.find((card) => card.id === id)?.contents,
	) as ItemTypeProps[];

	// const haveEtc = useSelector((state: StateProps) => {
	// 	const currentCard = state.cards.find((card) => card.id === id) as CardProps;
	// 	const contents = currentCard.exampleList as ItemTypeProps[];
	// 	if (currentCard.inputType === InputTypes.SINGLE) {
	// 	return true;
	// 	}
	// 	return contents.some((content) => content.isEtc);
	// });

	const handleChangeContentText = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		contentId: string,
	) => {
		dispatch(setText({ cardId: id, contentId, text: e.target.value }));
	};

  return (
		<div>
		<Droppable droppableId={id} type="content">
			{(provided) => (
			<div ref={provided.innerRef} {...provided.droppableProps}>
				{contents && contents.map((content, idx) => (
					<Draggable draggableId={content.id} index={idx} key={content.id}>
						{(provided) => (
							<S.Container
								ref={provided.innerRef}
								key={content.id}
								isFocused={isFocused}
								theme={theme}
								{...provided.draggableProps}
							>
								{/* 옵션 드래그 핸들 */}
								<S.ContentDndHandle isFocused={isFocused} theme={theme} {...provided.dragHandleProps}/>

								{inputType === InputTypes.SINGLE ? <S.Circle /> : null}

								{inputType === InputTypes.MULTIPLE ? <S.Sqare /> : null}
								
								<S.TextField
									id="standard-basic"
									isFocused={isFocused}
									variant="standard"
									value={content.text}
									onChange={(e) => {
										handleChangeContentText(e, content.id);
									}}
									// value={content.isEtc ? "기타..." : content.text}
									// disabled={content.isEtc}
								/>
								
								{
									isFocused && contents.length > 1 ? (
										<S.DeleteIcon
											onClick={() => {
												dispatch(removeSelectItem({ cardId: id, contentId: content.id }));
											}}
										/>
										) 
									: 
									null
								}
						</S.Container>
						)}
					</Draggable>
				))}
				{provided.placeholder}
			</div>
			)}
		</Droppable>
		{isFocused ? (
			<S.Container>
				{inputType === InputTypes.SINGLE ? <S.Circle /> : null}
				{inputType === InputTypes.MULTIPLE ? <S.Sqare /> : null}
				<S.ItemAddButton
					type="button"
					onClick={() => {
					const contentId = String(Date.now());
					dispatch(
						addSelectItem({
							id,
							contentId,
							text: `옵션 ${contents.filter((content) => !content.isEtc).length + 1}`,
						}),
					);
					}}
				>
					옵션 추가
				</S.ItemAddButton>
				{/* {inputType === InputTypes.SINGLE && !haveEtc ? (//기타 임시 제외
					<>
					<span>또는</span>
					<S.EtcAddButton
						type="button"
						onClick={() => {
						const contentId = String(Date.now());
						dispatch(
							addEtcItem({
							id,
							contentId,
							}),
						);
						}}
					>
						기타 추가
					</S.EtcAddButton>
					</>
				) : null} */}
			</S.Container>
		) : null}
		</div>
  	);
};

export default ItemTypeSection;
