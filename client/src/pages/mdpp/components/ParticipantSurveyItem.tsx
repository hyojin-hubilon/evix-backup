import { SurveyForParticipant } from "@/types/participant";
import { Box, Button } from "@mui/material";
import * as S from '../styles';

type ParticipantSurveyItemType = {
	survey : SurveyForParticipant
}


const ParticipantSurveyItem = ({survey}: ParticipantSurveyItemType) => {
	const surveyCycle = { 
		"WEEK" : "주",
		"MONTH" : "월"
	}

	
	return (
		<Box p="20px 18px" border="1px solid #E0E5E9" position="relative" borderRadius="4px" mb="24px">
			<Box display="flex" height="21px" alignContent="center" gap="10px">
				<S.SurveyStatus>
					총 { survey.total_count }회 참여
				</S.SurveyStatus>
				<S.StudyTitle>
					{ survey.title }
				</S.StudyTitle>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="flex-end">
				<Box>
					<S.SurveyDetail>{ surveyCycle[survey.survey_cycle] } { survey.number_in_cycle }회, {survey.total_count}회 참여 </S.SurveyDetail>
					<S.SurveyTags>{ survey.tags?.map(tag => `#${tag} `)}</S.SurveyTags>
				</Box>
				<Button variant="outlined" color="secondary">
					참여하기
				</Button>
			</Box>
		</Box>
	)
}

export default ParticipantSurveyItem;