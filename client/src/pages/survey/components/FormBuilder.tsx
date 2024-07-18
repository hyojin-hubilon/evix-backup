import { ExampleList, SurveyExample, SurveyQuestion } from "@/types/survey";
import { AppBar, Box, Button, Card, Container, Divider, FormControlLabel, IconButton, Input, List, Menu, MenuItem, Radio, RadioGroup, Select, Switch, TextField, Toolbar, Tooltip, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import FormQuestion from "./FormBuilder/FormQuestion";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { reorder } from "@/utils/helper";



const FormBuilder = () => {
	const theme = useTheme();
	const { primary } = theme.palette;
	const preQuestion = { question_type: "WRITE", question:"", exampleList: [{example_title: '', example_value: 0, sort: 0 }]} as SurveyQuestion;
	const [ questions, setQuestions ] = useState<SurveyQuestion[]>([preQuestion]);
	

	const addQuestion = () => {
		setQuestions(prevList => [...prevList, preQuestion]);
	}

	const onDragEnd = ({ destination, source }: DropResult) => {
		// dropped outside the list
		if (!destination || !questions) return;
	
		const newItems = reorder(questions, source.index, destination.index);

		newItems
	
		setQuestions(newItems);
	};

	const handleQuestionChanged = (question) => {

	}

	const handleQuetionDeleted = (index) => {
		
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
								<FormQuestion oneQuestion={question} key={index} index={index} questionChanged={(question) => handleQuestionChanged(question)} questionDeleted={(index) => handleQuetionDeleted(index)} />
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
