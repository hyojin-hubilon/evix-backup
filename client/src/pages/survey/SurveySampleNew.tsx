import { AppBar, Box, Button, Card, Container, Dialog, FormControl, Grid, OutlinedInput, Typography } from "@mui/material";
import FormBuilder from "./components/FormBuilder";
import useSticky from "@/utils/useSticky";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExistCard, CardProps, ItemTypeProps, resetAll, resetCards, StateProps } from "@/store/reducers/survey";
import { ExampleTypes, QuestionDivision, QuestionTypes, SurveyDetail, SurveyPostReqBody, SurveyPutReqBody, SurveyQuestion } from "@/types/survey";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from 'yup';
import SurveyPreview from "./SurveyPreview";
import mastersApi from "@/apis/masters";

const SurveySampleNew = () => {
	const { ref, isSticky } = useSticky();
	const cards = useSelector((state: StateProps) => state.cards);
	const [ disease, setDisease ] = useState('');

	const schema = Yup.object().shape({
		cards: Yup.array()
			.of(
				Yup.object().shape({
					cardTitle: Yup.string().required('Required'), // these constraints take precedence
					inputType: Yup.string().required('Required'),
					contents: Yup.lazy(value => {
						switch (typeof value) {
							case 'object':
								return Yup.array().of(Yup.object().shape({
									id: Yup.string(),
									isEtc: Yup.boolean(),
									text: Yup.string().when('isEtc', {
										is: (isEtc: boolean) => isEtc,
										then: s => s.notRequired(),
										otherwise: s => s.required()
									})
								}));
								
							default:
								return Yup
									.string()
									.when('inputType', {
										is: 'TITLE',
										then: s => s.required(),
										otherwise: s => s.notRequired(),
									})
						}
					})
				})
			).required()
	});

	const [initialValues, setInitialValues] = useState({cards : [] as CardProps[]});
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const [ surveyNo, setSurveyNo ] = useState<string | number | null>(null);
	const [ isPreview, setIsPreview ] = useState(false);

	const postNewSurvey = async (survey:SurveyPostReqBody, temp:boolean) => {
		try {
			const response = await mastersApi.postNewSurveySample(survey); 
			if (response.result && response.code === 200) {
				console.log(response);

				setSurveyNo(response.content.survey_no)
				
				if(!temp) {//임시저장이 아닐경우
					dispatch(resetCards()); //localStorage에 저장된 설문내용 삭제
					navigate('/master/samples');//서베이 리스트로 이동
				}
			}
		} catch (error) {
			console.error('Failed to post survey:', error);
		}
	}

	const putSurvey = async (survey:SurveyPutReqBody, temp:boolean) => {
		
		try {
			const response = await mastersApi.saveSurveySample(survey); 
			if (response.result && response.code === 200) {
				console.log(response);

				setSurveyNo(response.content.survey_no)
				
				if(!temp) {//임시저장이 아닐경우
					dispatch(resetCards()); //localStorage에 저장된 설문내용 삭제
					navigate('/master/samples');//서베이 리스트로 이동
				}
			}
		} catch (error) {
			console.error('Failed to post survey:', error);
		}
	}

	const handleSaveSurvey = (temp:boolean) => {

		//저장전에 유효성 체크..(=설문 제목, 질문 제목 체크하면 됨)
		//저장후 localStorage에 저장된 서베이 삭제
		
		console.log(cards);
		
		const newSurvey : SurveyPostReqBody = {
			title: '',
			description: '',
			sample_yn: 'Y',
			questionList: [],
			disease: disease
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

		if(surveyNo) {
			const saving: SurveyPutReqBody = {...newSurvey, survey_no: surveyNo}
			console.log(saving);
			putSurvey(saving, temp);
		} else {
			postNewSurvey(newSurvey, temp);
		}
	}

	const handleButtonClick = (
		temp: boolean,//임시저장: true / 저장 : false
		formikProps: FormikProps<{cards: CardProps[]}>
	  ) => {
		
		const { isValid, values, errors } = formikProps;
		console.log(isValid, values, errors);
		
		if(isValid) {
			handleSaveSurvey(temp);
		}
	};

	useEffect(() => {
		setInitialValues({cards: cards})
	}, [cards])

	const handlePreview = () => {
		setIsPreview(true);
	}

	const handleClosePreview = () => {
		setIsPreview(false);
	}

	return (
		<>
		<Container maxWidth="md">
			<Grid container flexDirection="column" sx={{minHeight: '100vh', pb:'2rem'}}>
				<Formik
					initialValues={initialValues}
					validationSchema={schema}
					validateOnChange={true}
					enableReinitialize={true}
					onSubmit={(values, actions) => {
						actions.setSubmitting(false);
					}}
				>
					 {formikProps => {
						const {
							isSubmitting,
						} = formikProps;
						return (
							<Form>
								<AppBar
									position="sticky"
									sx={{bgcolor: isSticky ? `rgba(255, 255, 255, 0.7)` : "transparent", boxShadow: "none", height: '60px', top: '0', p: '10px', width: '89%'}}
									ref={ref}
									
									>
										<Box display="flex" alignItems="center">
											{
												!isSticky && <Typography variant="h3" color="secondary.dark">Sample Survey 생성</Typography>
											}
											
											<Box display="flex" justifyContent="flex-end" gap={1} sx={{ml: 'auto'}}>
												{
													surveyNo && <Button variant="outlined" onClick={handlePreview}>미리보기</Button>
												}
												
												<Button variant="outlined" disabled={isSubmitting} onClick={() => handleButtonClick(true, formikProps)}>임시저장</Button>
												<Button variant="contained" disabled={isSubmitting} onClick={() => handleButtonClick(false, formikProps)}>저장</Button>
											</Box>
										</Box>
									
								</AppBar>	

								<Card sx={{ width: '89%', mt:'20px', mb: '10px', p: '0.5rem'}}>
									<OutlinedInput placeholder="질병(분류용)" size="small" onChange={(e) => setDisease(e.target.value)} fullWidth />
								</Card>
								{
									cards && <FormBuilder />
								}
								
							</Form>
						);
					}}
				</Formik>
			</Grid>
			
		</Container>
		{
			surveyNo && isPreview &&
				<Dialog open={isPreview} maxWidth="lg" onClose={handleClosePreview} fullWidth>
					<SurveyPreview surveyNo={surveyNo} handleClose={handleClosePreview} isDialog={true} />
				</Dialog>
		}
		
		</>

	)
}

export default SurveySampleNew;