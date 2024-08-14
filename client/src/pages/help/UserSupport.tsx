import MainCard from "@/components/MainCard";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";

import { useFormik } from 'formik';
import * as Yup from 'yup';


const UserSupport = () => {
	const validationSchema = Yup.object({
        first_name: Yup.string().required('Please enter First Name'),
        last_name: Yup.string().required('Please enter Last Name'),
        email: Yup.string().email('Please input a valid email').required('Please enter email'),
        message: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            message: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
           
            
        },
    });

	return (
		<Grid container alignItems="center" justifyContent="center" width={1}>
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
						<form onSubmit={formik.handleSubmit}>
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
											value={formik.values.first_name}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											required
											fullWidth
											error={
												formik.touched.first_name &&
												Boolean(formik.errors.first_name)
											}
											helperText={
												formik.touched.first_name && formik.errors.first_name
											}
										/>
									</Box>

									<Box>
										<TextField
											type="text"
											name="last_name"
											placeholder="Last Name"
											label="Last Name"
											value={formik.values.last_name}
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											required
											fullWidth
											error={
												formik.touched.last_name && Boolean(formik.errors.last_name)
											}
											helperText={formik.touched.last_name && formik.errors.last_name}
										/>
									</Box>
								</Box>
								
								<TextField
									type="text"
									name="email"
									placeholder="Email"
									label="Email"
									fullWidth
									value={formik.values.email}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									required
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>

								<TextField
									type="text"
									multiline
									rows={10}
									name="message"
									placeholder="Message"
									label="Message"
									fullWidth
									value={formik.values.message}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									required
									error={formik.touched.message && Boolean(formik.errors.message)}
									helperText={formik.touched.message && formik.errors.message}
								/>
								

								
								
								<Button variant="contained" fullWidth>Send</Button>
								
							</Stack>
						</form>
					</Stack>
				</Grid>
			</MainCard>
		</Grid>
	</Grid>
	)
}

export default UserSupport;