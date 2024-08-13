import SurveyView from "@/pages/survey/SurveyView";
import { Box } from "@mui/material";

type SurveyPreviewProps = {
	surveyNo: number
}

const SurveyConnectPreview = ({surveyNo} : SurveyPreviewProps) => {
	return (
		<Box sx={{overflowY: 'scroll', height:'calc(100vh + 60px)', p: '1rem 1rem 1rem 0'}}>
			<SurveyView preview={true} surveyNo={surveyNo} />
		</Box>
	)
}

export default SurveyConnectPreview;