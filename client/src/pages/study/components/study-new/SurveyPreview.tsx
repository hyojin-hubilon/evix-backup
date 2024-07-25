import { Typography } from "@mui/material";

type SurveyPreviewProps = {
	surveyNo: number
}

const SurveyPreview = ({surveyNo} : SurveyPreviewProps) => {
	return (
		<>
		<Typography>서베이 화면 개발 후 진행...</Typography>
			{ surveyNo }
		</>
	)
}

export default SurveyPreview;