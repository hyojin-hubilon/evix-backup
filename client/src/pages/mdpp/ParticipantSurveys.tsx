import { Box, Card, Typography } from "@mui/material";
import MdppHeader from "./components/MdppHeader";
import * as S from './styles';
import ParticipantStudyItem from "./components/ParicipantStudyItem";
import {  ParticipantStudyDetail, ParticipantSurveySet, SurveyForParticipant, SurveySetList } from "@/types/participant";
import ParticipantSurveyItem from "./components/ParticipantSurveyItem";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import participantStudyApi from "@/apis/participantStudy";

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
	const { stdNo } = useParams();
	const [ surveySets, setSurveySets ] = useState<ParticipantSurveySet[]>([]);
	const [ studyDetail, setStudyDetail ] = useState<ParticipantStudyDetail>({} as ParticipantStudyDetail);
	const navigate = useNavigate();

	const fetchSurveyDetail = async () => {
		try {
            const response = await participantStudyApi.studyDetail(stdNo);
            if (response.content) {
                setStudyDetail(response.content);
            }
        } catch (error) {
            console.error('Failed to get participants study list', error);
        }
    };
	

	const fetchSurveySet = async () => {
        try {
            const response = await participantStudyApi.studySurveyList(stdNo);
            if (response.content) {
                setSurveySets(response.content);
            }
        } catch (error) {
            console.error('Failed to get participants study list', error);
        }
    };


	useEffect(() => {
		fetchSurveyDetail();
		fetchSurveySet();
	}, []);

	const handleSelectSurvey = (surveySet:SurveySetList) => {
		console.log(studyDetail)
		if(studyDetail.signature_eic_name) {
			navigate(`/mdpp/survey/${surveySet.set_no}/${surveySet.survey_no}/${surveySet.answer_cycle}/${surveySet.answer_turn}`)
		} else {
			navigate('/mdpp/eic')
		}
		
	}

	return (
		<Box sx={{bgcolor: 'white', minHeight: '100vh', pt: '22px'}}>
			<MdppHeader title={studyDetail?.title} backBtn></MdppHeader>			
			<Box p="24px 23px">
				<S.BlueBox>
					<Typography variant="h5">안내 사항</Typography>
					<S.CommonText>
						{studyDetail?.description}
					</S.CommonText>
				</S.BlueBox>
			</Box>

			<Box p="0 23px">
				{
					surveySets.map((survey, index) => 
						<ParticipantSurveyItem survey={survey} key={index} study={studyDetail} selectSurvey={handleSelectSurvey}/>
					)
				}
			</Box>
			
	 	</Box>
	)
}

export default ParticipantSurveys;


