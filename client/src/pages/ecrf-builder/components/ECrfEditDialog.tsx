import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import ECrfPreview from "./eCrfPreview";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import dayjs, { Dayjs } from "dayjs";
import { InputCrfDetail } from "@/types/eCrfInput";
import { StudyDetail } from "@/types/study";
import { ECrfParticipant } from "@/types/ecrfParticipant";

type ECrfEditDialogType = {
	isOpen: boolean;
	handleClose: () => void;
	studyDetail: StudyDetail;
	participant: ECrfParticipant;
	selectedCrfInput: InputCrfDetail | null
}

const ECrfEditDialog = ({isOpen, handleClose, studyDetail, participant, selectedCrfInput} : ECrfEditDialogType) => {
	
	const theme = useTheme();
	const [saveClick, setSaveClick] = useState<boolean>(false);

	const handleSave = () => {
		setSaveClick(true);
		setTimeout(() => {
			setSaveClick(false);
		}, 100)
	}
	
	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
			<Box p={2}>
				<Typography variant="h5" gutterBottom>Edit Input eCRF</Typography>

				<Box borderTop="1px solid #ddd" display="flex" flexDirection={"column"} gap={1} p="10px 0 0 0">
					<Typography variant="h6">Home {">"} Study {">"} List Participants {">"} List eCRF {">"} Edit Input eCRF</Typography>
					
					{/* 스터디 이름 */}
					<Typography variant="h4">{ studyDetail.title }</Typography>

					<Box display="flex" gap={2}>
						{/* Institution 이름 */}
						<Box display="flex" gap={.5}>
							<ApartmentIcon />
							<Typography>{participant.allotment_agency_name}</Typography>
						</Box>
						{/* 참가자 이름 */}
						<Box display="flex" gap={.5}>
							<EmojiPeopleIcon />
							<Typography>{participant.full_name}</Typography>
						</Box>
					</Box>

				</Box>
			</Box>
			
			<DialogContent sx={{minWidth: '900px', backgroundColor: '#f2f2f2', p: 0}} >
				<Box p={2}>					
					{
						selectedCrfInput &&
						<ECrfPreview selectedCrfInput={selectedCrfInput} saveClick={saveClick}/>
						// crfNo={selectedCrfInput.crf_no} stdNo={selectedCrfInput.std_no} pairNo={selectedCrfInput.pair_no} participantNo={selectedCrfInput.std_crf_participant_no}
					}
				</Box>
			</DialogContent>
			<DialogActions sx={{flexGrow: 1}}>
				<Button onClick={handleClose} variant="outlined" color="error" sx={{width:'50%'}}>Cancel</Button>
				<Button onClick={handleSave} variant="contained" sx={{width:'50%'}}>Save</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ECrfEditDialog;