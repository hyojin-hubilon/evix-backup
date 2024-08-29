import surveyApi from "@/apis/survey";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionList, SurveyDetail } from '@/types/survey';
import { Box, Button, Card, Container, Typography, useTheme } from "@mui/material";
import ViewCard from "./components/FromView/ViewCard/ViewCard";
import * as S from './components/FromView/ViewCard/styles';
import { useDispatch, useSelector } from "react-redux";
import { resetAll, PreviewStateProps, addPreview } from "@/store/reducers/preview";
import { Formik, Form } from "formik";


const SurveySubmit = () => {
	const previewCards = useSelector((state: PreviewStateProps) => state.previewCards);
  	const dispatch = useDispatch();

	const { survey_no } = useParams<{ survey_no: any }>();
	const [ survey, setSurvey ]  = useState<SurveyDetail>({} as SurveyDetail);
	const [ hasRequired, setHasRequired ] = useState(false);
	const [ initialValues, setInitialValues ] = useState({});
	
	const theme = useTheme();

	const { primary } = theme.palette;
	
	const getSurveyDeatil = async (surveyNumber) => {
		try {
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
        } catch (error) {
            console.error('Failed to fetch study list:', error);
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
		const surveyNumber = survey_no;
		if(surveyNumber) getSurveyDeatil(surveyNumber);
	}, []);

	const handleSumbit = (event) => {
		console.log(event);
	}

	return(
		<Container maxWidth="md">
		<Box display="flex" flexDirection="column" gap={2} p="1rem">
			<Card sx={{width: '100%', p: '1.5rem', borderRadius:'8px', borderTop: `5px solid ${primary.main}`}}>
				<Typography variant="h1">{survey.title}</Typography>
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
						console.log(actions, values); //아직 답변 POST 없음
					}}
				>
				<Form>
					<Box display="flex" flexDirection="column" gap={2}>
						{
							previewCards && previewCards.map((card, index) => <ViewCard key={index} id={card.cardId} />)
						}
						<Button variant="contained" color="primary" type="submit" fullWidth>제출하기</Button>
					</Box>
				</Form>
			</Formik>
			
		</Box>
		</Container>
	)
}

export default SurveySubmit;


