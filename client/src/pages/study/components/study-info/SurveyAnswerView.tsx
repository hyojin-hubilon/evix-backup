import surveyApi from "@/apis/survey";
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import { SelectedParticipantType } from "../StudyParicipations";
import CloseIcon from '@mui/icons-material/Close';
import { t } from "i18next";
import { Container } from '../../../survey/components/FormBuilder/ItemTypeSection/styles';
import { useEffect, useState } from "react";
import { ParticipantSurveyAnswerSet } from "@/types/survey";
import dayjs from 'dayjs';

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

	const [surveySets, setSurveySets] = useState<ParticipantSurveyAnswerSet[]>([])

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

	
	return (
		<Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="survey-answer-view-title"
                aria-describedby="survey-answer-view-description"
				fullWidth
            >
				<DialogTitle id="survey-answer-view-title" variant="h4">
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
				<DialogContent>
					<Grid container minWidth="lg">
						<Grid item xs={3} sx={{borderRight: '1px solid #ddd'}}>
							{
								surveySets.map(surveySet => 
								<>
									{surveySet.survey_title}
									{dayjs(surveySet.created_at).format('YYYY-MM-DD')}
								</>
								)
							}
						</Grid>
						<Grid item xs={9}>

						</Grid>
					</Grid>
				</DialogContent>
		</Dialog>
	)
}

export default SurveyAnswerView;