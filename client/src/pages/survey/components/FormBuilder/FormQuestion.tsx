import { QuestionTypes } from "@/types/survey";
import { Card, Box, IconButton, Divider, Tooltip, Switch, useTheme, FormControlLabel } from "@mui/material";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Draggable } from "@hello-pangea/dnd";
import { CardProps, StateProps, copyCard, focus, removeCard, toggleIsRequired } from "@/store/reducers/survey";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CardHeader from "./CardHeader";
import TextFieldSection from "./TextFieldSection";
import ItemTypeSection from "./ItemTypeSection";
import React from "react";
import { t } from "i18next";

export interface extendedCardProps extends CardProps {
	isTitle: boolean;
	index: number;
}  

const FormQuestion = ({	isTitle, id, index }:extendedCardProps) => {
	const dispatch = useDispatch();
	
	const theme = useTheme();
	const { primary } = theme.palette;
	
	const [isFocused, inputType, isRequired] = useSelector((state: StateProps) => {
		const currentCard = state.cards.find((card) => card.id === id) as CardProps;
		return [currentCard.isFocused, currentCard.inputType, currentCard.isRequired];
	}, shallowEqual);

	const setIsFocused = () => {
		if (!isFocused) dispatch(focus({ id }));
	};

	const handleChangeRequired = () => {
		dispatch(toggleIsRequired({ id }));
	};

	
	return (
		<Draggable draggableId={id} index={index} key={id}>
			{(provided, snapshot) => (
				<Card 
					ref={provided.innerRef}
					onClick={() => {
						setIsFocused();
					}}
					{...provided.draggableProps}
					sx={{
						p: isFocused ? '2.2rem 2rem 1rem 2rem' : '2.2rem 2rem 2rem 2rem',
						borderLeft: snapshot.isDragging ? `5px solid ${primary.main}` : '',
						borderRadius: "5px",
						mb: '10px',
						position: 'relative',
						'&:last-child': {
							mb: 0
						}
					}}>
					{
						!snapshot.isDragging && <Box 
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								backgroundColor: isFocused ? theme.palette.primary.light : '',
								minHeight: '100%',
								width: '5px',
								zIndex: 10
							}}
						></Box>
					}
					
					{/* 드래그 핸들 */}
					<Box display="flex"
						justifyContent="center"
						{...provided.dragHandleProps}
						sx={{
							position: 'absolute',
							width: '100%',
							top: 0,
							left: 0,
							pt: '5px',
							display: isTitle ? 'none' : 'block',
							zIndex: 20,
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
					
					
					<Box display="flex" flexDirection="column" gap={1}>
						<CardHeader isTitle={isTitle} id={id} cardIndex={index} />

						{(inputType === QuestionTypes.WRITE || inputType === QuestionTypes.TITLE) ? (
							<TextFieldSection id={id} cardIndex={index} />
						) : (
							<ItemTypeSection id={id} cardIndex={index} />
						)}
						

						{/* 질문 카드 푸터 */}
						{
							!isTitle && isFocused &&
							<>
								<Divider />
								<Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
								{/* 복사 */}
								<Tooltip title={t('survey.copy_question')}>
									<IconButton onClick={(e) => {
										e.stopPropagation();
										dispatch(copyCard({ cardId: id, copiedCardId: String(Date.now()) }));
									}}>
										<ContentCopyIcon />
									</IconButton>
								</Tooltip>
								

								{/* 삭제 */}
								<Tooltip title={t('survey.delete_question')}>
									<IconButton  onClick={(e) => {
										e.stopPropagation();
										dispatch(removeCard({ cardId: id }));
									}}>
										<DeleteOutlineIcon />
									</IconButton>
								</Tooltip>

							
								<Divider orientation="vertical" flexItem sx={{height:"40px"}}/> 

								<FormControlLabel
									value="end"
									sx={{ml: "0.5rem"}}
									control={<Switch name="required" checked={isRequired as boolean} onChange={handleChangeRequired} />}
									label={t('survey.required')}
									labelPlacement="start"
									onClick={(e) => {
										e.stopPropagation();
									}}
									/>
							</Box>
						</>
						}
						
					</Box>
				</Card>
			)}
		</Draggable>
	)
}
export default React.memo(FormQuestion);