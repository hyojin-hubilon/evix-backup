import { TablePreset } from "@/pages/ecrf-builder/components/eCrfTable/ECrfTable";
import { shortId } from "@/pages/ecrf-builder/components/eCrfTable/utils";
import { createSlice, original } from "@reduxjs/toolkit";
import { ColumnDef, Column } from '@tanstack/react-table';
import { focus } from '@/store/reducers/survey';

// Define the initial state of the table
interface TableState {
	skipReset:boolean;
	data: TablePreset[];
	columns: ColumnDef<TablePreset[], unknown>[];
}


const initicalColumns: ColumnDef<TablePreset[]>[] = [
	{
		id: '0',
		created: true,
		dataType: 'Text',
		label: 'Col 1',
		accessorFn: (originalRow: TablePreset[], index: number) => {
			const row = originalRow[index];
			return JSON.stringify(row);
		}
	},
	{
		id: '1',
		created: true,
		dataType: 'Number',
		label: 'Col 2',
		accessorFn: (originalRow: TablePreset[], index: number) => {
			const row = originalRow[index];
			return JSON.stringify(row);
		}
	},
	{ 
		id:'999999',
		created: false,
		dataType: 'Add',
		label: 'Add Column',
		accessorFn: (originalRow: TablePreset[], index: number) => {
			const row = originalRow[index];
			return JSON.stringify(row);
		}
	}
]

const initialState: TableState = {
	skipReset: false,
	data: [] as TablePreset[],
	columns: initicalColumns
};


type PayloadProps ={
	columnId:string;
	dataType: string;
	label:string;
	rowIndex:number;
	value: string;
	focus:boolean;
}
interface ActionProps {
	type: string;
	payload: PayloadProps;
}

export const tableSlice = createSlice({
	name: 'Columns',
	initialState,
	reducers: {
		editColumns: (state:TableState, action: ActionProps) => {
			switch (action.type) {
				case "add_row":
					return {
						...state,
						skipReset: true,
						data: [...state.data, {}]
					};
					
				case "update_column_type": {
					const typeIndex = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);

					switch (action.payload.dataType) {
						case "Number":
							if (state.columns[typeIndex].dataType === "Number") {
								return state;
							} else {
								return {
									...state,
									columns: [
										...state.columns.slice(0, typeIndex),
										{ ...state.columns[typeIndex], dataType: action.payload.dataType },
										...state.columns.slice(typeIndex + 1, state.columns.length)
									],
									data: state.data.map((row) => ({
										...row,
										[action.payload.columnId]: isNaN(Number(row[action.payload.columnId]))
										? ""
										: Number.parseInt(String(row[action.payload.columnId]))
									}))
								};
							}
						case "Text":
							if (state.columns[typeIndex].dataType === "Text") {
								return state;
							} else {
								return {
									...state,
									skipReset: true,
									columns: [
										...state.columns.slice(0, typeIndex),
										{ ...state.columns[typeIndex], dataType: action.payload.dataType },
										...state.columns.slice(typeIndex + 1, state.columns.length)
									],
									data: state.data.map((row) => ({
										...row,
										[action.payload.columnId]: row[action.payload.columnId] + ""
									}))
								};
							}
							default:
								return state;
						}
					}
			case "update_column_header": {
				{
					const index = state.columns.findIndex(
						(column) => column.id === action.payload.columnId
					);
					return {
						...state,
						skipReset: true,
						columns: [
							...state.columns.slice(0, index),
							{ ...state.columns[index], label: action.payload.label },
							...state.columns.slice(index + 1, state.columns.length)
						]
					};
				}
			}
			case "update_cell":
				return {
				...state,
				skipReset: true,
				data: state.data.map((row, index) => {
					if (index === action.payload.rowIndex) {
						return {
							...state.data[action.payload.rowIndex],
							[action.payload.columnId]: action.payload.value
						};
					}
					return row;
				})
				};
			case "add_column_to_left": {
				const leftIndex = state.columns.findIndex(
					(column) => column.id === action.payload.columnId
				);

				const leftId = shortId();
				return {
				...state,
				skipReset: true,
				columns: [
					...state.columns.slice(0, leftIndex),
					{
						id: leftId,
						label: "Column",
						accessor: leftId,
						dataType: "text",
						created: action.payload.focus && true,
						options: []
					},
					...state.columns.slice(leftIndex, state.columns.length)
				]
				};
			}
			case "add_column_to_right": {
				const rightIndex = state.columns.findIndex(
					(column) => column.id === action.payload.columnId
				);
				const rightId = shortId();
				return {
					...state,
					skipReset: true,
					columns: [
						...state.columns.slice(0, rightIndex + 1),
						{
							id: rightId,
							label: "Column",
							accessor: rightId,
							dataType: "text",
							created: action.payload.focus && true,
							options: []
						},
						...state.columns.slice(rightIndex + 1, state.columns.length)
					]
				};
			}
			case "delete_column": {
				const deleteIndex = state.columns.findIndex(
					(column) => column.id === action.payload.columnId
				);
				return {
					...state,
					skipReset: true,
					columns: [
						...state.columns.slice(0, deleteIndex),
						...state.columns.slice(deleteIndex + 1, state.columns.length)
					]
				};
			}
				
			case "enable_reset":
				return {
				...state,
				skipReset: false
				};
			default:
				return state;
			}
		}
	}	
});

export const {
	editColumns
  } = tableSlice.actions;