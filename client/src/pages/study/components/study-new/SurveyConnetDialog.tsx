import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, OutlinedInput, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { grey } from "@ant-design/colors";
import SurveyListTable from "./SurveyListTable";
import { useState } from "react";
import { RegistrableSurvey } from "@/apis/survey";



const SurveyConnectDialog = ({isOpen, handleClose}) => {
	const [surveyList, setSurveyList] = useState<RegistrableSurvey[]>([]);


	const handleSelectedSurvey = (selectedSurvey:RegistrableSurvey[]) => {
		console.log(selectedSurvey);
	}


	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="survey-connect-title"
			aria-describedby="survey-connect-description"
			maxWidth="sm"
		>
				<DialogTitle id="survey-connect-title" variant="h4" width={600}>
					Survey 연결
					<IconButton 
						size="small"
						sx={{position: 'absolute', top: "10px", right: '10px'}}
						onClick={handleClose}
						>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>						
					<Typography id="survey-connect-description" sx={{
						'span' : {
							display: 'block'
						}
					}}>
						<span>*1개 이상의 Survey를 연결해주세요.</span>
						<span>*Survey가 여러개일 경우, 설정 순서에 따라 진행됩니다.</span>
					</Typography>
					<Box sx={{borderRadius: "0.5rem", backgroundColor: grey[100]}} display="flex" flexDirection="column" gap={1} p="1rem">
						<OutlinedInput placeholder="Survey 제목" />
						<Button variant="contained">검색</Button>
						<Button variant="outlined">전체보기</Button>
					</Box>
					<Box mt={1}>
						<SurveyListTable surveyList={surveyList} handleSelected={(e) => handleSelectedSurvey(e)}/>
					</Box>


				</DialogContent>
			</Dialog>
	)
}

export default SurveyConnectDialog;