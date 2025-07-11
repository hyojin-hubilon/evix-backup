import surveyApi from "@/apis/survey";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionList, QuestionTypes, SurveyDetail } from '@/types/survey';
import { Box, Button, Card, Typography, useTheme } from "@mui/material";
import ViewCard from "./components/FromView/ViewCard/ViewCard";
import * as S from './components/FromView/ViewCard/styles';
import { useDispatch, useSelector } from "react-redux";
import { resetAll, PreviewStateProps, addPreview } from "@/store/reducers/preview";
import { Formik, Form } from "formik";
import { useConfirmation } from '@/context/ConfirmDialogContext';
import mastersApi from "@/apis/masters";


type SurveyViewProps = {
	preview?: boolean,
	// mobile?: "Y" | "N" | undefined,
	surveyNo? : string | number,
	isMaster?: boolean
}
const SurveyView = ({preview, surveyNo, isMaster} : SurveyViewProps) => {
	const previewCards = useSelector((state: PreviewStateProps) => state.previewCards);
  	const dispatch = useDispatch();
	const navigate = useNavigate();
	const confirm = useConfirmation();

	const { survey_no } = useParams<{ survey_no: any }>();
	const [ survey, setSurvey ]  = useState<SurveyDetail>({} as SurveyDetail);
	const [ hasRequired, setHasRequired ] = useState(false);
	const [ initialValues, setInitialValues ] = useState({});
	
	const theme = useTheme();

	const { primary } = theme.palette;
	
	const getSurveyDeatil = async (surveyNumber) => {
		try {
			if(isMaster) {
				const response = await mastersApi.getSurveySample(surveyNumber);
				if (response.result && response.code === 200) {
					const survey = response.content;
					setSurvey(survey);
					
					if(survey.questionList) {

						const hasRequiredCheck = survey.questionList.some((card) => card.required_answer_yn === 'Y');
						setHasRequired(hasRequiredCheck);

						setCards(survey.questionList)

					}
					
					console.log(survey)
				}

			} else {
				const response = await surveyApi.getSurvey(surveyNumber);
				if (response.result && response.code === 200) {
					const survey = response.content;
					setSurvey(survey);
					
					if(survey.questionList) {

						const hasRequiredCheck = survey.questionList.some((card) => card.required_answer_yn === 'Y');
						setHasRequired(hasRequiredCheck);

						setCards(survey.questionList)

					}
					
					console.log(survey)
				}
			}
			
        } catch (error) {
            console.error('Failed to fetch survey:', error);
			dispatch(resetAll());
			confirm({
				description: 'Failed to fetch survey',
				variant: 'info'
			})
			.then(() => { 
				navigate('/survey');
			});
			
        }
	
	}

	const setCards = (questionList:QuestionList[]) => {
		dispatch(resetAll());
		
		const newInitialValues = {};

		questionList.map(question => {
			dispatch(addPreview({
				cardId: 'question' + question.question_no,
				question: question.question,
				exampleList: question.exampleList,
				questionType: question.question_type,
				isRequired: question.required_answer_yn
			}))

			const newObject = `question${question.question_no}`;

			Object.assign(newInitialValues, { [newObject] : ''});

		})

		setInitialValues(newInitialValues);
	}

	useEffect(() => {
		const surveyNumber = survey_no ? survey_no : surveyNo;
		console.log(surveyNo);
		if(surveyNumber) getSurveyDeatil(surveyNumber);
	}, []);

	useEffect(() => {
		if(surveyNo) getSurveyDeatil(surveyNo);
	}, [surveyNo])


	const handleSumbit = (event) => {
		console.log(event);
	}

	return(
		<Box display="flex" flexDirection="column" gap={2}>
			<Card sx={{width: '100%', p: '1.5rem', borderRadius:'8px', borderTop: `5px solid ${primary.main}`}}>
				<Typography variant="h3">{survey.title}</Typography>
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
						console.log(actions, values); //아직 답변 POST 없음
					}}
				>
				<Form>
					<Box display="flex" flexDirection="column" gap={2}>
					{
						previewCards && previewCards.map((card, index) => {
							const nameOfA = QuestionTypes[card.questionType]; //QuestionType Parent 일단 뺌
							return (
								nameOfA &&
								<ViewCard 
									key={index}
									index={index}
									card={card}
							/>
							)
						})
					}
						<Button variant="contained" color="primary" type="submit" disabled={preview ? true : false} fullWidth>제출하기</Button>
					</Box>
				</Form>
			</Formik>
			
		</Box>
	)
}

export default SurveyView;


