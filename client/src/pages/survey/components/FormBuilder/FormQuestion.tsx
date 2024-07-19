import { QuestionTypes, SurveyExample, SurveyQuestion } from "@/types/survey";
import { Card, Box, TextField, Select, MenuItem, Radio, IconButton, Divider, Tooltip, Switch, useTheme, FormControlLabel } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Draggable } from "@hello-pangea/dnd";
import { CardProps, InputTypes, StateProps, focus } from "@/store/reducers/survey";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import CardHeader from "./CardHeader";
import TextFieldSection from "./TextFieldSection";
import ItemTypeSection from "./ItemTypeSection";

export const ClickHighlight = styled.div<{ isFocused: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ isFocused }) => (isFocused ? "#69b1ff": "")};
  min-height: 100%;
  width: 6px;
  z-index: 10;
`;

export interface extendedCardProps extends CardProps {
	isTitle: boolean;
	index: number;
}  

const FormQuestion = ({	isTitle, id, index }:extendedCardProps) => {
	const dispatch = useDispatch();
	
	const theme = useTheme();
	const { grey, primary } = theme.palette;
	
	const isFocused = useSelector((state: StateProps) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardProps;
		return currentCard.isFocused;
	}, shallowEqual);

	const { inputType } = useSelector(
		(state: StateProps) => state.cards.find((card) => card.id === id) as CardProps,
		shallowEqual,
	);

	const setIsFocused = () => {
		if (!isFocused) dispatch(focus({ id }));
	};

	// const handleChangeQuestionType = (e) => {
	// 	const questionType = e;
	// 	const newExampleList:SurveyExample = {
	// 		example_title: '',
	// 		example_value: 1,
	// 		sort: 1
	// 	};
	// 	setQuestion((prevState) => ({...prevState, question_type : questionType, exampleList: [newExampleList] }))
	// }

	// const handleAddExample = () => {
	// 	const exampleListLength = question.exampleList.length + 1;
	// 	const newExample:SurveyExample = {
	// 		example_title: '',
	// 		example_value: exampleListLength,
	// 		sort: exampleListLength
	// 	};

	// 	setQuestion((prevState) => ({...prevState, exampleList: [...prevState.exampleList, newExample] }))
	// }

	// const handleDeleteExample = (sort) => {
	// 	const newExample = question.exampleList.filter(example => example.sort !== sort);
	// 	newExample.map((example, index) => {
	// 		example.sort = index+1;
	// 		example.example_value = index + 1
	// 	});
	// 	setQuestion((prevState) => ({...prevState, exampleList: [...newExample] }))
	// }

	const handleAddEtc = () => {

	}

	const handleCopyQuestion = () => {

	}

	
	return (
		<Draggable draggableId={id} index={index} key={id}>
			{(provided, snapshot) => (
				<Card 
					ref={provided.innerRef}
					{...provided.draggableProps}
					sx={{
						p: '2.2rem 2rem 1rem 2rem',
						background : snapshot.isDragging ? 'rgb(235,235,235)' : 'white',
						borderLeft: snapshot.isDragging ? `5px solid ${primary.main}` : '',
						borderRadius: "5px",
						mb: '10px',
						position: 'relative',
						'&:last-child': {
							mb: 0
						}
					}}>
					<ClickHighlight isFocused={isFocused} />
					{/* 드래그 핸들 */}
					{ !isTitle && 
						<Box display="flex"
						justifyContent="center"
						{...provided.dragHandleProps}
						sx={{
							position: 'absolute',
							width: '100%',
							top: 0,
							left: 0,
							pt: '5px',
							display: 'block',
							'.MuiSvgIcon-root' : {
								opacity: 0
							},
							'&:hover': {
								'.MuiSvgIcon-root' : {
									opacity: 0.6
								}
							}
						}}>
							<MoreHorizIcon style={{display: 'block', margin: '0 auto', fontSize:"1.2rem"}}/>
						</Box>
					}
					
					
					<Box display="flex" flexDirection="column" gap={1}>
						<CardHeader isTitle={isTitle} id={id} />

						{inputType === InputTypes.WRITE ? (
							<TextFieldSection id={id} />
						) : (
							<ItemTypeSection id={id} />
						)}
						<Divider />

						{/* 질문 카드 푸터 */}
						<Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
							{/* 복사 */}
							<Tooltip title="질문 복사">
								<IconButton onClick={handleCopyQuestion}>
									<ContentCopyIcon />
								</IconButton>
							</Tooltip>
							

							{/* 삭제 */}
							<Tooltip title="질문 삭제">
								<IconButton>
									<DeleteOutlineIcon />
								</IconButton>
							</Tooltip>

						
							<Divider orientation="vertical" flexItem sx={{height:"40px"}}/> 

							<FormControlLabel
								value="end"
								sx={{ml: "0.5rem"}}
								control={
								<Switch color="primary"
									// checked={checked}
									// onChange={handleChange} 
									/>
								}
								label="필수"
								labelPlacement="start"
								/>
						</Box>
					</Box>
				</Card>
			)}
		</Draggable>
	)
}
export default FormQuestion;