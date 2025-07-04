import userApi from "@/apis/user";
import MainCard from "@/components/MainCard";
import { useConfirmation } from "@/context/ConfirmDialogContext";
import { MyProfile } from "@/types/user";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";

import { Formik, useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';


const UserSupport = () => {
	const emailAdress = 'evix-dct@evidnet.co.kr';
	// const emailAdress = 'hyojinanr@gmail.com';
	const subject = '[Support]';
	const [userData, setUserData] = useState<MyProfile | null>(null);
	const confirm = useConfirmation();
	const navigate = useNavigate();

	const [ initialValues, setInitialValues] = useState({
		first_name: '',
		last_name: '',
		email: '',
		message: '',
	},);
	
	const validationSchema = Yup.object({
        first_name: Yup.string().required('Please enter First Name'),
        last_name: Yup.string().required('Please enter Last Name'),
        email: Yup.string().email('Please input a valid email').required('Please enter email'),
        message: Yup.string().required('Please enter Message'),
    });

    

    useEffect(() => {
        getMyProfile().then((userData) => {
			if(userData) {
				setInitialValues({
					first_name:  userData.first_name,
					last_name: userData.last_name,
					email: userData.email,
					message: ''
				});
			}
		}
			
		);
    }, []);

    const getMyProfile = async () => {
        try {
            const response = await userApi.getMyProfile();
            if (response.code === 200) {
                setUserData(response.content);
				return response.content;
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    };


	const handleSubmit = (values) => {
		let bodyMessage = `mailto:${emailAdress}?subject=${subject}&body=[Form Type] : Support%0D%0A[Firstname] : ${values.first_name}%0D%0A[Lastname] : ${values.last_name}%0D%0A[Email] : ${values.email}%0D%0A[message] : ${values.message}`;
		window.location.href = bodyMessage;
		confirm({
			description: "Thanks for contacting us! We will get in touch with you shortly.",
			variant: 'info'
		}).then(
			() => {
				navigate('/help');
			}
		)
	}

	return (
		<Grid container alignItems="center" justifyContent="center" width={1}>
			{/* Help > Support Breadcrumb 추가 예정*/}
		<Grid item xs={12} sm={8} md={8} lg={6}>
			<MainCard
				sx={{
					margin: { xs: 2.5, md: 3 },
					'& > *': {
						flexGrow: 1,
						flexBasis: '50%',
					},
				}}
				content={false}
			>
				<Grid container alignItems="center" justifyContent="center" sx={{ p: '2rem' }}>
					<Stack spacing={2} width={1}>
						
						<Typography variant="h4">How can we help?</Typography>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							validateOnChange={true}
							enableReinitialize={true}
							onSubmit={(values, actions) => {
								handleSubmit(values);
								actions.setSubmitting(false);
							}}
		
						>
							{({
								errors,
								handleBlur,
								handleChange,
								handleSubmit,
								touched,
								values,
							}) => (

							<form onSubmit={handleSubmit}>
								<Stack spacing={2}>
									<Box
										sx={{
											display: 'grid',
											gap: 1,
											gridTemplateColumns: 'repeat(2, 1fr)',
										}}
									>
										<Box>
											<TextField
												type="text"
												name="first_name"
												placeholder="First Name"
												label="First Name"
												value={values.first_name}
												onBlur={handleBlur}
												onChange={handleChange}
												required
												fullWidth
												error={
													touched.first_name &&
													Boolean(errors.first_name)
												}
												helperText={
													touched.first_name && errors.first_name
												}
												disabled={true}
											/>
										</Box>

										<Box>
											<TextField
												type="text"
												name="last_name"
												placeholder="Last Name"
												label="Last Name"
												value={values.last_name}
												onBlur={handleBlur}
												onChange={handleChange}
												required
												fullWidth
												error={
													touched.last_name && Boolean(errors.last_name)
												}
												helperText={touched.last_name && errors.last_name}
												disabled={true}
											/>
										</Box>
									</Box>
									
									<TextField
										type="text"
										name="email"
										placeholder="Email"
										label="Email"
										fullWidth
										value={values.email}
										onBlur={handleBlur}
										onChange={handleChange}
										required
										error={touched.email && Boolean(errors.email)}
										helperText={touched.email && errors.email}
										disabled={true}
									/>

									<TextField
										type="text"
										multiline
										rows={10}
										name="message"
										placeholder="Message"
										label="Message"
										fullWidth
										value={values.message}
										onBlur={handleBlur}
										onChange={handleChange}
										required
										error={touched.message && Boolean(errors.message)}
										helperText={touched.message && errors.message}
									/>
									
									<Button variant="contained" fullWidth type="submit">Send</Button>
									
								</Stack>
							</form>
							)}
						</Formik>
					</Stack>
				</Grid>
			</MainCard>
		</Grid>
	</Grid>
	)
}

export default UserSupport;