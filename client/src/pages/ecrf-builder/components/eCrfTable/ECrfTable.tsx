import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, TableOptions, Table, ColumnDef, Column } from '@tanstack/react-table';
import { useMemo, useState } from "react";
import TableHeader from "./TableHeader";
import { useDispatch, useSelector } from "react-redux";
import { TableStateProps } from "@/store/reducers/table";
import TableCell from './TableCell';
declare module '@tanstack/react-table' {
	interface ColumnDefBase<TData, TValue> {
		id: string | number,
		created:boolean,
		label:string, 
		dataType: 'Text' | 'Number' | 'Add',
		accessorFn?: (row: TData) => TValue;
	}
}

export interface TablePreset {
	type:"Text" | "Number" | "Add";
	content : string | number;
}


const ECrfTable = () => {
	const dispatch = useDispatch();
	
	const { columns, data } = useSelector((state: { tables: TableStateProps }) => state.tables);
	
	const table: Table<TablePreset[]> = useReactTable({
		columns,
		data,
		defaultColumn: {
			size: 200,
			minSize: 50,
			maxSize: 400,
			// header: TableHeader,
		},
		getCoreRowModel: getCoreRowModel(),
		
	})

	console.log(data)
	
	return (
		<>
		<div className="tableBorder">
			<div className="eCrfTable">
				{table.getHeaderGroups().map((headerGroup, i) => {
					return (
					<div className="tr" key={i}>
						{
							headerGroup.headers.map((header, index) => <TableHeader header={header} key={index} />)						
						}
					</div>
				)})}

				{table.getRowModel().rows.map(row => (
					<div key={row.id} className="tr">
						{
							row.getVisibleCells().map((cell, i)=> <TableCell cell={cell} key={i} cellIndex={i} />)
						}
					</div>
				))}				
			</div>
		</div>
		</>
	);
}

export default ECrfTable;