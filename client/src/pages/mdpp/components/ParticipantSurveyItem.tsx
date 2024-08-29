import { ParticipantStudyDetail, ParticipantSurveySet, SurveyForParticipant } from "@/types/participant";
import { Box, Button } from "@mui/material";
import * as S from '../styles';

type ParticipantSurveyItemType = {
	survey : ParticipantSurveySet,
	study: ParticipantStudyDetail
}


const ParticipantSurveyItem = ({survey, study}: ParticipantSurveyItemType) => {
	const surveyCycle = { 
		"DAILY": "일",
		"WEEKLY" : "주",
		"MONTHLY" : "월"
	}

	
	return (
		<>
		{
			survey.surveyList.map((surveySet, index) => {
				return (
					<Box p="20px 18px" border="1px solid #E0E5E9" position="relative" borderRadius="4px" mb="24px" key={index}>
						<Box display="flex" height="21px" alignContent="center" gap="10px">
							<S.SurveyStatus>
								총 { surveySet.number_answer }회 참여
							</S.SurveyStatus>
							<S.StudyTitle>
								{ surveySet.title }
							</S.StudyTitle>
						</Box>
						<Box display="flex" justifyContent="space-between" alignItems="flex-end">
							<Box>
								<S.SurveyDetail>{ surveyCycle[survey.survey_cycle] } { survey.number_in_cycle }회, {surveySet.survey_cnt}회 참여 </S.SurveyDetail>
								<S.SurveyTags>
									{
										study.drug_manufacturer_name && 
										<span><>#</>{study.drug_manufacturer_name} </span>
									}
									{
										study.disease && 
										<span><>#</>{study.disease} </span>
									}
									
								</S.SurveyTags>
							</Box>
							<Button variant="outlined" color="secondary">
								참여하기
							</Button>
						</Box>
					</Box>
				)
			})
		}
		
		</>
	)
}

export default ParticipantSurveyItem;