import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, TableOptions, Table, ColumnDef, Column } from '@tanstack/react-table';
import { useMemo, useState } from "react";
import TableHeader from "./TableHeader";
import { useDispatch, useSelector } from "react-redux";
import { TableStateProps } from "@/store/reducers/table";
declare module '@tanstack/react-table' {
	interface ColumnDefBase<TData, TValue> {
		id: string;
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
	
	const { columns, data } = useSelector((state: { tables: TableStateProps }) => ({
		columns: state.tables.columns,
		data: state.tables.data
	}));
	
	
	console.log(columns, data)
	

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
	console.log(table);
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

				<div className="tr">
					
				</div>
			</div>
		</div>
		</>
	);
}

export default ECrfTable;