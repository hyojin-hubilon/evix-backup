import { dispatch } from "@/store";
import { IRootState } from "@/store/reducers";
import { setAlert } from "@/store/reducers/snack";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AlertSnakBar = () => {

	const { alertOpen, alertText, alertType } = useSelector((state: IRootState) => state.snack);
	const handleCloseAlert = () => {
		dispatch(setAlert({ alertOpen: false, alertText: '', alertType: '' }));
	}

	useEffect(() => {
		if(alertOpen) {
			setSanckText(alertText)
			setSnackType(alertType)
		} else {
			setTimeout(() => {
				setSanckText(alertText)
				setSnackType(alertType)
			}, 3000)
		}
	},  [alertOpen])

	
	const [ sanckText, setSanckText ] = useState('');
	const [ snackType, setSnackType] = useState('success');
	
	return (
		<Snackbar
			open={alertOpen}
			autoHideDuration={2000}
			onClose={() => handleCloseAlert()}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
		>
			<Alert
				onClose={() => handleCloseAlert()}
				severity={snackType as AlertColor}
				variant='filled'
				sx={{ width: '100%' }}
			>
				{sanckText}
			</Alert>
		</Snackbar>
	);
}


export default AlertSnakBar