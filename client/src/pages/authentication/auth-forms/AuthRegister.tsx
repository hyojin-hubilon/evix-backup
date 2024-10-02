import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Checkbox,
    FormHelperText,
    FormControl,
    Grid,
	Select,
	InputLabel,
	MenuItem,
} from '@mui/material';
import { ErrorMessage, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router';
import { getTokenInfo } from '@/utils/Cookie';
import { IndustryType, InviteToken, SignUpReq } from '@/types/auth';
import authApi from '@/apis/auth';
import { useState } from 'react';
import PrivacyPolicy from '@/components/modal/PrivacyPolicy';
import Terms from '@/layout/LandingLayout/Footer/components/Terms';
import SimpleModal from '@/components/ui/SimpleModal';
import { useConfirmation } from '@/context/ConfirmDialogContext';


const modalText = 'Thank you for signing up. Start the evix-DCT service';
const modalButtonText = 'Log in';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token: string = location.state?.token ?? '';
    const decodedToken: InviteToken = getTokenInfo(token);
	const confirm = useConfirmation();

    const [privacyPolicyIsOpen, setPrivacyPolicyIsOpen] = useState<boolean>(false);
    const [termsIsOpen, setTermsIsOpen] = useState<boolean>(false);
    const [isComplete, setIsComplete] = useState<boolean>(false);
	const initialValues: SignUpReq = {
		password: '',
		confirm_password: '',
		mobile: '',
		country: '',
		language: '',
		company_name: '',
		job_title: '',
		industry: '',
		first_name: '',
		last_name: '',
		terms: false,
		email: decodedToken.email,
		privilege: "RESEARCHER",
		active_yn: 'Y',
		token: token
	};

	// “industry”: “CONSUMER-HEALTH”,
	// “country”: “KO_KR”,
	// “language”: “KO_KR”,


    const handlePrivacyPolicy = (): void => {
        setPrivacyPolicyIsOpen((prev) => !prev);
    };
    const handleTerms = (): void => {
        setTermsIsOpen((prev) => !prev);
    };
    const handleComplete = () => {
        setIsComplete((prev) => !prev);
    };
    const toLoginPage = () => {
        navigate("/login")
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        password: Yup.string()
            .min(8, 'Password should be of minimum 8 characters length')
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,16}$/,
                'Combination of English, numbers and special characters'
            )
            .required('Password is required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Confirm Password is required'),
        mobile: Yup.string()
            .matches(/^\d+$/, 'Please enter numbers only.')
            .required('mobile number is required'),
        country: Yup.string().required('Country is required'),
		language: Yup.string().required('Language is required'),
        company_name: Yup.string().required('Company is required'),
        job_title: Yup.string().required('Job Position is required'),
        industry: Yup.string().required('Industry is required'),
        terms: Yup.boolean().oneOf(
            [true],
            'Please confirm you have agreed to Terms of Service, Privacy Policies'
        ),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
			delete values.confirm_password;
            try {
                const response = await authApi.signUp(values);
                if (response.code === 200) {
					confirm({
						description: 'Thank you for signing up.Start the evix-DCT service',
						variant: 'info'
					})
					.then(() => { 
						navigate('/login');
					});

                    handleComplete();
                }
                if (response.code === 400) {
                    confirm({
						description : response.message,
						variant: 'info'
					})
                }
            } catch (error) {
                console.error('Error submitting the form', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="md">
            <Box>
                {/* <Typography variant="h4" gutterBottom> 
                    {decodedToken.email}
                </Typography> */}
                <Typography variant="h6" gutterBottom>
                    Welcome to evix-DCT! We're so great to you're here, let's start by signing up.
                </Typography>
                <form onSubmit={formik.handleSubmit}>
					<TextField
						label="Email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						fullWidth
						margin="normal"
						required
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						disabled
					/>

					
                    <TextField
                        label="First Name"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                    />
                    <TextField
                        label="Last Name"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirm_password"
                        type="password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.confirm_password &&
                            Boolean(formik.errors.confirm_password)
                        }
                        helperText={
                            formik.touched.confirm_password && formik.errors.confirm_password
                        }
                    />
                    <TextField
                        label="Mobile"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                        helperText={formik.touched.mobile && formik.errors.mobile}
                    />
                    {/* <TextField
                        label="Country"
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                    /> */}

					<FormControl
						fullWidth
						margin="normal"
						error={formik.touched.country && Boolean(formik.errors.country)}
					>
						<InputLabel id="country">Country *</InputLabel>
						<Select
							name="country"
							defaultValue="Country"
							fullWidth
							value={formik.values.country}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							required
							error={formik.touched.country && Boolean(formik.errors.country)}
						>
							<MenuItem value="">Country</MenuItem>
							<MenuItem value="EN_US">United States</MenuItem>
							<MenuItem value="KO_KR">Korea</MenuItem>
						</Select>
						{formik.errors.country &&  (
							<FormHelperText sx={{ color: 'error.main' }}>{formik.errors.country}</FormHelperText>
						)}
					</FormControl>
					
					
					<FormControl
						fullWidth
						margin="normal"
						error={formik.touched.language && Boolean(formik.errors.language)}
						>
						<InputLabel id="language">Language</InputLabel>
						<Select
							label="Language"
							value={formik.values.language}
							name="language"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							required
						>
							<MenuItem value="EN_US">English</MenuItem>
							<MenuItem value="KO_KR">Korean</MenuItem>
						</Select>
						{formik.errors.language &&  (
							<FormHelperText sx={{ color: 'error.main' }}>{formik.errors.language}</FormHelperText>
						)}
					</FormControl>
					
                    <TextField
                        label="Company"
                        name="company_name"
                        value={formik.values.company_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                        helperText={formik.touched.company_name && formik.errors.company_name}
                    />
                    <TextField
                        label="Job Position"
                        name="job_title"
                        value={formik.values.job_title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.job_title && Boolean(formik.errors.job_title)}
                        helperText={formik.touched.job_title && formik.errors.job_title}
                    />

					<FormControl
						fullWidth
						margin="normal"
						error={formik.touched.industry && Boolean(formik.errors.industry)}
						>
						<InputLabel id="industry">Industry</InputLabel>
						<Select
							label="Industry"
							value={formik.values.industry}
							name="industry"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							required
						>
							<MenuItem value={IndustryType.Academic}>Academic</MenuItem>
							<MenuItem value={IndustryType.CROPartners}>CRO/Partners</MenuItem>
							<MenuItem value={IndustryType.Pharmaceutical}>Pharmaceutical</MenuItem>
							<MenuItem value={IndustryType.Biotechnology}>Biotechnology</MenuItem>
							<MenuItem value={IndustryType.ConsumerHealth}>Consumer Health</MenuItem>
							<MenuItem value={IndustryType.MedicalDevices}>Medical Devices</MenuItem>
							<MenuItem value={IndustryType.DigitalTherapeutics}>Digital Therapeutics</MenuItem>
							<MenuItem value={IndustryType.etc}>ETC</MenuItem>
						</Select>
						{formik.errors.industry &&  (
							<FormHelperText sx={{ color: 'error.main' }}>{formik.errors.industry}</FormHelperText>
						)}
					</FormControl>


                    {/* <TextField
                        label="Industry"
                        name="industry"
                        value={formik.values.industry}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.industry && Boolean(formik.errors.industry)}
                        helperText={formik.touched.industry && formik.errors.industry}
                    /> */}
                    <FormControl>
                        <Grid container alignItems="center">
                            <Checkbox
                                name="terms"
                                size="medium"
                                checked={formik.values.terms}
                                onChange={formik.handleChange}
                            />
                            <label>I agree to</label>
                            <label
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                    marginLeft: '4px',
                                }}
                                onClick={handleTerms}
                            >
                                Terms of Service
                            </label>
                            <label
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                    marginLeft: '4px',
                                }}
                                onClick={handlePrivacyPolicy}
                            >
                                Privacy Policies
                            </label>
                        </Grid>
                    </FormControl>
                    {formik.touched.terms && formik.errors.terms && (
                        <FormHelperText style={{ color: 'red' }}>
                            {formik.errors.terms}
                        </FormHelperText>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={formik.isSubmitting}
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
            <Terms isOpen={termsIsOpen} handleClose={handleTerms} />
            <PrivacyPolicy isOpen={privacyPolicyIsOpen} handleClose={handlePrivacyPolicy} />
            {/* <SimpleModal
                text={modalText}
                isOpen={isComplete}
                handleOpen={handleComplete}
                style={modalStyle}
                handleClick={toLoginPage}
                buttonText={modalButtonText}
            /> */}
        </Container>
    );
};

export default SignUp;
