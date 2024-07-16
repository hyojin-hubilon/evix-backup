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
} from '@mui/material';
import { MyProfile, UpdateUserData } from '@/types/user';
import { ResCommonError } from '@/apis/axios-common';
import userApi from '@/apis/user';
import { useNavigate } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import SettingChangePasswordForm from './SettingChangePasswordForm';

const SettingsMain: React.FC<{ myProfile: MyProfile }> = ({ myProfile }) => {
    const initialValues = {
        first_name: myProfile.first_name,
        last_name: myProfile.last_name,
        email: myProfile.email,
        password: '********',
        mobile: myProfile.mobile,
        country: myProfile.country,
        company_name: myProfile.company_name,
        job_title: myProfile.job_title,
        user_no: myProfile.user_no,
        industry: myProfile.industry,
        privilege: myProfile.privilege,
    };
    const navigate = useNavigate();

    const [profileImageUrl, setProfileImageUrl] = useState<string>(myProfile.profile_image_url);
    const [emailAlerts, setEmailAlerts] = useState<boolean>(myProfile.email_notification_yn === 'Y');
    const [language, setLanguage] = useState<string>(myProfile.language);
    const [changePasswordModal, setChangePasswordModal] = useState<boolean>(false);

    const handleImageUrl = (url: string) => {
        setProfileImageUrl(() => url);
    };

    const validationSchema = Yup.object({
        mobile: Yup.string().required('전화번호를 입력해주세요'),
        country: Yup.string().required('국가를 입력해주세요.'),
        company_name: Yup.string().required('회사를 입력해주세요.'),
        job_title: Yup.string().required('직업을 입력해주세요.'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: ({ user_no, mobile, country, company_name, job_title, industry, privilege }) => {
            const requestData: UpdateUserData = {
                user_no,
                mobile,
                country,
                company_name,
                job_title,
                industry,
                privilege,
                active_yn: 'Y',
                email_notification_yn: emailAlerts ? 'Y' : 'N',
                language,
            };
            handleUpdateUser(requestData);
        },
    });

    const handleChangePasswordModal = () => {
        setChangePasswordModal((prev) => !prev);
    };

    const handleUpdateUser = async (props: UpdateUserData) => {
        try {
            const { content } = await userApi.updateUser(props);
            if (content) {
                alert('수정이 완료되었습니다.');
            }
            return content;
        } catch (error) {
            if (error instanceof ResCommonError) {
                alert(error.message);
            }
        }
    };

    const handleMovePage = (url: string) => {
        navigate(url);
    };

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
                            <Typography
                                variant="h2"
                                color="secondary"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleMovePage('/study')}
                            >
                                {myProfile.unauthorized_number}
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
                            <Typography
                                variant="h2"
                                color="secondary"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleMovePage('/study')}
                            >
                                {myProfile.study_number}
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
                            <Typography
                                variant="h2"
                                color="secondary"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => handleMovePage('/survey')}
                            >
                                {myProfile.survey_number}
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
                                    <ProfileImage
                                        imageUrl={profileImageUrl}
                                        handleImageUrl={handleImageUrl}
                                    />
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
                                        onClick={handleChangePasswordModal}
                                    >
                                        변경
                                    </Button>
                                </Box>
                                <TextField
                                    label="Phone"
                                    name="mobile"
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
                                    name="company_name"
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
                                    name="job_title"
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
                                        value="EN_US"
                                        control={<Radio color="primary" />}
                                        label="English"
                                    />
                                    <FormControlLabel
                                        value="KO_KR"
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
                        {changePasswordModal && (
                            <SettingChangePasswordForm user_no={myProfile.user_no} isOpen={changePasswordModal} handleClose={handleChangePasswordModal}/>
                        )}
                    </Paper>
                </Grid>
            </Box>
        </Grid>
    );
};

export default SettingsMain;
