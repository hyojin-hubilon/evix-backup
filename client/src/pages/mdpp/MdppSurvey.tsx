import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QuestionList } from '@/types/survey';
import { Box, Button, Card, Container, Typography, useTheme } from "@mui/material";


import { useDispatch, useSelector } from "react-redux";
import { resetAll, PreviewStateProps, addPreview } from "@/store/reducers/preview";
import { Formik, Form } from "formik";
import ViewCard from "../survey/components/FromView/ViewCard/ViewCard";
import * as S from './styles';
import MdppHeader from "./components/MdppHeader";
import participantSurveyApi from "@/apis/participantSurvey";
import { ParticipantSurveyDetail, ParticipantSurveyQuestionList } from "@/types/participant";


const MdppSurvey = () => {
	const previewCards = useSelector((state: PreviewStateProps) => state.previewCards);
  	const dispatch = useDispatch();
	//setNo/:surveyNo/:surveyCycle/:surveyTurn
	const { setNo, surveyNo, surveyCycle, surveyTurn } = useParams();
	const [ survey, setSurvey ]  = useState<ParticipantSurveyDetail>({} as ParticipantSurveyDetail);
	const [ hasRequired, setHasRequired ] = useState(false);
	const [ initialValues, setInitialValues ] = useState({});
	
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
		
		getSurveyDeatil();
	}, []);

	const handleSumbit = (event) => {
		console.log(event);
	}

	return(
		<Box sx={{bgcolor: 'white', minHeight: '100vh', pt: '22px'}}>
			<MdppHeader title="설문 참여하기" backBtn></MdppHeader>			
			<Box p="23px" height="calc(100vh - 55px)" overflow="scroll">
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
								{
									previewCards && previewCards.map((card, index) => <ViewCard key={index} id={card.cardId} />)
								}
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


