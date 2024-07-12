import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, List, OutlinedInput, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SurveyListTable, { SurveyAdd } from "./SurveyListTable";
import { useState } from "react";
import { RegistrableSurvey } from "@/apis/survey";
import DraggableList from "./DraggableList";
import { DropResult } from '@hello-pangea/dnd';
import { reorder } from "@/utils/helper";



const SurveyConnectDialog = ({isOpen, handleClose}) => {
	const theme = useTheme();
	const { grey } = theme.palette;
	const [surveyList, setSurveyList] = useState<RegistrableSurvey[]>([
		{ survey_no:1, title:'Project_atopic dermatitis_2024', updated_date:'2024-06-05'},
		{ survey_no:2, title:'forwomen_atopic dermatitis_2024', updated_date:'2024-05-02'},
		{ survey_no:3, title:'Project_diva_seoul', updated_date:'2024-04-28'},
		{ survey_no:4, title:'Survey_abc_20240125', updated_date:'2024-04-25'}
	]);

	const [selectedSurvey, setSelectedSurvey] = useState<RegistrableSurvey[]>([]);


	const handleSelectedSurvey = (addSurvey:SurveyAdd) => {
		if(addSurvey.type === 'add') {
			setSelectedSurvey([ ...selectedSurvey, addSurvey.survey]);
		} else {
			const newItems = selectedSurvey.filter(survey => survey.survey_no !== addSurvey.survey.survey_no);
			setSelectedSurvey(newItems);
		}
		
		console.log(selectedSurvey);
	}



	const onDragEnd = ({ destination, source }: DropResult) => {
		// dropped outside the list
		if (!destination || !selectedSurvey) return;
	
		const newItems = reorder(selectedSurvey, source.index, destination.index);
	
		setSelectedSurvey(newItems);
	};
	


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
						<span>1개 이상의 Survey를 연결해주세요.</span>
						<span>Survey가 여러개일 경우, 설정 순서에 따라 진행됩니다.</span>
					</Typography>
					<Grid container gap={1} mt="1rem" mb="1rem">
						<Grid item xs={7.8}>
							<FormControl size="small" fullWidth>
								<OutlinedInput placeholder="Survey 제목" />
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<Box display="flex" gap={1}>
								<Button variant="contained" sx={{flexGrow:1}}>검색</Button>
								<Button variant="outlined"  sx={{flexGrow:1}}>전체보기</Button>
							</Box>
						</Grid>
						
					</Grid>
					{
						selectedSurvey.length > 0 &&
						<Box sx={{borderRadius: "5px", backgroundColor: grey[100], p: '0.5rem'}}>
							<DraggableList items={selectedSurvey} onDragEnd={onDragEnd} />
						</Box>
					}
					
					<Box mt={1}>
						<SurveyListTable surveyList={surveyList} handleSelected={(e) => handleSelectedSurvey(e)}/>
					</Box>


				</DialogContent>
			</Dialog>
	)
}

export default SurveyConnectDialog;