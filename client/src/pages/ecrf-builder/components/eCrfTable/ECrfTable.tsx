import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, TableOptions, Table, ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import TableHeader from "./TableHeader";
declare module '@tanstack/react-table' {
	interface ColumnDefBase<TData, TValue> {
		id: string | number;
		created:boolean,
		label:string, 
		dataType: 'Text' | 'Number' | 'Add'
	}
}

export type TablePreset = {
	column1: string;
	column2: string;	
};


const ECrfTable = () => {
	const [data, setData] = useState<TablePreset[]>([])

	const columns = useMemo<ColumnDef<TablePreset, unknown>[]>(() => [
		{
			id: 'column1',
			created: true,
			dataType: 'Text',
			label: 'Col 1',
		},
		{
			id: 'column2',
			created: true,
			dataType: 'Number',
			label: 'Col 2',
		},
		{ id: '999999',
			created: false,
			dataType: 'Add',
			label: 'Add Column'
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
			</div>
		</div>
		</>
	);
}

export default ECrfTable;