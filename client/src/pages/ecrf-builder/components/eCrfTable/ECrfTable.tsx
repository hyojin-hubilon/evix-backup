import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, TableOptions, Table, ColumnDef, Column, CellContext } from '@tanstack/react-table';
import { useMemo, useState } from "react";
import TableHeader from "./TableHeader";
import { useDispatch, useSelector } from "react-redux";
import { editColumns, TableStateProps } from "@/store/reducers/table";
import TableCell from './TableCell';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

declare module '@tanstack/react-table' {
	interface ColumnDefBase<TData, TValue> {
		id: string | number,
		created:boolean,
		label:string, 
		accessorFn?: (row: TData) => TValue;
	}
}


const ECrfTable = () => {
	const dispatch = useDispatch();
	
	const { columns, data } = useSelector((state: { tables: TableStateProps }) => state.tables);
	
	const table: Table<any> = useReactTable({
		columns,
		data,
		defaultColumn: {
			size: 200,
			minSize: 50,
			maxSize: 400
		},
		getCoreRowModel: getCoreRowModel(),
	});
	
	return (
		<>
		<div className="tableBorder">
			<div className="eCrfTable">
				{table.getHeaderGroups().map((headerGroup, i) => {
					return (
					<div className="thead tr" key={i}>
						{
							headerGroup.headers.map((header, index) => <TableHeader header={header} key={index} />)						
						}
					</div>
				)})}

				{table.getRowModel().rows.map(row => (
					<div key={row.id} className="tr">
						{
							row.getVisibleCells().map((cell, i)=> <TableCell cell={cell} key={i} />)
						}
					</div>
				))}
				<div className="tr add-row" onClick={() => dispatch(editColumns({type: "add_row", focus: false}))}>
					<span className='svg-icon svg-gray' style={{marginRight: 4}}>
						<AddRoundedIcon />	
					</span>
					New
				</div>
			</div>
		</div>
		</>
	);
}

export default ECrfTable;