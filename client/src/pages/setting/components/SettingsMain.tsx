import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Grid,
    Paper,
    Stack,
    TextField,
    Button,
    Typography,
    Switch,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
} from '@mui/material';
import { MyProfile } from '@/types/auth';
import authApi from '@/apis/auth';

const SettingsMain: React.FC<{ myProfile: MyProfile }> = ({ myProfile }) => {
    const [invitationCount, setInvitationCount] = useState<number>(0);
    const [studyCount, setStudyCount] = useState<number>(0);
    const [surveyCount, setServeyCount] = useState<number>(0);

    const [emailAlerts, setEmailAlerts] = useState(true);
    const [language, setLanguage] = useState('English');

    const handleChangePassword = async () => {
        try {
            const responseData = authApi.requestChangePassword(myProfile.email);
        } catch (error) {
            //alert(error.message);
        }
    }

    const validationSchema = Yup.object({
        mobile: Yup.string().required('Phone number is required'),
        country: Yup.string().required('Country is required'),
        company_name: Yup.string().required('Company is required'),
        job_title: Yup.string().required('Job position is required'),
    });

    const formik = useFormik({
        initialValues: {
            first_name: myProfile.first_name,
            last_name: myProfile.last_name,
            email: myProfile.email,
            password: '********',
            mobile: myProfile.mobile,
            country: myProfile.country,
            company_name: myProfile.company_name,
            job_title: myProfile.job_title,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Grid
            container
            spacing={3}
            sx={{ padding: '2rem', backgroundColor: '#f0f2f5', minHeight: '100vh' }}
            justifyContent="center"
        >
            <Box sx={{ width: '100%', maxWidth: 800 }}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Settings
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Paper
                            elevation={4}
                            sx={{
                                padding: '1.5rem',
                                textAlign: 'center',
                                borderRadius: '8px',
                            }}
                        >
                            <Typography variant="h6" color="primary">
                                내가 받은 Study 초대
                            </Typography>
                            <Typography variant="h2" color="secondary">
                                {invitationCount}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper
                            elevation={4}
                            sx={{
                                padding: '1.5rem',
                                textAlign: 'center',
                                borderRadius: '8px',
                            }}
                        >
                            <Typography variant="h6" color="primary">
                                My Study
                            </Typography>
                            <Typography variant="h2" color="secondary">
                                {studyCount}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper
                            elevation={4}
                            sx={{
                                padding: '1.5rem',
                                textAlign: 'center',
                                borderRadius: '8px',
                            }}
                        >
                            <Typography variant="h6" color="primary">
                                My Survey
                            </Typography>
                            <Typography variant="h2" color="secondary">
                                {surveyCount}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Paper
                        elevation={4}
                        sx={{
                            padding: '1.5rem',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            marginTop: '1rem',
                        }}
                    >
                        <Typography variant="h6" color="primary">
                            계정정보
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2} sx={{ marginTop: '1rem' }}>
                                <Box display="flex" alignItems="center">
                                    <Box
                                        sx={{
                                            width: '80px',
                                            height: '80px',
                                            backgroundColor: '#bdbdbd',
                                            borderRadius: '50%',
                                            marginRight: '1rem',
                                            backgroundImage: `url(${myProfile.profile_image_url})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                    <Button variant="outlined" color="primary">
                                        사진 변경
                                    </Button>
                                </Box>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={`${formik.values.first_name} ${formik.values.last_name}`}
                                    disabled
                                    fullWidth
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formik.values.email}
                                    fullWidth
                                    disabled
                                />
                                <Box display="flex" alignItems="center">
                                    <TextField
                                        type="password"
                                        label="Password"
                                        name="password"
                                        value={formik.values.password}
                                        fullWidth
                                        disabled
                                        InputProps={{ style: { color: '#000000' } }}
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{ marginLeft: '1rem' }}
                                        color="secondary"
                                    >
                                        변경
                                    </Button>
                                </Box>
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                    helperText={formik.touched.mobile && formik.errors.mobile}
                                    fullWidth
                                />
                                <TextField
                                    label="Country"
                                    name="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.country && Boolean(formik.errors.country)}
                                    helperText={formik.touched.country && formik.errors.country}
                                    fullWidth
                                />
                                <TextField
                                    label="Company"
                                    name="company"
                                    value={formik.values.company_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.company_name &&
                                        Boolean(formik.errors.company_name)
                                    }
                                    helperText={
                                        formik.touched.company_name && formik.errors.company_name
                                    }
                                    fullWidth
                                />
                                <TextField
                                    label="Job Position"
                                    name="jobPosition"
                                    value={formik.values.job_title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.job_title && Boolean(formik.errors.job_title)
                                    }
                                    helperText={formik.touched.job_title && formik.errors.job_title}
                                    fullWidth
                                />
                            </Stack>
                            <Typography variant="h6" color="primary">
                                알림 설정
                            </Typography>
                            <FormControlLabel
                                label="이메일 알림"
                                control={
                                    <Switch
                                        checked={emailAlerts}
                                        onChange={() => setEmailAlerts(!emailAlerts)}
                                        name="emailAlerts"
                                        color="primary"
                                    />
                                }
                            />
                            <Typography variant="h6" color="primary">
                                언어 설정
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    name="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="English"
                                        control={<Radio color="primary" />}
                                        label="English"
                                    />
                                    <FormControlLabel
                                        value="Korean"
                                        control={<Radio color="primary" />}
                                        label="Korean"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                sx={{ marginTop: '1rem' }}
                            >
                                수정 완료
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Box>
        </Grid>
    );
};

export default SettingsMain;
