import surveyApi from "@/apis/survey";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { SelectedParticipantType } from "../StudyParicipations";
import CloseIcon from '@mui/icons-material/Close';
import { t } from "i18next";

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

	const getSurveyAnswers = async (stdNo, participantNo) => {
		const response = await surveyApi.getParticipantsSurveyAnswerList(stdNo, participantNo);
		console.log(response)
	}

	
	return (
		<Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="survey-answer-view-title"
                aria-describedby="survey-answer-view-description"
                maxWidth="lg"
                scroll="body"
            >
				<DialogTitle id="survey-answer-view-title" variant="h4">
							{t('study.view_survey_answers')}
                            {/* 참여자 답변 보기 */}
                            <IconButton
                                size="small"
                                sx={{ position: 'absolute', top: '10px', left: '680px' }}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
		</Dialog>
	)
}

export default SurveyAnswerView;