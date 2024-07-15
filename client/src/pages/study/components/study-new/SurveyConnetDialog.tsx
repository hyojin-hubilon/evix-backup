import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, Hidden, IconButton, List, OutlinedInput, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SurveyListTable, { SurveyAdd } from "./SurveyListTable";
import { useState } from "react";
import { RegistrableSurvey } from "@/apis/survey";
import DraggableList from "./DraggableList";
import { DropResult } from '@hello-pangea/dnd';
import { reorder } from "@/utils/helper";
import SurveyPreview from "./SurveyPreview";



const SurveyConnectDialog = ({isOpen, handleClose}) => {
	const theme = useTheme();
	const { grey } = theme.palette;
	const [ searchText, setSearchText ] = useState("");
	const [ previewSurveyNo, setPreviewSurveyNo ] = useState<number>();

	const [surveyList, setSurveyList] = useState<RegistrableSurvey[]>([
		{ survey_no:1, title:'Project_atopic dermatitis_2024', updated_date:'2024-06-05'},
		{ survey_no:2, title:'forwomen_atopic dermatitis_2024', updated_date:'2024-05-02'},
		{ survey_no:3, title:'Project_diva_seoul', updated_date:'2024-04-28'},
		{ survey_no:4, title:'Survey_abc_20240125', updated_date:'2024-04-25'}
	]);

	const [ searchedResult, setSearchedResult ] = useState<RegistrableSurvey[]>(surveyList);

	const [selectedSurvey, setSelectedSurvey] = useState<RegistrableSurvey[]>([]);


	const handleSelectedSurvey = (addSurvey:SurveyAdd) => {
		if(addSurvey.type === 'add') {
			const newSurveyItem = {...addSurvey.survey, frequency: 'month', times: 1};
			setSelectedSurvey([...selectedSurvey, newSurveyItem]);
		} else {
			const newItems = selectedSurvey.filter(survey => survey.survey_no !== addSurvey.survey.survey_no);
			setSelectedSurvey(newItems);
		}
	}



	const onDragEnd = ({ destination, source }: DropResult) => {
		// dropped outside the list
		if (!destination || !selectedSurvey) return;
	
		const newItems = reorder(selectedSurvey, source.index, destination.index);
	
		setSelectedSurvey(newItems);
	};

	const handleChangeSurveyItem = (items: RegistrableSurvey[]) => {
		setSelectedSurvey(items); 
	}

	const handleConnectSurvey = () => {
		console.log(selectedSurvey);
	}

	const handleSearchSurvey = (e) => {
		e.preventDefault();
		const searched = surveyList.filter(survey => survey.title.toLowerCase().includes(searchText.toLowerCase()));
		setSearchedResult(searched);
	}

	const handleSeeAll = () => {
		setSearchText('');
		setSearchedResult(surveyList);
	}

	const handleSelectPreview = (surveyNo) => {
		console.log(surveyNo);
		setPreviewSurveyNo(surveyNo);
	}
	


	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="survey-connect-title"
			aria-describedby="survey-connect-description"
			maxWidth="lg"
			scroll="body"
		>	
			<Grid container width={previewSurveyNo ? 1100 : 730}>
				<Grid item xs={previewSurveyNo ? 8 : 12}>
				<DialogTitle id="survey-connect-title" variant="h4">
					Survey 연결
					<IconButton 
						size="small"
						sx={{position: 'absolute', top: "10px", left: '680px'}}
						onClick={handleClose}
						>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent sx={{overflow: 'hidden'}}>						
					<Typography id="survey-connect-description" sx={{
						'span' : {
							display: 'block'
						}
					}}>
						<span>1개 이상의 Survey를 연결해주세요.</span>
						<span>Survey가 여러개일 경우, 설정 순서에 따라 진행됩니다.</span>
					</Typography>
					<form onSubmit={handleSearchSurvey}>
						<Box display="flex" mt="1rem" mb="1rem" gap={1}>
							<FormControl size="small" sx={{width: "400px"}}>
								<OutlinedInput placeholder="Survey 제목" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
							</FormControl>
							<Button variant="contained" sx={{flexGrow:1}} type="submit" onClick={handleSearchSurvey}>검색</Button>
							<Button variant="outlined"  sx={{flexGrow:1}} onClick={handleSeeAll}>전체보기</Button>
						</Box>
					</form>
					
					{
						selectedSurvey.length > 0 &&
						<Box display="flex" flexDirection="column" gap="0.5rem" alignItems="center">
							<Box sx={{
								borderRadius: "5px",
								backgroundColor: grey[100],
								p: '0.5rem',
								'ul': { p: 0 },
								width: 1
							}}>
								<DraggableList items={selectedSurvey} onDragEnd={onDragEnd} itemChanged={handleChangeSurveyItem} />
							</Box>

							<Button onClick={handleConnectSurvey} variant="contained" sx={{width: "10rem"}}>연결하기</Button>
						</Box>
					}
					
					<Box mt={1}>
						<SurveyListTable surveyList={searchedResult} selectedSurvey={selectedSurvey} handleSelected={(e) => handleSelectedSurvey(e)} handleSelectPreview={(studyNo)=>handleSelectPreview(studyNo)}/>
					</Box>


				</DialogContent>
				</Grid>
				<Grid item xs={previewSurveyNo ? 4 : 0}>
				{
					previewSurveyNo && <SurveyPreview surveyNo={previewSurveyNo} />
				}
				</Grid>
			</Grid>
		</Dialog>
	)
}

export default SurveyConnectDialog;