import { AppBar, Box, Button, Container, Dialog, Grid, Toolbar, Typography } from "@mui/material";
import FormBuilder from "./components/FormBuilder";
import useSticky from "@/utils/useSticky";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard, addExistCard, CardProps, ItemTypeProps, resetAll, resetCards, StateProps } from "@/store/reducers/survey";
import { ExampleTypes, QuestionDivision, QuestionList, QuestionTypes, SurveyDetail, SurveyPostReqBody, SurveyPutReqBody, SurveyQuestion } from "@/types/survey";
import surveyApi from "@/apis/survey";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from 'yup';
import SurveyPreview from "./SurveyPreview";

const SurveyNew = () => {
	const { ref, isSticky } = useSticky();
	const cards = useSelector((state: StateProps) => state.cards);

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
	const navigation = useNavigate();
	const locations = useLocation();
	const parmas = useParams();
	
	const [ surveyNo, setSurveyNo ] = useState<string | number | null>(null);
	const [ locationState, setLocationState ] = useState<'edit' | 'copy' | null>(null); //edit, copy check
	const [ isPreview, setIsPreview ] = useState(false);


	useEffect(() => {
		if(locations.state) setLocationState(locations.state);
		else setLocationState(null);
	}, [locations])

	useEffect(() => {
		console.log(parmas)
		if(parmas.survey_no) { 
			setSurveyNo(Number(parmas.survey_no));
		}
	}, [])


	useEffect(() => {
		if(locationState == 'copy' && surveyNo !== null) {
			const getCopyingSurveyDeatil = async () => {
				try {
					const response = await surveyApi.getCopyingSurvey(surveyNo);
					if (response.result && response.code === 200) {
						const survey = response.content;
						dispatch(resetAll());

						dispatch(addExistCard({
							cardId: "TitleCard",
							cardTitle: '[Copy] ' + survey.title,
							inputType: QuestionTypes.TITLE,
							contents: survey.description,
							isFocused: true
						}));
						setCards(survey);

						setSurveyNo(null);
					}
				} catch (error) {
					console.error('Failed to fetch study list:', error);	
				}
			}

			getCopyingSurveyDeatil();
		}

		if(locationState == 'edit' && surveyNo !== null) {
			const getCopyingSurveyDeatil = async () => {
				try {
					const response = await surveyApi.getSurvey(surveyNo);
					if (response.result && response.code === 200) {
						const survey = response.content;
						dispatch(resetAll());

						dispatch(addExistCard({
							cardId: "TitleCard",
							cardTitle: survey.title,
							inputType: QuestionTypes.TITLE,
							contents: survey.description,
							isFocused: true
						}));
						setCards(survey);

						// setSurveyNo(null);
					}
				} catch (error) {
					console.error('Failed to fetch study list:', error);	
				}
			}

			getCopyingSurveyDeatil();
		}
	}, [locationState])


	const setCards = (survey:SurveyDetail) => {
		

		survey.questionList.forEach(question => {
			const exampleList: ItemTypeProps[] = [];
			
			question.exampleList.forEach(example => {
			exampleList.push({
					id: String(example.example_no),
					text: example.example_title,
					example_title: example.example_title,
					isEtc: example.example_type === 'OTHER' ? true : false,
				})
			});

			dispatch(addExistCard({
				cardId: question.question_no + String(Date.now()),
				cardTitle: question.question,
				inputType: question.question_type,
				contents: exampleList.length === 1 ? '' : exampleList,
				isRequired: question.required_answer_yn == 'Y' ? true : false
			}));
		})
	}


	const postNewSurvey = async (survey:SurveyPostReqBody, temp:boolean) => {
		try {
			const response = await surveyApi.postNewSurvey(survey); 
			if (response.result && response.code === 200) {
				console.log(response);

				setSurveyNo(response.content.survey_no)
				
				if(!temp) {//임시저장이 아닐경우
					dispatch(resetCards()); //localStorage에 저장된 설문내용 삭제
					navigation('/survey');//서베이 리스트로 이동
				}
			}
		} catch (error) {
			console.error('Failed to post survey:', error);
		}
	}

	const putSurvey = async (survey:SurveyPutReqBody, temp:boolean) => {
		
		try {
			const response = await surveyApi.saveSurvey(survey); 
			if (response.result && response.code === 200) {
				console.log(response);

				setSurveyNo(response.content.survey_no)
				
				if(!temp) {//임시저장이 아닐경우
					dispatch(resetCards()); //localStorage에 저장된 설문내용 삭제
					navigation('/survey');//서베이 리스트로 이동
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
			<Grid container flexDirection="column" sx={{minHeight: '100vh'}}>
				<Formik
					initialValues={initialValues}
					validationSchema={schema}
					validateOnChange={false}
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
									sx={{bgcolor: isSticky ? `rgba(255, 255, 255, 0.7)` : "transparent", boxShadow: "none", height: '60px', top: '60px', p: '10px', width: '89%'}}
									ref={ref}
									
									>
										<Box display="flex" alignItems="center">
											{
												!isSticky && <Typography variant="h3" color="secondary.dark">Survey 생성</Typography>
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
								<FormBuilder />
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

export default SurveyNew;