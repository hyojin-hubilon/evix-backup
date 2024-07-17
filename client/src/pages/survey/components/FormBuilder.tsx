import { ExampleList, SurveyExample, SurveyQuestion } from "@/types/survey";
import { AppBar, Box, Button, Card, Container, Divider, FormControlLabel, IconButton, Input, Menu, MenuItem, Radio, RadioGroup, Select, Switch, TextField, Toolbar, Tooltip, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const FormBuilder = () => {
	const theme = useTheme();
	const { primary } = theme.palette;
	const preQuestion = { question_type: "WRITE", exampleList: [{example_title: '', example_value: 0, sort: 0 }]}
	const [ question, setQuestion ] = useState<SurveyQuestion>(preQuestion as SurveyQuestion);

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
		<Box display="flex" flexDirection="column" gap={1}>
			{/* 제목 설정 */}
			<Card sx={{width: '100%', p: 3, borderTop: `5px solid ${primary.main}`}}>
				<Box display="flex" flexDirection="column" gap={1}>
					<TextField id="title" defaultValue="제목없는 설문지" placeholder="설문 제목" variant="standard" inputProps={{style: {fontSize: 20}}} fullWidth />
					<TextField id="description" placeholder="설문지 설명" variant="standard" fullWidth />
				</Box>
			</Card>
			{/* 질문 영역 */}
			<Card sx={{width: '100%', p: 3}}>
				<Box display="flex" flexDirection="column" gap={1}>
					<Box display="flex" gap={1}>
						<TextField defaultValue="제목없는 질문" placeholder="질문" variant="standard"  />
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
								<span>또는</span>
								<Button onClick={handleAddEtc}>기타추가</Button> 
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
							<IconButton>
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
			{/* 질문 영역 끝 */}

			<Button>질문 추가</Button>
		</Box>
	)
}

export default FormBuilder;
