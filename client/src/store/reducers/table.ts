import { shortId } from "@/pages/ecrf-builder/components/eCrfTable/utils";
import { createSlice, original, PayloadAction } from "@reduxjs/toolkit";
import { ColumnDef } from '@tanstack/react-table';

// Define the initial state of the table
export interface TableStateProps {
	data: any[];
	columns: ColumnDef<any, unknown>[];
}


const initicalColumns: ColumnDef<any, unknown>[] = [
	{
		id: '0',
		created: true,
		label: 'Click to edit',
		accessorKey: '0'
	},
	{
		id: '1',
		created: true,
		label: 'Column',
		accessorKey: '1'
	},
	{ 
		id:'999999',
		created: false,
		label: 'Add Column',
		accessorKey: '999999'
	}
]

console.log(initicalColumns)

const preData = [{
	'0': 'Click to edit',
	'1': '',
	'999999': ''
}];

const initialState: TableStateProps = {
	data: preData,
	columns: initicalColumns
};


type PayloadProps = {
	columnId?:string;
	dataType?: string;
	label?:string;
	rowIndex?:number;
	value?: string;
	type: string;
	focus?:boolean;
}
interface ActionProps {
	type: string;
	payload: PayloadProps;
}

export const tableSlice = createSlice({
	name: 'Tables',
	initialState,
	reducers: {
		editColumns: (state: TableStateProps, action: PayloadAction<PayloadProps>) => {
			switch (action.payload.type) {
				case "add_row":
					state.data.push({});
					break;
				
				case "update_column_header": {
					const index = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
					if (action.payload.label !== undefined) {
						state.columns[index].label = action.payload.label;
					}
					break;
				}
				case "update_cell":
					if (action.payload.rowIndex !== undefined && action.payload.columnId !== undefined) {
						state.data[action.payload.rowIndex][action.payload.columnId] = action.payload.value;
					}
					break;
				case "add_column_to_left": {
					const leftIndex = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
		
					const leftId = shortId();
					state.columns.splice(leftIndex, 0, {
						id: leftId,
						label: 'Column',
						created: action.payload.focus ? true : false,
						accessorKey: leftId
					});
					break;
				}
				case "add_column_to_right": {
					const rightIndex = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
					const rightId = shortId();
					state.columns.splice(rightIndex + 1, 0, {
						id: rightId,
						label: "Column",
						created: action.payload.focus ? true : false,
						accessorKey: rightId
					});
					break;
				}
				case "delete_column": {
					const deleteIndex = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
					state.columns.splice(deleteIndex, 1);
					break;
				}
				case "table_reset":
					state.columns = initicalColumns;
					state.data = preData;
					break;
				default:
					break;
			}
		}
	}	
});

export const {
	editColumns
} = tableSlice.actions;