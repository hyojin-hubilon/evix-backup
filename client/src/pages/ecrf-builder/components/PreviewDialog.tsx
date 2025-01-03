import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ECrfPreview from "./eCrfPreview";

type PreivewDialogType = {
	isOpen: boolean;
	handleClose: () => void;
	selectedCrf: number | null;
}

const PreivewDialog = ({isOpen, handleClose, selectedCrf} : PreivewDialogType) => {
	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
			<DialogTitle variant="h4">
				eCRF Design Preview
			</DialogTitle>
			<DialogContent sx={{minWidth: '700px'}}>
				<ECrfPreview />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
}

export default PreivewDialog;