import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import FormBuilder from "./components/FormBuilder";
import useSticky from "@/utils/useSticky";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CardProps, StateProps } from "@/store/reducers/survey";
import { ExampleTypes, QuestionDivision, QuestionTypes, SurveyPostReqBody, SurveyQuestion } from "@/types/survey";
import surveyApi from "@/apis/survey";
import { useNavigate } from "react-router-dom";

const SurveyNew = () => {
	//주석 테스트
	const { ref, isSticky } = useSticky();
	const cards = useSelector((state: StateProps) => state.cards);
	const navigation = useNavigate();
	// const [ newSurvey, setNewsurvey ] = useState<SurveyPostReqBody>({
	// 	title: '',
	// 	description: '',
	// 	sample_yn: 'N',
	// 	questionList: []
	// })

	const postNewSurvey = async (survey:SurveyPostReqBody) => {
		try {
			const response = await surveyApi.postNewSurvey(survey); 
			if (response.result && response.code === 200) {
				console.log(response);
				navigation('/survey');
			}
		} catch (error) {
			console.error('Failed to post survey:', error);
		}
	}

	const handleSaveSurvey = () => {

		//저장전에 유효성 체크..(=설문 제목, 질문 제목 체크하면 됨)
		//저장후 localStorage에 저장된 서베이 삭제
		
		console.log(cards);
		const newSurvey : SurveyPostReqBody = {
			title: '',
			description: '',
			sample_yn: 'N',
			questionList: []
		}
		
		cards.forEach((card : CardProps, index:number) => {
			const newQuestion : SurveyQuestion = {
				question: card.cardTitle,
				question_division: QuestionDivision.GENERAL,
				level: 1, //1?
				sort: index,
				question_type: card.inputType,
				required_answer_yn: card.isRequired ? "Y" : "N",
				exampleList: []
			}

			if(card.inputType == QuestionTypes.TITLE) {
				newSurvey.title = card.cardTitle;
				newSurvey.description = card.contents as string;
			} else if(card.inputType == QuestionTypes.WRITE) {
				newQuestion.exampleList = [{
					example_type: ExampleTypes.WRITE,
					example_title: null,
					example_value: 1,
					sort: 1
				}];

				newSurvey.questionList.push(newQuestion);
			} else if(card.inputType == QuestionTypes.MULTIPLE) {


				let valueNum = 1;

				if(typeof card.contents == 'object') card.contents.forEach((example, i) => {
					newQuestion.exampleList.push({
						example_type:  example.isEtc ?	ExampleTypes.OTHER : ExampleTypes.CHOICE,
						example_title: example.isEtc ? 'Other' : example.text,
						example_value: valueNum,
						sort: i + 1
					});
					valueNum = valueNum * 2;
				});

				newSurvey.questionList.push(newQuestion);
			} else {
				if(typeof card.contents == 'object') card.contents.forEach((example, j) => {
					newQuestion.exampleList.push({
						example_type:  example.isEtc ?	ExampleTypes.OTHER : ExampleTypes.CHOICE,
						example_title: example.isEtc ? 'Other' : example.text,
						example_value: j + 1,
						sort: j + 1
					});
				});

				newSurvey.questionList.push(newQuestion);
			}
		})

		postNewSurvey(newSurvey);
	}

	return (
		<Container maxWidth="sm">
			<Grid container flexDirection="column" sx={{minHeight: '100vh'}}>
				<AppBar
					position="sticky"
					sx={{bgcolor: isSticky ? `rgba(255, 255, 255, 0.7)` : "transparent", boxShadow: "none", height: '60px', top: '60px', p: '10px', width: '89%'}}
					ref={ref}
					
					>
						<Box display="flex" alignItems="center">
							{
								!isSticky && <Typography variant="h3" color="secondary.dark">Survey 생성</Typography>
							}
							
							<Box display="flex" justifyContent="flex-end" gap={1} sx={{ml: 'auto'}}>
								<Button variant="outlined">미리보기</Button>
								<Button variant="outlined">임시저장</Button>
								<Button variant="contained" onClick={handleSaveSurvey}>저장</Button>
							</Box>
						</Box>
					
				</AppBar>	
				<FormBuilder />
			</Grid>
		</Container>

	)
}

export default SurveyNew;