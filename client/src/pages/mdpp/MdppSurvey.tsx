import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionTypes } from '@/types/survey';
import { Box, Card, Typography, useTheme } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { resetAll, PreviewStateProps, addPreview } from "@/store/reducers/preview";
import { Formik, Form, FieldArray } from "formik";
import ViewCard from "../survey/components/FromView/ViewCard/ViewCard";
import * as S from './styles';
import MdppHeader from "./components/MdppHeader";
import participantSurveyApi from "@/apis/participantSurvey";
import { ParticipantSurveyDetail, ParticipantSurveyQuestionList, SurveyAnswer } from "@/types/participant";
import * as Yup from 'yup';
import { setAlert } from "@/store/reducers/snack";
import { useConfirmation } from "@/context/ConfirmDialogContext";


type InitialValues = {
	question_no: number,
	questionType: QuestionTypes,
	answer: string | number | null | [];
	answerEtc: string | null;
	isRequired:boolean;
	answerMultiple: []
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
	const confirm = useConfirmation();
	const navigate = useNavigate();

	const schema = Yup.object().shape({
		questions: Yup.array()
			.of(
				Yup.object().shape({
					questionType: Yup.string(),
					isRequired: Yup.boolean(),

					answer: Yup.mixed().when(['isRequired', 'questionType'], {
						is: (isRequired: boolean, questionType: string) => isRequired && (questionType == QuestionTypes.RADIO || questionType == QuestionTypes.WRITE),
						then: s => s.required('필수항목 입니다.'),
						otherwise: s => s.notRequired()
					}),
					answerMultiple: Yup.array().when(['isRequired', 'questionType'], {
						is: (isRequired: boolean, questionType: string) => isRequired && questionType == QuestionTypes.MULTIPLE,
						then: s => s.min(1).required('필수항목 입니다.'),
						otherwise: s => s.notRequired()
					})
				})
			).required()
	});

	
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
					answer: null,
					answerEtc: null,
					isRequired: question.required_answer_yn == 'Y' ? true : false,
					answerMultiple: []
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
				confirm({
					description:'설문에 참여해주셔서 감사합니다.',
					variant: 'info'
				}).then(() => {
					const webView = (window as any).ReactNativeWebView;
					if (webView) {
						webView.postMessage('exit');
					} else {
						navigate('/mdpp/studies');
					}
				});

            }
	}

	const handleSumbit = (values: InitialValuesType) => {
		console.log(values);
		let answers : SurveyAnswer[] = [];
		let answerWrite : string | number | [] | null = null;
		values.questions.forEach((value, index) => {
			let answerSelect: string | number | null | [] =  null;
			if (value.questionType === QuestionTypes.RADIO || value.questionType === QuestionTypes.SINGLE) {
				answerSelect = Number(value.answer);
				if(value.answerEtc) {
					answerWrite = value.answerEtc;
				}
			}

			if(value.questionType == QuestionTypes.MULTIPLE) {
				answerSelect = value.answerMultiple.reduce((partialSum, a) => partialSum + Number(a), 0);
				if(value.answerEtc) {
					answerWrite = value.answerEtc;
				}
			}

			if(value.questionType == QuestionTypes.WRITE) {
				answerWrite = value.answer;
			}			

			const answer = {
				set_no: Number(setNo),
				survey_no: Number(surveyNo),
				answer_cycle: surveyCycle,
				answer_turn: Number(surveyTurn),
				
				question_no: value.question_no,
				answer_select: answerSelect,
				answer_write: answerWrite
			}

			// answer_select: 선택 답변 값 더해서 MULTIPLE일때 [2,4]<이렇게 아님
			// other 가 있을 경우도 select 값은 더해서,
			// other 텍스트는 answer_write 에
			
			answers.push(answer);
		})

		console.log(answers);

		postSurvey(answers);
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
								console.log(values, actions)
							}}
							validationSchema={schema}
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


