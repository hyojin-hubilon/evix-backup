import { ColumnDef, createColumnHelper, useReactTable, getCoreRowModel, flexRender, TableOptions, Table } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import TableHeader from "./TableHeader";

declare module '@tanstack/react-table' {
    interface Column<TData, TValue> { //ColumnDef..?
		id: string | number;
		created:boolean,
		accessor:number;
		label:string, 
		dataType: 'Text' | 'Number'
    }
}

export type ColumData = {
	id: number;
	created:boolean,
	accessor:number;
	label:string, 
	dataType: 'Text' | 'Number'
}

export type TablePreset = {
	column1: ColumData;
	column2: ColumData;	
};


const ECrfTable = () => {
	const [data, setData] = useState<TablePreset[]>([])

	

	const columns = useMemo<ColumnDef<TablePreset, unknown>[]>(() => [
		{
			id: 'column1',
			accessorKey: 'column1',
			dataType: 'Text',
			label: 'Col 1',
			header: (props) => { return <TableHeader {...props}/> }
			//cell: info => info.getValue(),
		},
		{
			id: 'column2',
			accessorKey: 'column2',
			dataType: 'Text',
			label: 'Col 2',
			accessorFn: row => row.column2,
			//cell: info => info.getValue(),
		}
	],[])

	const table: Table<TablePreset> = useReactTable({
		columns,
		data,
		defaultColumn: {
			size: 200,
			minSize: 50,
			maxSize: 400,
			// header: TableHeader,
		},
		getCoreRowModel: getCoreRowModel()
	})
	console.log(table);
	return (
		<>
		<div>
			<div>
			{table.getHeaderGroups().map((headerGroup, i) => {
				console.log(headerGroup)
				return (
				<div className="tr" key={i}>
					{
						headerGroup.headers.map((header, index) => {
							
							return (
							<div key={index}>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</div>
						)})	
					}
				</div>
			)})}
			</div>
		</div>
		</>
	);
}

export default ECrfTable;