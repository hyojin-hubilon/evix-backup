import { TablePreset } from "@/pages/ecrf-builder/components/eCrfTable/ECrfTable";
import { shortId } from "@/pages/ecrf-builder/components/eCrfTable/utils";
import { createSlice, original, PayloadAction } from "@reduxjs/toolkit";
import { ColumnDef, Column } from '@tanstack/react-table';
import { focus } from '@/store/reducers/survey';
import { WritableDraft } from 'immer';

// Define the initial state of the table
export interface TableStateProps {
	skipReset:boolean;
	data: TablePreset[][];
	columns: ColumnDef<TablePreset[], unknown>[];
}


const initicalColumns: ColumnDef<TablePreset[], unknown>[] = [
	{
		id: '0',
		created: true,
		dataType: 'Text',
		label: 'Col 1',
		
	},
	{
		id: '1',
		created: true,
		dataType: 'Number',
		label: 'Col 2',
		
	},
	{ 
		id:'999999',
		created: false,
		dataType: 'Add',
		label: 'Add Column',
		
	}
]

const PreData: TablePreset[][] = [
	[
		{
			type: "Text",
			content: "1"
		},
		{
			type: "Number",
			content: 2
		}
	]
];

const initialState: TableStateProps = {
	skipReset: false,
	data: PreData,
	columns: initicalColumns
};


type PayloadProps ={
	columnId:string;
	dataType: string;
	label:string;
	rowIndex:number;
	value: string;
	type: string;
	focus:boolean;
}
interface ActionProps {
	type: string;
	payload: PayloadProps;
}

export const tableSlice = createSlice({
	name: 'Tables',
	initialState,
	reducers: {
		editColumns: (state: WritableDraft<TableStateProps>, action: PayloadAction<PayloadProps>) => {
			switch (action.payload.type) {
				case "add_row":
					state.skipReset = true;
					state.data.push([] as TablePreset[]);
					break;
					
				case "update_column_type": {
					const typeIndex = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
		
					switch (action.payload.dataType) {
						case "Number":
							if (state.columns[typeIndex].dataType !== "Number") {
								state.columns[typeIndex].dataType = action.payload.dataType;
								state.data.forEach((row) => {
									row[action.payload.columnId] = isNaN(Number(row[action.payload.columnId]))
										? ""
										: Number.parseInt(String(row[action.payload.columnId]));
								});
							}
							break;
						case "Text":
							if (state.columns[typeIndex].dataType !== "Text") {
								state.skipReset = true;
								state.columns[typeIndex].dataType = action.payload.dataType;
								state.data.forEach((row) => {
									row[action.payload.columnId] = row[action.payload.columnId] + "";
								});
							}
							break;
						default:
							break;
					}
					break;
				}
				case "update_column_header": {
					const index = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
					state.skipReset = true;
					state.columns[index].label = action.payload.label;
					break;
				}
				case "update_cell":
					state.skipReset = true;
					state.data[action.payload.rowIndex][action.payload.columnId] = action.payload.value;
					break;
				case "add_column_to_left": {
					const leftIndex = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
		
					const leftId = shortId();
					state.skipReset = true;
					state.columns.splice(leftIndex, 0, {
						id: leftId,
						label: "Column",
						dataType: "Text",
						created: action.payload.focus && true,
					});
					break;
				}
				case "add_column_to_right": {
					const rightIndex = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
					const rightId = shortId();
					state.skipReset = true;
					state.columns.splice(rightIndex + 1, 0, {
						id: rightId,
						label: "Column",
						dataType: "Text",
						created: action.payload.focus && true,
					});
					break;
				}
				case "delete_column": {
					const deleteIndex = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
					state.skipReset = true;
					state.columns.splice(deleteIndex, 1);
					break;
				}
				case "enable_reset":
					state.skipReset = false;
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