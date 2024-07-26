import surveyApi from "@/apis/survey";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SurveyDetail } from '@/types/survey';
import { Box, Button, Card, Typography, useTheme } from "@mui/material";
import ViewCard from "./components/FromView/ViewCard";
import * as S from './components/FromView/ViewCard/styles';
import { Field, FieldAttributes, Formik } from "formik";

type SurveyViewProps = {
	preview: boolean,
	mobile?: "Y" | "N" | undefined
}
const SurveyView = ({preview, mobile} : SurveyViewProps) => {
	const { survey_no } = useParams<{ survey_no: any }>();
	const [ survey, setSurvey ]  = useState<SurveyDetail>({} as SurveyDetail);
	const [ hasRequired, setHasRequired ] = useState(false);
	const [ initialValues, setInitialValues ] = useState({});
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
				console.log(survey)
            }
        } catch (error) {
            console.error('Failed to fetch study list:', error);
        }
	
	}

	useEffect(() => {
		if(survey_no) getSurveyDeatil();
	}, []);

	useEffect(() => {
		if(mobileView === undefined) {

		}
	}, [mobileView])


	const handleSumbit = () => {

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
				<Formik initialValues={initialValues}
				onSubmit={handleSumbit}
				>
			{/* {
				survey.questionList &&
				survey.questionList.map((question, index) => 
					<Field>
						{
							({
								field, // { name, value, onChange, onBlur }
								form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
								meta,
							}: FieldAttributes<any>) => (
								<ViewCard question={question} key={index} onChange={field.onChange} />
							)
						}
					</Field>
				)
			} */}
			<Button variant="contained" color="primary" disabled={preview ? true : false}>제출하기</Button>
			</Formik>
		</Box>
	)
}

export default SurveyView;