import { createSlice } from '@reduxjs/toolkit';

export enum AlertType {
	success = 'success',
	info = 'info',
	warning = 'warning',
	error = 'error'
}

const initialState = {
    alertText: '', // Alert snackbar text
    alertOpen: false, //Alert snackbar open 여부
	alertType: 'error'
};

// ==============================|| SLICE - SNACK ||============================== //
const snack = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        setAlert(state, action) {
            state.alertText = action.payload.alertText;
			state.alertOpen = action.payload.alertOpen;
			state.alertType = action.payload.alertType;
        }
    },
});

export default snack.reducer;
export const { setAlert } = snack.actions;
