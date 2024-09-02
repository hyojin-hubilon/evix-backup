import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionList, QuestionTypes } from '@/types/survey';
import { Box, Button, Card, Container, Typography, useTheme } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { resetAll, PreviewStateProps, addPreview } from "@/store/reducers/preview";
import { Formik, Form, FieldArray } from "formik";
import ViewCard from "../survey/components/FromView/ViewCard/ViewCard";
import * as S from './styles';
import MdppHeader from "./components/MdppHeader";
import participantSurveyApi from "@/apis/participantSurvey";
import { ParticipantSurveyDetail, ParticipantSurveyQuestionList, SurveyAnswer } from "@/types/participant";
import { CardProps } from "@/store/reducers/survey";


type InitialValues = {
	question_no: number,
	questionType: QuestionTypes,
	answer: string | number | null | [];
}
type InitialValuesType = {
	questions : InitialValues[]
};

const MdppSurvey = () => {
	const previewCards = useSelector((state: PreviewStateProps) => state.previewCards);
  	const dispatch = useDispatch();
	//setNo/:surveyNo/:surveyCycle/:surveyTurn
	const { setNo, surveyNo, surveyCycle, surveyTurn } = useParams();
	const [ survey, setSurvey ]  = useState<ParticipantSurveyDetail>({} as ParticipantSurveyDetail);
	const [ hasRequired, setHasRequired ] = useState(false);
	const [ initialValues, setInitialValues ] = useState<InitialValuesType>({ questions : []});

	
	const theme = useTheme();

	const { primary } = theme.palette;
	
	const getSurveyDeatil = async () => {
		try {
			const response = await participantSurveyApi.getSurveyDetail(setNo, surveyNo, surveyCycle, surveyTurn);
            if (response.result && response.code === 200) {
                const survey = response.content;
				setSurvey(survey);
				
				if(survey.questionList) {
					const hasRequiredCheck = survey.questionList.some((card) => card.required_answer_yn === 'Y');
					setHasRequired(hasRequiredCheck);

					setCards(survey.questionList)
				}
            }
        } catch (error) {
            console.error('Failed to fetch study list:', error);
        }
	
	}

	const setCards = (questionList:ParticipantSurveyQuestionList[]) => {
		dispatch(resetAll());
		
		const newInitialValues: InitialValues[] = [];

		questionList.map(question => {
			const nameOfA = QuestionTypes[question.question_type];
			if(nameOfA) {
				dispatch(addPreview({
					cardId: 'question' + question.question_no,
					question: question.question,
					exampleList: question.exampleList,
					questionType: question.question_type,
					isRequired: question.required_answer_yn
				}))
	
				// const newObject = `question${question.question_no}`;
				// Object.assign(newInitialValues, { [newObject] : ''}); //fieldArray로 변경하면서 initalvalues도 array로 변경

				newInitialValues.push({
					question_no: question.question_no,
					questionType: question.question_type,
					answer: null
				});
			}

		})

		setInitialValues({questions : newInitialValues});
	}

	useEffect(() => {
		getSurveyDeatil();
	}, []);

	const postSurvey = async (surveyAnswers) => {
		const response = await participantSurveyApi.postSurveyAnswer(surveyAnswers);
            if (response.result && response.code === 200) {
                const survey = response.content;	
            }
	}

	const handleSumbit = (values) => {
		let answers : SurveyAnswer[] = [];
		values.questions.forEach((value, index) => {
			const answer = {
				set_no: Number(setNo),
				survey_no: Number(surveyNo),
				answer_cycle: surveyCycle,
				answer_turn: Number(surveyTurn),
				
				question_no: value.question_no,
				answer_select: (value.questionType == 'RADIO' || value.questionType == 'MULTIPLE') ? value.answer : null,
				answer_write: value.questionType == 'WRITE' ? value.answer : null
			}

// 			answer_select: 선택 답변 값 더해서 MULTIPLE일때 [2,4]<이렇게 아님
// other 가 있을 경우도 select 값은 더해서,
// other 텍스트는 answer_write 에
			
			answers.push(answer);
		})

		console.log(answers);

		// postSurvey(answers);
	}

	return(
		<Box sx={{bgcolor: 'white', minHeight: '100vh', pt: '22px'}}>
			<MdppHeader title="설문 참여하기" backBtn></MdppHeader>			
			<Box p="23px" height="calc(100vh - 60px)" sx={{'overflowY':"scroll"}}>
				<Box display="flex" flexDirection="column" gap={2}>
					<Card sx={{width: '100%', p: '1.5rem', borderRadius:'8px', borderTop: `5px solid ${primary.main}`}}>
						<Typography variant="h1" fontSize="24px">{survey.title}</Typography>
						<Typography mt="1rem">{survey.description}</Typography>
						{
							hasRequired && <S.RequireMark>* 필수항목</S.RequireMark>
						}
						
					</Card>
					
						<Formik
							initialValues={initialValues}
							enableReinitialize={true}
							validateOnChange={false}
							validateOnBlur={true}
							onSubmit={(values, actions) => {
								actions.setSubmitting(false);
								handleSumbit(values);
								console.log(actions, values);
							}}
						>
						<Form>
							<Box display="flex" flexDirection="column" gap={2}>
							<FieldArray name="cards" render={() => {

								return (
									<>
									{previewCards && previewCards.map((card, index: number) => (
										<ViewCard 
											key={index}
											index={index}
											card={card}
										/>
									))}
									</>
								)
							}
	
							}/>


								<S.BigButton variant="contained" color="primary" type="submit" fullWidth>제출하기</S.BigButton>
							</Box>
						</Form>
					</Formik>
					
				</Box>
			</Box>
			
		</Box>
	)
}

export default MdppSurvey;


