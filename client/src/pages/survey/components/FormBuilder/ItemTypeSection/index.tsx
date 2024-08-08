import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";

import {
	addEtcItem,
  addSelectItem,
  CardProps,
  ItemTypeProps,
  removeSelectItem,
  setText,
  StateProps,
} from "@store/reducers/survey";
import * as S from "./styles";
import { Box, Container, useTheme } from "@mui/material";
import { QuestionTypes } from '@/types/survey';
import { Field } from "formik";

type ItemTypeSectionProps = {
	id: string,
	cardIndex: number
}

const ItemTypeSection = ({ id, cardIndex }: ItemTypeSectionProps) => {
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

	const haveEtc = useSelector((state: StateProps) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardProps;
		const contents = currentCard.contents as ItemTypeProps[];
		return contents ? contents.some((content) => content.isEtc) : false;
	});

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
								$isfocused={isFocused}
								{...provided.draggableProps}
							>
								{/* 옵션 드래그 핸들 */}
								<S.ContentDndHandle $isfocused={isFocused} {...provided.dragHandleProps}/>

								{inputType === QuestionTypes.SINGLE ? <S.Circle /> : null}

								{inputType === QuestionTypes.MULTIPLE ? <S.Sqare /> : null}
								<Field name={`cards.${cardIndex}.contents.${idx}.text`}>
									{({
										field,
										form: {errors}
									}) => (
									<S.TextField
										id={field.name}
										name={field.name}
										variant="standard"
										onChange={(e) => {
											field.onChange(e.target.value);
											handleChangeContentText(e, content.id);
										}}
										sx={{
											input : {
												borderBottom: ( errors.cards && errors.cards[cardIndex]?.contents && errors.cards[cardIndex].contents[idx] ? `1px solid ${theme.palette.error.main}` : 'none' )
											}
											
										}}
										value={content.isEtc ? "기타 : " : content.text}
										disabled={content.isEtc}
									/>
									)}
								</Field>
								
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
				{inputType === QuestionTypes.SINGLE ? <S.Circle /> : null}
				{inputType === QuestionTypes.MULTIPLE ? <S.Sqare /> : null}
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
				{(inputType === QuestionTypes.SINGLE || inputType === QuestionTypes.MULTIPLE) && !haveEtc ? (
					<>
						<span style={{marginLeft: '4px'}}>또는</span>
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
				) : null}
			</S.Container>
		) : null}
		</div>
  	);
};



export default React.memo(ItemTypeSection);
