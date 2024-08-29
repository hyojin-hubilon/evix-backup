import { Box, Card, Typography } from "@mui/material";
import MdppHeader from "./components/MdppHeader";
import * as S from './styles';
import ParticipantStudyItem from "./components/ParicipantStudyItem";
import {  SurveyForParticipant } from "@/types/participant";
import ParticipantSurveyItem from "./components/ParticipantSurveyItem";

const tempSurveys : SurveyForParticipant[] = [
	{
		total_count: 5,
		title:'효과성 확인 설문',
		survey_cycle: 'WEEK',
		number_in_cycle: 1,
		number_of_participation: 5,
		tags: ['펜터민', '효과성', '증상확인']
	},
	{
		total_count: 5,
		title:'복용중단 후 증상 확인',
		survey_cycle: 'WEEK',
		number_in_cycle: 1,
		number_of_participation: 5,
		tags: ['펜터민', '복용중단', '증상확인']
	}
]
const ParticipantSurveys = () => {
	return (
		<Box sx={{bgcolor: 'white', minHeight: '100vh', pt: '22px'}}>
			<MdppHeader title="펜터민 효과성 임상연구" backBtn></MdppHeader>			
			<Box p="24px 23px">
				<S.BlueBox>
					<Typography variant="h5">안내 사항</Typography>
					<S.CommonText>
						펜터민 효과성 임상연구를 위해 처방받은 용량과 방법을 지켜서 복용해 주시고, 설문 주기에 따라참여 부탁드립니다. 
					</S.CommonText>
				</S.BlueBox>
			</Box>

			<Box p="0 23px">
				{
					tempSurveys.map((survey, index) => 
						<ParticipantSurveyItem survey={survey} key={index} />
					)
				}
			</Box>
			
	 	</Box>
	)
}

export default ParticipantSurveys;


