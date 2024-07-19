import { QuestionTypes, SurveyQuestion } from "@/types/survey";
import { Box, Button, Card, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import FormQuestion from "./FormBuilder/FormQuestion";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { reorder } from "@/utils/helper";
import { useSelector } from "react-redux";
import { CardProps, StateProps } from "@/store/reducers/survey";
import AddCardBtn from "./FormBuilder/AddCardBtn";



const FormBuilder = () => {
	const theme = useTheme();
	const { primary } = theme.palette;
	const [ questions, setQuestions ] = useState<SurveyQuestion[]>([]);
	

	const { cards } = useSelector((state: StateProps) => state);

	const onDragEnd = ({ destination, source }: DropResult) => {
		// dropped outside the list
		if (!destination || !questions) return;
	
		const newItems = reorder(questions, source.index, destination.index);
		//sort 저장시에 설정
		setQuestions(newItems);
	};

	const handleQuestionChanged = (question) => {

	}
	
	const handleQuetionDeleted = (index) => {
		
	}

	const handleQuestionCopied = (question) => {

	}
	

	useEffect(() => {
		console.log(questions)
	}, [questions]);


	return (
		<Box display="flex" flexDirection="column" gap={2}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="question-droppable-list">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{cards.map((card: CardProps, index: number) => (
								<FormQuestion oneQuestion={card} key={index} index={index} questionChanged={(question) => handleQuestionChanged(question)} questionDeleted={(index) => handleQuetionDeleted(index)} questionCopied={(question) => handleQuestionCopied(question)} />
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			
			<AddCardBtn />
		</Box>
	)
}

export default FormBuilder;
