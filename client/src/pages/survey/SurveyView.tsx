import surveyApi from "@/apis/survey";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExampleTypes, QuestionList, QuestionTypes, SurveyDetail } from '@/types/survey';
import { Box, Button, Card, TextField, Typography, useTheme } from "@mui/material";
import ViewCard from "./components/FromView/ViewCard";
import * as S from './components/FromView/ViewCard/styles';
import { useDispatch, useSelector } from "react-redux";
import { resetAll, PreviewStateProps, addPreview } from "@/store/reducers/preview";


type SurveyViewProps = {
	preview: boolean,
	mobile?: "Y" | "N" | undefined
}
const SurveyView = ({preview, mobile} : SurveyViewProps) => {
	const previewCards = useSelector((state: PreviewStateProps) => state.previewCards);
	console.log(previewCards);
  	const dispatch = useDispatch();

	const { survey_no } = useParams<{ survey_no: any }>();
	const [ survey, setSurvey ]  = useState<SurveyDetail>({} as SurveyDetail);
	const [ hasRequired, setHasRequired ] = useState(false);
	
	const theme = useTheme();

	const [ mobileView, setMovileView ] = useState(mobile);

	const { primary } = theme.palette;

	console.log(survey_no)

	
	const getSurveyDeatil = async () => {
		try {
			const response = await surveyApi.getSurvey(survey_no);
            if (response.result && response.code === 200) {
                const survey = response.content;
				setSurvey(survey);
				const hasRequiredCheck = survey.questionList.some((card) => card.required_answer_yn === 'Y');
				setHasRequired(hasRequiredCheck);

				setCards(survey.questionList)

				console.log(survey)
            }
        } catch (error) {
            console.error('Failed to fetch study list:', error);
        }
	
	}

	const setCards = (questionList:QuestionList[]) => {
		dispatch(resetAll());
		questionList.map(question => dispatch(addPreview({
			cardId: 'question' + question.question_no,
			question: question.question,
			exampleList: question.exampleList,
			questionType: question.question_type,
			isRequired: question.required_answer_yn,
			// contents: question.exampleList | string,
		})))
	}

	useEffect(() => {
		if(survey_no) getSurveyDeatil();
	}, []);

	useEffect(() => {
		if(mobileView === undefined) {

		}
	}, [mobileView])


	const handleSumbit = (event) => {
		console.log(event);
		
	}

	const onChange = (e) => {
		console.log(e);
	}


	return(
		<Box display="flex" flexDirection="column" gap={2}>
			<Card sx={{width: '100%', p: '1.5rem', borderRadius:'8px', borderTop: `5px solid ${primary.main}`}}>
				<Typography variant="h1">{survey.title}</Typography>
				<Typography mt="1rem">{survey.description}</Typography>
				{
					hasRequired && <S.RequireMark>* 필수항목</S.RequireMark>
				}
				
			</Card>
				{
					previewCards &&
						previewCards.map((card, index) => (
							<ViewCard key={index} id={card.cardId} />
						)						
					)
				}
				<Button variant="contained" color="primary" type="submit" fullWidth>제출하기</Button>{/* disabled={preview ? true : false} */}
				
				
			
			
			
		</Box>
	)
}

export default SurveyView;

function addPreviewCard(arg0: { cardId: string; cardTitle: string; inputType: QuestionTypes; isRequired: boolean; }): any {
	throw new Error("Function not implemented.");
}
