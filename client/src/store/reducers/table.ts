import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the table
interface TableState {
	data: any[];
	loading: boolean;
	error: string | null;
}

const initialState: TableState = {
	data: [],
	loading: false,
	error: null,
};

// Define action types
const FETCH_TABLE_DATA_REQUEST = 'FETCH_TABLE_DATA_REQUEST';
const FETCH_TABLE_DATA_SUCCESS = 'FETCH_TABLE_DATA_SUCCESS';
const FETCH_TABLE_DATA_FAILURE = 'FETCH_TABLE_DATA_FAILURE';

// Define the reducer
const tableReducer = (state = initialState, action): TableState => {
	switch (action.type) {
		case FETCH_TABLE_DATA_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_TABLE_DATA_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
			};
		case FETCH_TABLE_DATA_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default tableReducer;