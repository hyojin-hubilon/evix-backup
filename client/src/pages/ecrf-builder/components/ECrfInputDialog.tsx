import { Box, Button, Card, Dialog, DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import ECrfPreview from "./eCrfPreview";
import { StudyCrfListRespone } from "@/types/ecrf";
import { StudyDetail } from "@/types/study";
import { ECrfParticipant } from "@/types/ecrfParticipant";
import { DatePicker } from "@mui/x-date-pickers";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import dayjs, { Dayjs } from "dayjs";
import { setIn } from "formik";
import { useConfirmation } from "@/context/ConfirmDialogContext";

type ECrfInputDialogType = {
	isOpen: boolean;
	handleClose: () => void;
	selectedCrf: StudyCrfListRespone | null;
	studyDetail: StudyDetail;
	participant: ECrfParticipant;
	crfPairList:StudyCrfListRespone[]
}

const ECrfInputDialog = ({isOpen, handleClose, selectedCrf, studyDetail, participant, crfPairList} : ECrfInputDialogType) => {
	const confirm = useConfirmation();

	const [selectedCrfForView, setSelectedCrfforView] = useState<StudyCrfListRespone | null>(null);
	const [saveClick, setSaveClick] = useState<boolean>(false);
	
	const theme = useTheme();

	const handleSelectCrf = (crfPair: StudyCrfListRespone) => {
		setSelectedCrfforView(crfPair);
	}

	const handleSave = () => {
		setSaveClick(true);
		setTimeout(() => {
			setSaveClick(false);
		}, 100)
	}

	const handleInputClose = () => {
		confirm({
			description: "창을 닫을 경우 입력한 내용이 사라집니다.",
			variant: 'danger'
		}).then(() => {
			handleClose()
		});
	}

	useEffect(() => {
		setSelectedCrfforView(selectedCrf);
	}, [selectedCrf]);

	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
			<Box p={2}>
				<Typography variant="h5" gutterBottom>New Input eCRF</Typography>

				<Box borderTop="1px solid #ddd" display="flex" flexDirection={"column"} gap={1} p="10px 0 0 0">
					<Typography variant="h6">Home {">"} Study {">"} List Participants {">"} List eCRF {">"} New Input eCRF</Typography>
					
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
			
			<DialogContent sx={{minWidth: '1400px', backgroundColor: '#f2f2f2', p: 0}} >
				
				<Grid container>
					<Grid item xs={2.5} sx={{borderRight: '1px solid #ddd'}}>
						{/* CRF Pair List */}
						<Box display="flex" flexDirection="column" gap={1} p={2}>
						{
							crfPairList && crfPairList.length > 0 &&
							crfPairList.map((crfPair, index) => 
								<Button 
									key={index}
									onClick={() => handleSelectCrf(crfPair)}
									sx={{
										background: 'white',
										boxShadow: theme.shadows[1]
									}}>
									{crfPair.crf_title}
								</Button>
							)
						}
						</Box>
					</Grid>
					<Grid item xs={9.5} p={0}>
						<Box p={2}>
							
							{
								selectedCrfForView &&
								<ECrfPreview crfNo={selectedCrfForView.crf_no} stdNo={studyDetail.std_no} pairNo={selectedCrf?.pair_no} participantNo={participant.std_crf_participant_no} saveClick={saveClick} handleCloseDialog={handleClose} />
							}
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions sx={{flexGrow: 1}}>
				<Button onClick={handleInputClose} variant="outlined" color="error" sx={{width:'50%'}}>Cancel</Button>
				<Button onClick={handleSave} variant="contained" sx={{width:'50%'}}>Save</Button>
				
			</DialogActions>
		</Dialog>
	);
}

export default ECrfInputDialog;