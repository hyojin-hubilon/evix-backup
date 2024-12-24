import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ECrfTable from "./eCrfTable/ECrfTable";

type TableEditorType = {
	isOpen: boolean;
	handleClose: () => void
}
const TableEditor = ({isOpen, handleClose} : TableEditorType) => {
	const columns:GridColDef[] = [{
		field: '1'
	},{
		field: '2'
	},{
		field: '3'
	},{
		field: '4'
	},{
		field: '5'
	}];

	const rows = []

	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
			<DialogTitle>
				Table Editor
			</DialogTitle>
			<DialogContent sx={{minWidth: '700px'}}>
			<ECrfTable />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button>Save</Button>
				
			</DialogActions>
		</Dialog>
	)
}

export default TableEditor;