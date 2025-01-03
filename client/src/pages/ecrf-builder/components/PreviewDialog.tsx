import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import ECrfPreview from "./eCrfPreview";

type PreivewDialogType = {
	isOpen: boolean;
	handleClose: () => void;
	selectedCrf: number | null;
}

const PreivewDialog = ({isOpen, handleClose, selectedCrf} : PreivewDialogType) => {
	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
			<Box p={2}>
				<Typography variant="h5"> eCRF Design Preview</Typography>
				<Typography variant="body1">You can preview your design.</Typography>
			</Box>
			<DialogContent sx={{minWidth: '800px', backgroundColor: '#f2f2f2'}} >
				<ECrfPreview crfNo={selectedCrf}/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}

export default PreivewDialog;