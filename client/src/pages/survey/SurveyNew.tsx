import { AppBar, Box, Button, Card, Container, Dialog, Grid, OutlinedInput, Toolbar, Typography } from "@mui/material";
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
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { t } from "i18next";

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
	const navigate = useNavigate();
	const locations = useLocation();
	const parmas = useParams();
	
	const [ surveyNo, setSurveyNo ] = useState<string | number | null>(null);
	const [ locationState, setLocationState ] = useState<'edit' | 'copy' | 'new' | null>(null); //edit, copy check
	const [ isPreview, setIsPreview ] = useState(false);
	const confirm = useConfirmation();
	const [ surveyDetail, setSurveyDetail ] = useState<SurveyDetail | null>(null);
	const [ disease, setDisease ] = useState('');

	useEffect(() => {
		console.log(locations.pathname.startsWith('/survey/edit') && parmas.survey_no)
		if((locations.pathname.startsWith('/survey/edit') && parmas.survey_no) || (locations.state == 'edit' && parmas.survey_no)) {
			setLocationState('edit');
			setSurveyNo(Number(parmas.survey_no));
			getCopyingSurveyDeatil(parmas.survey_no);
			return;
		}

		if(locations.state == 'copy' && parmas.survey_no) {
			setLocationState('copy');
			getCopyingSurveyDeatil(parmas.survey_no);
			setSurveyNo(null);
			return;
		}

		if(locations.state == 'new') {
			setLocationState('new');
			if(parmas.survey_no) {
				getCopyingSurveyDeatil(parmas.survey_no);
				setSurveyNo(null);
				return;
			} else {
				dispatch(resetCards());
			}
			
		}
	}, [])

	const getCopyingSurveyDeatil = async (surveyNo:string) => {
		console.log(locations.state, 'stateCheck')
		try {
			const response = await surveyApi.getCopyingSurvey(surveyNo);
			if (response.result && response.code === 200) {				
				const survey = response.content;
				setSurveyDetail(survey);

				if(survey.sample_yn === 'Y') {
					
					setDisease(survey.disease);
				}

				setCards(survey);
			} else {
				dispatch(resetCards())
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


	const setCards = (survey:SurveyDetail) => {
		dispatch(resetAll())
		
		
		dispatch(addExistCard({
			cardId: "TitleCard",
			cardTitle: locations.state == 'copy' ? '[Copy] ' + survey.title : (survey.title ? survey.title : ''),
			inputType: QuestionTypes.TITLE,
			contents: survey.description,
			isFocused: 'Y'
		}));

		if(survey.questionList) {
			survey.questionList.forEach(question => {
			
				const exampleList: ItemTypeProps[] = [];
	
				const cardId = question.question_no + String(Date.now());
				
				question.exampleList.forEach(example => {
				exampleList.push({
						id: cardId + example.example_no,
						text: example.example_title,
						example_title: example.example_title,
						isEtc: example.example_type === ExampleTypes.OTHER ? true : false,
					})
				});
	
				dispatch(addExistCard({
					cardId: question.question_no + String(Date.now()),
					cardTitle: question.question,
					inputType: question.question_type in QuestionTypes ? question.question_type : "WRITE",
					contents: exampleList.length === 1 ? '' : exampleList,
					isRequired: question.required_answer_yn == 'Y' ? true : false
				}));
			})
		}
		
	}


	const postNewSurvey = async (survey:SurveyPostReqBody, temp:boolean) => {
		try {
			const response = await surveyApi.postNewSurvey(survey); 
			if (response.result && response.code === 200) {
				console.log(response);

				setSurveyNo(response.content.survey_no)
				
				if(!temp) {//임시저장이 아닐경우
					dispatch(resetCards()); //localStorage에 저장된 설문내용 삭제
					navigate('/survey');//서베이 리스트로 이동
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
					navigate('/survey');//서베이 리스트로 이동
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
			// sample_yn: 'N',
			questionList: [],
			// disease: disease ? disease : ''
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
									sx={{bgcolor: isSticky ? `rgba(255, 255, 255, 0.7)` : "transparent", boxShadow: "none", height: '60px', top: '60px', p: '10px', width: '89%'}}
									ref={ref}
									
									>
										<Box display="flex" alignItems="center">
											{
												!isSticky && <Typography variant="h3" color="secondary.dark">{locationState == 'edit' ? t('survey.edit_survey') : t('survey.new_survey')}</Typography>
											}
											
											<Box display="flex" justifyContent="flex-end" gap={1} sx={{ml: 'auto'}}>
											
												{
													surveyNo &&
													<Button variant="outlined" onClick={handlePreview}>
														{t('survey.preview')}
														{/* 미리보기 */}
													</Button>
												}
												
												<Button variant="outlined" disabled={isSubmitting} onClick={() => handleButtonClick(true, formikProps)}>
													{t('survey.save_temporarily')}
													{/* 임시저장 */}
												</Button>
												<Button variant="contained" disabled={isSubmitting} onClick={() => handleButtonClick(false, formikProps)}>
													{t('common.save')}
													{/* 저장 */}
												</Button>
											</Box>
										</Box>
									
								</AppBar>
								{
									locationState === 'edit' && surveyDetail?.sample_yn == 'Y' &&
									<Card sx={{ width: '89%', mb: '10px', p: '0.5rem'}}>
										<OutlinedInput placeholder="질병(분류용)" size="small" value={disease} onChange={(e) => setDisease(e.target.value)} fullWidth />
									</Card>
								}
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

export default SurveyNew;