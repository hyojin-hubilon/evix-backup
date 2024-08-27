import { dispatch } from "@/store";
import { IRootState } from "@/store/reducers";
import { setAlert } from "@/store/reducers/snack";
import { Alert, AlertColor, AlertPropsColorOverrides, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AlertSnackBar = () => {

	const { alertOpen, alertText, alertType } = useSelector((state: IRootState) => state.snack);
	const handleCloseAlert = () => {
		dispatch(setAlert({ alertOpen: false }));
	}

	useEffect(() => {
		if(alertOpen) {
			setSanckText(alertText)
			setSnackType(alertType)
		}
	},  [alertOpen]);
	
	const [ sanckText, setSanckText ] = useState('');
	const [ snackType, setSnackType] = useState<AlertColor | undefined>(undefined);
	
	return (
		<Snackbar
			open={alertOpen}
			autoHideDuration={2000}
			onClose={() => handleCloseAlert()}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
		>
			<Alert
				onClose={() => handleCloseAlert()}
				severity={snackType}
				variant='filled'
				sx={{ width: '100%' }}
			>
				{sanckText}
			</Alert>
		</Snackbar>
	);
}


export default AlertSnackBar;