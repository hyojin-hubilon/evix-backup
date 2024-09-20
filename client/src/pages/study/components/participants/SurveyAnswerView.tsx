import surveyApi from "@/apis/survey";
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemButton, Typography, useTheme } from "@mui/material";
import { SelectedParticipantType } from "../StudyParicipations";
import CloseIcon from '@mui/icons-material/Close';
import { t } from "i18next";
import { Container } from '../../../survey/components/FormBuilder/ItemTypeSection/styles';
import { useEffect, useState } from "react";
import { ParticipantSurveyAnswerSet } from "@/types/survey";
import dayjs from 'dayjs';
import { ParticipantSurveyDetail } from "@/types/participant";
import AnswerDetailView from "./AnswerDetailView";

type SurveyAnswerViewType ={
	isOpen:boolean,
    handleClose:() => void,
    participant : SelectedParticipantType
}
const SurveyAnswerView = ({
	isOpen,
    handleClose,
    participant
} : SurveyAnswerViewType) => {

	const theme = useTheme();

	const [surveySets, setSurveySets] = useState<ParticipantSurveyAnswerSet[]>([]);
	const [surveyAnswer, setSurveyAnswer] = useState<ParticipantSurveyDetail | null>(null);

	const getSurveyAnswerSets = async (stdNo, participantNo) => {
		const response = await surveyApi.getParticipantsSurveySets(stdNo, participantNo);
		setSurveySets(response.content);
		console.log(response)
	}

	useEffect(() => {
		if(participant.stdNo && participant.participantNo) {
			getSurveyAnswerSets(participant.stdNo, participant.participantNo)
		}
	}, [participant])

	const getSurveyAnswer = async (surveySet:ParticipantSurveyAnswerSet) => {
		const response = await surveyApi.getParticipantSurveyDetail(surveySet.set_no, surveySet.survey_no, surveySet.answer_cycle, surveySet.answer_turn, surveySet.participant_no)
		if(response.code == 200 && response.content) setSurveyAnswer(response.content);
		else setSurveyAnswer(null);
		console.log(response.content)
	}

	useEffect(() => {
		setSurveyAnswer(null);
	}, [])
	
	
	return (
		<Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="survey-answer-view-title"
                aria-describedby="survey-answer-view-description"
				fullWidth={surveySets.length === 0 ? false : true}
				maxWidth={surveySets.length === 0 ? 'sm' : 'lg' }
            >
				<DialogTitle id="survey-answer-view-title" variant="h4" sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
					{t('study.view_survey_answers')}
					{/* 참여자 답변 보기 */}
					<IconButton
						size="small"
						sx={{ position: 'absolute', top: '10px', right: '10px' }}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent sx={{p:0}}>
					

					 {
					 	surveySets.length === 0 ? 
					 	
						<Box minHeight="6rem" justifyContent="center">
							<Typography textAlign="center" pt="2rem">
								{t('study.no_record_survey')}
								{/* 이 참여자의 설문참여 기록이 없습니다. */}
							</Typography>
						</Box>
						
						:
						<Grid container minWidth="lg" minHeight="20rem">
						<Grid item xs={3} sx={{borderRight: `1px solid ${theme.palette.divider}`}}>
							<List>
							{
								surveySets.map(surveySet => 
									<ListItem key={surveySet.survey_answer_no} sx={{p:0}}>
										<ListItemButton sx={{
											flexDirection: 'column',
											alignItems: 'flex-start',
											borderBottom: `1px solid ${theme.palette.divider}`
										}}
										onClick={() => getSurveyAnswer(surveySet)}
										>
											<Typography variant="h5">{surveySet.survey_title}</Typography>
											<Typography>Answer Turn : {surveySet.answer_turn}</Typography>
											<Typography>Created at : {dayjs(surveySet.created_at).format('YYYY-MM-DD')}</Typography>
										</ListItemButton>
									</ListItem>
								)
							}
							</List>
						</Grid>
						<Grid item xs={9} bgcolor={theme.palette.grey[50]}>
							<AnswerDetailView survey={surveyAnswer} />
						</Grid>
					</Grid>
					}
				</DialogContent>
		</Dialog>
	)
}

export default SurveyAnswerView;