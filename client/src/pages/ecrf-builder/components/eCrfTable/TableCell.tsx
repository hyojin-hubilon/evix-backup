/* eslint-disable @typescript-eslint/no-unsafe-call */
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Cell, Column, ColumnDef, ColumnDefTemplate, flexRender, Header, HeaderContext } from "@tanstack/react-table";
import { useState } from 'react';

interface CustomCellProps<TData> {
	cell: Cell<TData, unknown>;
}
  
const TableCell = ({cell}:CustomCellProps<any>)  => {
	// console.log(cell.getContext());
	const { column, row } = cell;
	const [value, setValue] = useState({value: row.getValue(column.id), update: false});
	console.log(cell, value, flexRender(cell.column.columnDef.cell, cell.getContext()));
	
	return column.columnDef.id !== '999999' ? (
		<div style={{width: column.columnDef.size}} className="td noselect">
			<div className="td-content">
				{ value.value ? String(value.value)  : '' }
			</div>
			<div className="resizer" />
		</div>
	) : (
		<div className="td" style={{width: '40px', minWidth: '40px'}} />
	)
}

export default TableCell;