import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Button, MenuItem, Select, Stack, useTheme, Box, TextField, FormHelperText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { t } from "i18next";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ECrfParticipant, ECrfParticipantPutReqBody, ECrfParticipantReqBody } from "@/types/ecrfParticipant";
import ecrfParticipantApi from '@/apis/eCrfParticipant';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Typography } from "antd";
import { useEffect } from "react";

type AddParticipantType ={
	isOpen:boolean,
    handleClose:() => void,
	stdNo:number,
    participant : ECrfParticipant | null
}
const AddParticipant = ({
	isOpen,
    handleClose,
	stdNo,
    participant
} : AddParticipantType) => {

	const theme = useTheme();

	const validationSchema = Yup.object({
        full_name: Yup.string().required('Full Name is required'),
        gender: Yup.string().required('Gender is required'),
		birthday: Yup.string().required('Birthday is required')
    });


	const formik = useFormik({
        initialValues: {
            full_name: '',
            gender: '',
            birthday: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
			console.log(values)
            handleSaveParticipant(values)
        },
    });

	const handleSelectBirthday = (e: Dayjs | null) => {
		formik.setFieldValue('birthday', dayjs(e).format('YYYYMMDD'));
	}


	const handleSaveParticipant = async (values: { full_name: string; gender: string; birthday: string; }) => {
		if(participant?.std_crf_participant_no) {

			const editParticipant: ECrfParticipantPutReqBody = {
				std_crf_participant_no: participant.std_crf_participant_no,
				std_no: stdNo,
				full_name: values.full_name,
				gender: values.gender,
				birthday: dayjs(values.birthday).format('YYYYMMDD')
			}
	
			const response = await ecrfParticipantApi.putECrfParticipant(editParticipant);
			if(response.result) {
				handleClose();
				formik.resetForm();
			}
			
		} else {
			const newParticipant: ECrfParticipantReqBody = {
				std_no: stdNo,
				full_name: values.full_name,
				gender: values.gender,
				birthday: dayjs(values.birthday).format('YYYYMMDD')
			}
	
			const response = await ecrfParticipantApi.postECrfParticipant(newParticipant);
			if(response.result) {
				handleClose();
				formik.resetForm();
			}
		}
		
	}

	useEffect(() => {
		if(participant) {
			formik.setValues({
				full_name: participant.full_name,
				gender: participant.gender,
				birthday: participant.birthday
			});
		} else {
			formik.resetForm();
		}
	}, [participant])


	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="add-participant-title"
			aria-describedby="add-participant-description"
			aria-hidden="false"
			fullWidth
            >
				<DialogTitle id="add-participant-title" variant="h4" sx={{borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems:'center', gap: 1}}>
					{t('study.add_participant')}
					<Typography>(<span style={{color:'red'}}>*</span> Required)</Typography>
					{/* 참여자 추가 */}
					<IconButton
						size="small"
						sx={{ position: 'absolute', top: '10px', right: '10px' }}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<form onSubmit={formik.handleSubmit}>
				<DialogContent>
				
					<Stack>
						<FormControl
							margin="dense">
							<label id="fullName">Full Name <span style={{color:'red'}}>*</span></label>
							<TextField
								id="full_name"
								type="text"
								value={formik.values.full_name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.full_name && Boolean(formik.errors.full_name )}
								helperText={formik.touched.full_name  && formik.errors.full_name}
								name="full_name"
								placeholder="Full Name"
								fullWidth
							/>
						</FormControl>
						<FormControl
							fullWidth
							margin="dense"
						>
							<label id="gender">Gender <span style={{color:'red'}}>*</span></label>
							<Select
								name="gender"
								fullWidth
								value={formik.values.gender}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.gender && Boolean(formik.errors.gender)}
								displayEmpty
							>
								<MenuItem value="">Select</MenuItem>
								<MenuItem value="female">Female</MenuItem>
								<MenuItem value="male">Male</MenuItem>
							</Select>
							{formik.errors.gender &&  (
								<FormHelperText sx={{ color: 'error.main' }}>{formik.errors.gender}</FormHelperText>
							)}
						</FormControl>
						<FormControl
							fullWidth
							margin="dense"
						>
							<label id="birthday">Birthday <span style={{color:'red'}}>*</span></label>
							<DatePicker
								format="YYYY/MM/DD"
								maxDate={dayjs()}
								value={formik.values.birthday ? dayjs(formik.values.birthday) : null}
								onChange={(e) => handleSelectBirthday(e)}
							/>
							{formik.errors.birthday &&  (
								<FormHelperText sx={{ color: 'error.main' }}>{formik.errors.birthday}</FormHelperText>
							)}
						</FormControl>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Box display="flex" gap={1} mr="1rem" mb="1rem">
						<Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
						<Button variant="contained" type="submit">Save</Button>
					</Box>
				</DialogActions>
				</form>
		</Dialog>
	)
}

export default AddParticipant;