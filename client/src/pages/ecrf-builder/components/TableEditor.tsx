import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import ECrfTable from "./eCrfTable/ECrfTable";
import { useSelector } from "react-redux";
import { TableStateProps } from "@/store/reducers/table";

type TableEditorType = {
	isOpen: boolean;
	handleClose: () => void;
	handleSave: (tableState) => void;
}
const TableEditor = ({isOpen, handleClose, handleSave} : TableEditorType) => {
	const { columns, data } = useSelector((state: { tables: TableStateProps }) => state.tables);

	const handleSaveTable = () => {
		console.log(columns, data);
		const columnIds: string[] = [];
		const columnNames: string[] = [];
		columns.forEach((column) => {
			if(column.id !== undefined && column.id !== '999999') {
				columnIds.push(column.id);
				columnNames.push(column.label);
			}
		});

		const rows = data.map((row) => {
			const newRow: { [key: string]: any }[] = [];
			columnIds.forEach((columnId) => {
				if(row[columnId]) {
					const value = {"TEXT" : row[columnId]};
					newRow.push(value);
				} else {
					const value = {"INPUT" : ""};
					newRow.push(value)
				}
				
			})
			return newRow;
		})

		console.log(columnIds, rows);

		

		const tableState = [...columnNames]

		// handleSave(tableState);
		// handleClose();
	}

	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth="xl">
			<DialogTitle variant="h4">
				Table Editor
			</DialogTitle>
			<DialogContent sx={{minWidth: '700px'}}>
				<ECrfTable />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
				<Button variant="contained" onClick={handleSaveTable}>Save</Button>
			</DialogActions>
		</Dialog>
	)
}

export default TableEditor;