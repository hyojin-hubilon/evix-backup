import { QuestionTypes, SurveyQuestion } from "@/types/survey";
import { Box, Button, Card, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import FormQuestion from "./FormQuestion";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import { CardProps, moveCard, moveContent, StateProps } from "@/store/reducers/survey";
import AddCardBtn from "./AddCardBtn";
import { dispatch } from "@/store";
import { FieldArray } from "formik";



const FormBuilder = () => {
	const cards = useSelector((state: StateProps) => state.cards);

	const onDragEnd = ({ destination, source }: DropResult) => {
		if (!destination) {
		  return;
		}
		if (source.droppableId === "card" && destination.index === 0) {
		  return;
		}
		if (source.droppableId === "card") {
		  dispatch(
			moveCard({
			  sourceIndex: String(source.index),
			  destinationIndex: String(destination.index),
			}),
		  );
		} else if (destination.droppableId === source.droppableId) {
		  dispatch(
			moveContent({
			  cardId: source.droppableId,
			  sourceIndex: String(source.index),
			  destinationIndex: String(destination.index),
			}),
		  );
		}
	  };

	
	return (
		<Box display="flex" flexDirection="row" width={1}>
			<Box width="89%">
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="card">
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								<FieldArray name="cards" render={() => 
									<>
									{cards.map((card: CardProps, index: number) => (
										<FormQuestion 
											key={card.id}
											index={index}
											isTitle={card.inputType === QuestionTypes.TITLE}
											{...card}
										/>
									))}
									{provided.placeholder}
									</>
								}>
									
								</FieldArray>
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</Box>
			<AddCardBtn />
		</Box>
	)
}

export default FormBuilder;
