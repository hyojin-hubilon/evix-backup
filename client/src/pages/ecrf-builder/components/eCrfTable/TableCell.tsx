import { dispatch } from '@/store';
import { editColumns } from '@/store/reducers/table';
import { Input } from '@mui/material';
import { Cell } from "@tanstack/react-table";
import { useEffect, useState } from 'react';

interface CustomCellProps<TData> {
	cell: Cell<TData, unknown>;
}
  
const TableCell = ({cell}:CustomCellProps<any>)  => {
	const { column, row } = cell;
	const [value, setValue] = useState({value: row.getValue(column.id), update: false});

	useEffect(() => {
		if (value.update) {
			dispatch(editColumns({type: "update_cell", columnId: column.id, rowIndex: row.index, value: String(value.value)}));
		}
	}, [value, column.id, row.index]);
	
	return column.columnDef.id !== '999999' ? (
		<div style={{width: column.columnDef.size}} className="td noselect">
			<div className="td-content">
				<Input
					value={value.value ? String(value.value) : ''}
					onChange={(e) => setValue({value: e.target.value, update: true})}
					onBlur={() => setValue({value: value.value, update: false})}
					sx={{
						'&::before' : {
							display: 'none'
						},
						'&.Mui-focused' : {
							'&::after' : {
								display: 'none'
							}
						}
					}} />
			</div>
			<div className="resizer" />
		</div>
	) : (
		<div className="td" style={{width: '40px', minWidth: '40px'}} />
	)
}

export default TableCell;