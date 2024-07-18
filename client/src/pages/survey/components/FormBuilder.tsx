import { QuestionTypes, SurveyQuestion } from "@/types/survey";
import { Box, Button, Card, TextField, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import FormQuestion from "./FormBuilder/FormQuestion";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { reorder } from "@/utils/helper";
import { useSelector } from "react-redux";
import { StateProps } from "@/store/reducers/survey";



const FormBuilder = () => {
	const theme = useTheme();
	const { primary } = theme.palette;
	const preQuestion = { question_type: QuestionTypes.WRITE, question:"", exampleList: [{example_title: '', example_value: 0, sort: 0 }]} as SurveyQuestion;
	const [ questions, setQuestions ] = useState<SurveyQuestion[]>([preQuestion]);
	

	// const { cards } = useSelector((state: StateProps) => state);

	const addQuestion = () => {
		setQuestions(prevList => [...prevList, preQuestion]);
	}

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
		<Box display="flex" flexDirection="column" gap={1}>
			{/* 제목 설정 */}
			<Card sx={{width: '100%', p: 3, borderTop: `5px solid ${primary.main}`}}>
				<Box display="flex" flexDirection="column" gap={1}>
					<TextField id="title" defaultValue="제목없는 설문지" placeholder="설문 제목" variant="standard" inputProps={{style: {fontSize: 20}}} fullWidth />
					<TextField id="description" placeholder="설문지 설명" variant="standard" fullWidth />
				</Box>
			</Card>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="question-droppable-list">
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{questions.map((question: SurveyQuestion, index: number) => (
								<FormQuestion oneQuestion={question} key={index} index={index} questionChanged={(question) => handleQuestionChanged(question)} questionDeleted={(index) => handleQuetionDeleted(index)} questionCopied={(question) => handleQuestionCopied(question)} />
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			
			<Button onClick={addQuestion}>질문 추가</Button>
		</Box>
	)
}

export default FormBuilder;
