import { StudyForParticipant } from "@/types/participant";
import { Box } from "@mui/material";
import * as S from '../styles';
import dayjs from "dayjs";

type ParticipantStudyItemType = {
	study : StudyForParticipant
}


const ParticipantStudyItem = ({study}: ParticipantStudyItemType) => {
	const studyStatusKr = { //임시 스테이터스
		"NEED_EIC" : "전자서명필요",
		"IN_PROGRESS" : "참여중",
		"DONE" : "참여완료" 
	}

	const surveyCycle = { 
		"WEEK" : "주",
		"MONTH" : "월"
	}

	
	return (
		<Box p="20px 25px" borderBottom="1px solid #E0E5E9" position="relative">
			<Box display="flex" height="21px" alignContent="center" gap="10px">
				<S.StudyStatus studyStatus={study.status}>
					{ studyStatusKr[study.status] }
				</S.StudyStatus>
				<S.StudyTitle>
					{ study.title }
				</S.StudyTitle>
			</Box>
			<Box pt="14px">
				<S.StudyDetail>참여기간: { study.start_date ? dayjs(study.start_date).format('YYYY.MM.DD') : '' } ~ { study.end_date ? dayjs(study.end_date).format('YYYY.MM.DD') : '' } </S.StudyDetail>
				<S.StudyDetail>참여기관: { study.organization }</S.StudyDetail>
			</Box>
			<Box display="flex" alignItems="center" gap="5px" mt="15px">
				<S.StudyTags>{ surveyCycle[study.survey_cycle] } {study.number_in_cycle} 회</S.StudyTags>
				<S.StudyTags>{ study.number_of_participation == 0 ? "참여대기중" : `총 ${study.number_of_participation}회 참여`}</S.StudyTags>
			</Box>
			<Box sx={{
				position: 'absolute',
				right: '35px',
				top: '50%',
				width: '21px',
				height: '21px',
				marginTop: '-10px'
			}}>
				<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8.85712 6L13.1428 10.2857L8.85712 14.5714" stroke="#000001" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M10.2857 19.5714C15.4141 19.5714 19.5714 15.4141 19.5714 10.2857C19.5714 5.15736 15.4141 1 10.2857 1C5.15736 1 1 5.15736 1 10.2857C1 15.4141 5.15736 19.5714 10.2857 19.5714Z" stroke="#000001" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</Box>
		</Box>
	)
}

export default ParticipantStudyItem;