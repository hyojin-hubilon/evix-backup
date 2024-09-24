import {
    Button,
    Checkbox,
    InputLabel,
    TextField,
    FormControl,
    Stack,
    Select,
    Grid,
    Typography,
    MenuItem,
    Box,
	SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import SimpleModal from '../../../components/ui/SimpleModal';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PrivacyPolicy from '@/components/modal/PrivacyPolicy';

const emailAdress = 'evix-dct@evidnet.co.kr';
// const emailAdress = 'bha4388@naver.com';
const subject = '[문의하기]';

const modalText = 'Thanks for contacting us! We will get in touch with you shortly.';
const modalButtonText = 'Home';
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

const SupportForm = () => {
    const navigate = useNavigate();
    const [formType, setFormType] = useState<string>('Support');
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [privacyPolicyIsOpen, setPrivacyPolicyIsOpen] = useState<boolean>(false);

    const validationSchema = Yup.object({
        first_name: Yup.string().required('Please enter First Name'),
        last_name: Yup.string().required('Please enter Last Name'),
        company_name: Yup.string().required('Please enter Company'),
        job_title: Yup.string().required('Please enter Job Title'),
        email: Yup.string().email('Please input a valid email').required('Please enter email'),
        phone: Yup.string()
            .matches(
                /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                'Please input a valid phone number'
            )
            .required('Please enter phone number'),
        industry: Yup.string().required('Please select Industry Segment'),
        message: Yup.string(),
        terms: Yup.boolean().oneOf(
            [true],
            'Please confirm you have agreed to Terms of Service, Privacy Policies'
        ),
    });

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            company_name: '',
            job_title: '',
            email: '',
            phone: '',
            industry: '',
            message: '',
            terms: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let bodyMessage = `mailto:${emailAdress}?subject=${subject}&body=[Form Type] : ${formType}%0D%0A[Firstname] : ${values.first_name}%0D%0A[Lastname] : ${values.last_name}%0D%0A[Company] : ${values.company_name}%0D%0A[Job Title] : ${values.job_title}%0D%0A[Email] : ${values.email}%0D%0A[Phone] : ${values.phone}%0D%0A[Industry Segment] : ${values.industry}%0D%0A[message] : ${values.message}`;
            if (formType !== 'Support') {
                bodyMessage = `mailto:${emailAdress}?subject=${subject}&body=[Form Type] : ${formType}%0D%0A[Firstname] : ${values.first_name}%0D%0A[Lastname] : ${values.last_name}%0D%0A[Company] : ${values.company_name}%0D%0A[Job Title] : ${values.job_title}%0D%0A[Email] : ${values.email}%0D%0A[Phone] : ${values.phone}%0D%0A[Industry Segment] : ${values.industry}`;
            }
            window.location.href = bodyMessage;
            setIsComplete(true);
        },
    });

    const handleFormType = (e) => {
        setFormType(e.target.value);
    };

    const handlePrivacyPolicy = () => {
        setPrivacyPolicyIsOpen((prev) => !prev);
    };

    const handleComplete = () => {
        setIsComplete((prev) => !prev);
    };

    const toLandingPage = () => {
        navigate('/');
    };

    return (
        <Grid container alignItems="center" justifyContent="center" sx={{ p: '2rem' }}>
            <Stack spacing={2} width={1}>
                {formType === 'Support' ? (
                    <Typography variant="h4">How can we help?</Typography>
                ) : (
                    <Typography variant="h4">Try a free demo!</Typography>
                )}
                <FormControl>
                    <InputLabel id="formType">Support Type</InputLabel>
                    <Select
                        name="formType"
                        defaultValue="Support"
                        onChange={(e) => handleFormType(e)}
                        fullWidth
                    >
                        <MenuItem value="Support">Support</MenuItem>
                        <MenuItem value="Book a Demo">Book a Demo</MenuItem>
                    </Select>
                </FormControl>
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
                            name="company_name"
                            placeholder="Company"
                            label="Company"
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
                            name="phone"
                            placeholder="Phone"
                            label="Phone"
                            fullWidth
                            value={formik.values.phone}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            required
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />

                        <FormControl>
                            <InputLabel id="industry">Industry Segment</InputLabel>
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

                        {formType === 'Support' && (
                            <TextField
                                name="message"
                                placeholder="Message"
                                label="Message"
                                multiline={true}
                                size="medium"
                                fullWidth
                                value={formik.values.message}
                                onChange={formik.handleChange}
                            />
                        )}
                        <FormControl>
                            <Grid container alignItems="center">
                                <Checkbox
                                    name="terms"
                                    size="medium"
                                    checked={formik.values.terms}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor="terms">
                                    I have agreed to the local and global{' '}
                                </label>
                                <label
                                    style={{
                                        color: 'blue',
                                        textDecoration: 'underline',
                                        marginLeft: '5px',
                                    }}
                                    onClick={handlePrivacyPolicy}
                                >
                                    Privacy Policies
                                </label>
                            </Grid>
                        </FormControl>

                        <SimpleModal
                            text={modalText}
                            isOpen={isComplete}
                            handleOpen={handleComplete}
                            style={modalStyle}
                            handleClick={toLandingPage}
                            buttonText={modalButtonText}
                        />
                        <Button variant="contained" type="submit">
                            Send
                        </Button>
                        <PrivacyPolicy
                            isOpen={privacyPolicyIsOpen}
                            handleClose={handlePrivacyPolicy}
                        />
                    </Stack>
                </form>
            </Stack>
        </Grid>
    );
};

export default SupportForm;
