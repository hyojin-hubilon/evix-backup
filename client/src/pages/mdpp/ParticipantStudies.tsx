import { Box, Typography } from "@mui/material";
import MdppHeader from "./components/MdppHeader";

const tempStudies = [
	{
		status:'NEED_EIC',//전자서명필요
		title: '에버액스 디지털 치료기기 사...',
		start_date: null,
		end_date: '2024.12.31',
		organization: '고대구로병원',
		survey_cycle: 'WEEK',
		number_in_cycle: 1,
		number_of_participation: 0//0일때 = 참여 대기중
	},
	{
		status:'IN_PROGRESS', //참여중
		title: '펜터민 효과성 임상연구',
		start_date: null,
		end_date: '2024.12.31',
		organization: '서울대학교병원',
		survey_cycle: 'WEEK',
		number_in_cycle: 1,
		number_of_participation: 3
	},
	{
		status:'DONE', //참여완료
		title: '펜터민 효과성 임상연구',
		start_date: null,
		end_date: '2024.12.31',
		organization: '서울대학교병원',
		survey_cycle: 'WEEK',
		number_in_cycle: 1,
		number_of_participation: 3
	}
	
]
const ParticipantStudies = () => {
	return (
		<Box sx={{bgcolor: 'white', minHeight: '100vh', pt: '22px'}}>
			<MdppHeader title="임상연구 설문 참여" backBtn></MdppHeader>			
			<Typography p="23px">
				임상연구에 참여해 주셔서 감사드립니다. 참여하고 있는 연구를 확인하고, 설문을 진행해 주세요.
			</Typography>
			<Box pt="21px">

			</Box>
	 	</Box>
	)
}

export default ParticipantStudies;


