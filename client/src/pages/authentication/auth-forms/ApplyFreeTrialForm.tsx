import { TextField, Button, Grid, Stack, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { t } from 'i18next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import authApi from '@/apis/auth';


const ApplyFreeTrialForm = () => {
    const navigate = useNavigate();
	const confirm = useConfirmation();

	const validationSchema = Yup.object({
        first_name: Yup.string().required('Please enter First Name'),
        last_name: Yup.string().required('Please enter Last Name'),
        company_name: Yup.string().required('Please enter Company'),
        job_title: Yup.string().required('Please enter Job Title'),
        email: Yup.string().email('Please input a valid email').required('Please enter email'),
        mobile: Yup.string()
            .matches(/^[0-9]*$/, 'Please enter numbers only.')
            .required('Please enter mobile number'),
        industry: Yup.string().required('Please select Industry Segment'),
		country: Yup.string().required('Please select Language'),
        message: Yup.string(),
    });


	const handleApplyFreeTrial = async (values) => {
        const response = await authApi.applyFreeTrial(values);
        if (response.code === 200) {
			confirm({
				description : t('auth.free_trial_applied'),
				variant : 'info'
			}).then(() => navigate('/'));
        }
    };


    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            company_name: '',
            job_title: '',
            email: '',
            mobile: '',
            industry: '',
            message: '',
			country: '',
            terms: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
			console.log(values)
            handleApplyFreeTrial(values)
        },
    });

    return (
        <Grid container alignItems="center" justifyContent="center" sx={{ p: '2rem' }}>
            <Stack spacing={2} width={1}>
                <Typography variant="h4" gutterBottom>
                    Apply for Free Trial
                </Typography>
				<form onSubmit={formik.handleSubmit}>
					<Stack spacing={2}>
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
							name="mobile"
							placeholder="Mobile"
							label="Mobile"
							fullWidth
							value={formik.values.mobile}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							required
							error={formik.touched.mobile && Boolean(formik.errors.mobile)}
							helperText={formik.touched.mobile && formik.errors.mobile}
						/>
						<TextField
							type="text"
							name="company_name"
							placeholder="Company Name"
							label="Company Name"
							fullWidth
							value={formik.values.company_name}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							required
							error={
								formik.touched.company_name && Boolean(formik.errors.company_name)
							}
							helperText={formik.touched.company_name && formik.errors.company_name}
						/>
						<TextField
							type="text"
							name="job_title"
							placeholder="Job Title"
							label="Job Title"
							fullWidth
							value={formik.values.job_title}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							required
							error={formik.touched.job_title && Boolean(formik.errors.job_title)}
							helperText={formik.touched.job_title && formik.errors.job_title}
						/>
						<FormControl>
							<InputLabel id="industry">Industry Segment *</InputLabel>
							<Select
								name="industry"
								defaultValue="Industry Segment"
								fullWidth
								value={formik.values.industry}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								required
								error={formik.touched.industry && Boolean(formik.errors.industry)}
							>
								<MenuItem value="">Industry Segment</MenuItem>
								<MenuItem value="Sponsor">Sponsor</MenuItem>
								<MenuItem value="CRO">CRO</MenuItem>
								<MenuItem value="Pre-Clinical">Pre-Clinical</MenuItem>
								<MenuItem value="Biotechnology R%26D">Biotechnology R&D</MenuItem>
								<MenuItem value="Medical School">Medical School</MenuItem>
								<MenuItem value="Independent Research Site">
									Independent Research Site
								</MenuItem>
								<MenuItem value="Hospital or Healthcare System">
									Hospital or Healthcare System
								</MenuItem>
								<MenuItem value="Government">Government</MenuItem>
								<MenuItem value="Other">Other</MenuItem>
							</Select>
						</FormControl>

						<FormControl>
							<InputLabel id="country">Language *</InputLabel>
							<Select
								name="country"
								defaultValue="Language"
								fullWidth
								value={formik.values.country}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								required
								error={formik.touched.country && Boolean(formik.errors.country)}
							>
								<MenuItem value="">Language</MenuItem>
								<MenuItem value="EN_US">English</MenuItem>
								<MenuItem value="KO_KR">Korean</MenuItem>
							</Select>

						</FormControl>
						
						<TextField
							type="text"
							name="message"
							placeholder="Message"
							label="Message"
							fullWidth
							value={formik.values.message}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							error={formik.touched.message && Boolean(formik.errors.message)}
							helperText={formik.touched.message && formik.errors.message}
						/>
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Submit
						</Button>
					</Stack>
                </form>
            </Stack>
        </Grid>
    );
};

export default ApplyFreeTrialForm;
