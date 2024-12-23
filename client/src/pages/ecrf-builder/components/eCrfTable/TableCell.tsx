/* eslint-disable @typescript-eslint/no-unsafe-call */
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Cell, Column, ColumnDef, ColumnDefTemplate, Header, HeaderContext } from "@tanstack/react-table";
import { TablePreset } from './ECrfTable';

interface CustomCellProps<TData> {
	
	cell: Cell<TData, unknown>;
	
	cellIndex: number;
}
  

const TableCell = ({cell, cellIndex}:CustomCellProps<TablePreset[]>)  => {
	// console.log(cell.getContext());
	const { column, row } = cell;
	console.log(column, row, cellIndex);
	
	return (
		<>
			<div className="th noselect">
				<div className="th-content">
					{ row.original[cellIndex].content }
				</div>
				<div className="resizer" />
			</div>
		</>
	)
}

export default TableCell;