import { QuestionTypes, SurveyExample, SurveyQuestion } from "@/types/survey";
import { Card, Box, TextField, Select, MenuItem, Radio, IconButton, Divider, Tooltip, Switch, useTheme, FormControlLabel } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Draggable } from "@hello-pangea/dnd";
import { CardProps } from "@/store/reducers/survey";


type FormQuestionProps = {
	oneQuestion: CardProps,
	index: number,
	questionChanged: (question:SurveyQuestion) => void,
	questionDeleted: (index: number) => void,
	questionCopied: (question: SurveyQuestion) => void
}

const FormQuestion = ({ oneQuestion, index, questionChanged, questionDeleted, questionCopied }:FormQuestionProps) => {
	const theme = useTheme();
	const { grey, primary } = theme.palette;
	const [ question, setQuestion ] = useState(oneQuestion);
	
	useEffect(() => {
		console.log(question);
	}, [question])

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
		<>		
		{
			question.inputType.toUpperCase() === QuestionTypes.TITLE ?
				<Card sx={{width: '100%', p: 3, borderTop: `5px solid ${primary.main}`, mb: "1rem"}}>
					<Box display="flex" flexDirection="column" gap={1}>
						<TextField id="title" defaultValue="제목없는 설문지" placeholder="설문 제목" variant="standard" inputProps={{style: {fontSize: 20}}} fullWidth />
						<TextField id="description" placeholder="설문지 설명" variant="standard" fullWidth />
					</Box>
				</Card>
				:
				<Draggable draggableId={`question-${index}`} index={index}>
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
						
						<Box display="flex" flexDirection="column" gap={1}>
							<Box display="flex" gap={1} alignItems="center">
								<TextField placeholder="질문" variant="standard" sx={{flexGrow: 1}} value={question.cardTitle} onChange={(e) => setQuestion({...question, cardTitle: e.target.value})}/>
								<Select 
									value={question.inputType}
									// onChange={(e) => handleChangeQuestionType(e.target.value)}
									size="small"
								>
									<MenuItem value="WRITE">주관식 답변</MenuItem>
									<MenuItem value="SINGLE">객관식 답변(단일응답)</MenuItem>
									<MenuItem value="MULTIPLE">객관식 답변(복수응답)</MenuItem>
								</Select>
							</Box>
							{
								question.inputType == QuestionTypes.WRITE
								?
								<TextField placeholder="주관식 답변" variant="standard" fullWidth inputProps={{ readOnly: true }} />
								:
								<Box>
									{
										question.exampleList && question.exampleList.map((example, index) => 
											{
												return (
													<Box key={index + 1} display="flex" alignItems="center">
														<Radio readOnly disabled />
														<TextField placeholder={`옵션 ${index + 1}`} variant="standard" sx={{flexGrow: 1}} value={example.example_title} />
														{
															question.exampleList && question.exampleList.length > 1 &&
															<IconButton>
																{/* onClick={() => handleDeleteExample(example.sort)} */}
																<ClearIcon style={{fontSize: "1rem"}}/>
															</IconButton>
														}
														
													</Box>
												)
											}
											
										)
									}
									
									{/* 옵션추가영역 */}
									<Box display="flex" alignItems="center">
										<Radio readOnly disabled />
										<TextField placeholder="옵션추가"
											variant="standard"
											inputProps={{readOnly: true}}
											// onClick={handleAddExample}
											/> 
										{/* <span>또는</span>
										<Button onClick={handleAddEtc}>기타추가</Button>  */}
										{/* 기타는 하나를 추가하면 기타추가 버튼이 사라져야 함, 기타는 무조건 맨 밑에 위치해야함 */}
									</Box>

								</Box>

							}
							
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
									<IconButton onClick={() => questionDeleted(index)}>
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
			}
		</>
		
	)
}
export default FormQuestion;