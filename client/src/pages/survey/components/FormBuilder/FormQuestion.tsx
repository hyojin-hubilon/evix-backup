import { SurveyExample, SurveyQuestion } from "@/types/survey";
import { Card, Box, TextField, Select, MenuItem, Radio, IconButton, Divider, Tooltip, Switch, useTheme } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Draggable } from "@hello-pangea/dnd";


type FormQuestionProps = {
	oneQuestion: SurveyQuestion,
	index: number,
	questionChanged: (question:SurveyQuestion) => void,
	questionDeleted: (index: number) => void
}

const FormQuestion = ({ oneQuestion, index, questionChanged, questionDeleted }:FormQuestionProps) => {
	const theme = useTheme();
	const { grey, primary } = theme.palette;
	const [ question, setQuestion ] = useState(oneQuestion);
	
	useEffect(() => {
		console.log(question);
	}, [question])

	const handleChangeQuestionType = (e) => {
		const questionType = e;
		const newExampleList:SurveyExample = {
			example_title: '',
			example_value: 1,
			sort: 1
		};
		setQuestion((prevState) => ({...prevState, question_type : questionType, exampleList: [newExampleList] }))
	}

	const handleAddExample = () => {
		const exampleListLength = question.exampleList.length + 1;
		const newExample:SurveyExample = {
			example_title: '',
			example_value: exampleListLength,
			sort: exampleListLength
		};

		setQuestion((prevState) => ({...prevState, exampleList: [...prevState.exampleList, newExample] }))
	}

	const handleDeleteExample = (sort) => {
		const newExample = question.exampleList.filter(example => example.sort !== sort);
		newExample.map((example, index) => {
			example.sort = index+1;
			example.example_value = index + 1
		});
		setQuestion((prevState) => ({...prevState, exampleList: [...newExample] }))
	}

	const handleAddEtc = () => {

	}

	
	return (
		<Draggable draggableId={`question-${index}`} index={index}>
			{(provided, snapshot) => (
				<Card 
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					sx={{
						p: 3,
						background : snapshot.isDragging ? 'rgb(235,235,235)' : 'white',
						borderLeft: snapshot.isDragging ? `5px solid ${primary.main}` : '',
						borderRadius: "5px", cursor:'pointer',
						mb: '5px',
						'&:last-child': {
							mb: 0
						}
					}}>
					<Box display="flex" flexDirection="column" gap={1}>
						<Box display="flex" gap={1}>
							<TextField defaultValue="제목없는 질문" placeholder="질문" variant="standard"  value={question.question} />
							<Select 
								value={question.question_type}
								onChange={(e) => handleChangeQuestionType(e.target.value)}
							>
								<MenuItem value="WRITE">주관식 답변</MenuItem>
								<MenuItem value="SINGLE">객관식 답변(단일응답)</MenuItem>
								<MenuItem value="MULTIPLE">객관식 답변(복수응답)</MenuItem>
							</Select>
						</Box>
						{
							question.question_type == "WRITE"
							?
							<TextField placeholder="주관식 답변" variant="standard" fullWidth inputProps={{ readOnly: true }} />
							:
							<Box>
								{
									question.exampleList && question.exampleList.map((example, index) => 
										{
											return (
												<Box key={index + 1}>
													<Radio readOnly disabled />
													<TextField placeholder={`옵션 ${index + 1}`} variant="standard" />
													{
														question.exampleList && question.exampleList.length > 1 &&
														<IconButton onClick={() => handleDeleteExample(example.sort)}>
															<ClearIcon />
														</IconButton>
													}
													
												</Box>
											)
										}
										
									)
								}
								
								{/* 옵션추가영역 */}
								<Box>
									<Radio readOnly disabled />
									<TextField placeholder="옵션추가"
										variant="standard"
										inputProps={{readOnly: true}}
										onClick={handleAddExample} /> 
									{/* <span>또는</span>
									<Button onClick={handleAddEtc}>기타추가</Button>  */}
									{/* 기타는 하나를 추가하면 기타추가 버튼이 사라져야 함, 기타는 무조건 맨 밑에 위치해야함 */}
								</Box>

							</Box>

						}
						
						<Divider />
						<Box display="flex">
							{/* 복사 */}
							<Tooltip title="질문 복사">
								<IconButton>
									<ContentCopyIcon />
								</IconButton>
							</Tooltip>
							

							{/* 삭제 */}
							<Tooltip title="질문 삭제">
								<IconButton onClick={() => questionDeleted(index)}>
									<DeleteOutlineIcon />
								</IconButton>
							</Tooltip>

							{/* 세로 디바이더 */}
							<Divider flexItem /> 
							필수
							<Switch
								// checked={checked}
								// onChange={handleChange}
								inputProps={{ 'aria-label': 'controlled' }}
								/>
						</Box>
					</Box>
				</Card>
			)}
		</Draggable>
	)
}
export default FormQuestion;