import { Box, Button, Card, Dialog, DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import ECrfPreview from "./eCrfPreview";
import { StudyCrfListRespone } from "@/types/ecrf";
import { StudyDetail } from "@/types/study";
import { ECrfParticipant } from "@/types/ecrfParticipant";
import { DatePicker } from "@mui/x-date-pickers";
import { useTheme } from '@mui/material/styles';
import { useState } from "react";

type ECrfInputDialogType = {
	isOpen: boolean;
	handleClose: () => void;
	selectedCrf: StudyCrfListRespone | null;
	studyDetail: StudyDetail;
	participant: ECrfParticipant;
	crfPairList:StudyCrfListRespone[]
}

const ECrfInputDialog = ({isOpen, handleClose, selectedCrf, studyDetail, participant, crfPairList} : ECrfInputDialogType) => {
	const [selectedCrfForView, setSelectedCrfforView] = useState<StudyCrfListRespone | null>(selectedCrf)
	const theme = useTheme();

	const handleSelectCrf = (crfPair: StudyCrfListRespone) => {
		setSelectedCrfforView(crfPair);
	}
	
	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
			<Box p={2}>
				<Typography variant="h5" gutterBottom>New Input eCRF</Typography>

				<Box borderTop="1px solid #ddd">
					<Typography>Home {">"} Study {">"} List Participants {">"} List eCRF {">"} New Input eCRF</Typography>
					{/* 스터디 이름 */}
					<Typography variant="h5">{ studyDetail.title }</Typography>

					<Box>
						{/* Institution 이름 */}
						<Typography>{participant.allotment_agency_name}</Typography>
						{/* 참가자 이름 */}
						<Typography>{participant.full_name}</Typography>
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
							{/* Date선택 */}
							<Card sx={{p:1, mb:1}}>
								Inspect(Visit) Date <DatePicker />
							</Card>
							{
								selectedCrfForView &&
								<ECrfPreview crfNo={selectedCrfForView.crf_no}/>
							}
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleClose} variant="contained">Save</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ECrfInputDialog;