import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import ECrfTable from "./eCrfTable/ECrfTable";
import { useSelector } from "react-redux";
import { editColumns, TableStateProps } from "@/store/reducers/table";
import { dispatch } from "@/store";
import { useEffect } from "react";

type TableEditorType = {
	isOpen: boolean;
	handleClose: () => void;
	handleSave: (tableState) => void;
	tableData: {[x:number] : string}[][] | null;
}
const TableEditor = ({isOpen, handleClose, handleSave, tableData} : TableEditorType) => {
	const { columns, data } = useSelector((state: { tables: TableStateProps }) => state.tables);

	const handleSaveTable = () => {
		console.log(columns, data);
		const columnIds: string[] = [];
		const columnNames: { [key: string]: string }[] = [];
		columns.forEach((column) => {
			if(column.id !== undefined && column.id !== '999999') {
				columnIds.push(column.id);
				columnNames.push({"COLUMN" : column.label});
			}
		});

		const rows = data.map((row: { [key: string]: string }) => {
			const newRow: { [key: string]: string }[] = [];
			columnIds.forEach((columnId:string) => {
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

		const tableState = [[...columnNames], ...rows]
		console.log(tableState);
		handleSave(tableState);
		handleClose();
	}

	useEffect(() => {
		if(tableData) {
			dispatch(editColumns({type: "table_data_set", columns: tableData[0], data: tableData.slice(1)}));
		} else {
			dispatch(editColumns({type: "table_reset"}));
		}
	}, [tableData])

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