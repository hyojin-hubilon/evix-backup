import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
		<Dialog open={isOpen} onClose={handleClose} maxWidth="lg">
			<DialogTitle>
				Table Editor
			</DialogTitle>
			<DialogContent sx={{minWidth: '700px'}}>
			<DataGrid
				columns={columns}
				rows={rows}
				autoHeight
				// disableColumnFilter
				// disableColumnSelector
				// disableDensitySelector
				// onRowClick={handleSelectOne}
				// slots={{ toolbar: CustomToolbar }}
				// sx={{
				// 	border: '1px solid #ddd',
				// 	[`& .${gridClasses.virtualScrollerContent}`]: {
				// 		borderTop: `1px solid ${theme.palette.grey[500]}`,
				// 	},
				// 	[`& .${gridClasses.row}`]: {
				// 		borderBottom: `1px solid ${theme.palette.grey[400]}`,
				// 	},
				// 	bgcolor: 'white',
				// 	p: '1rem',
				// }}
			/>
			</DialogContent>
			<DialogActions>
				<Button>Cancel</Button>
				<Button>Save</Button>
				
			</DialogActions>
		</Dialog>
	)
}

export default TableEditor;