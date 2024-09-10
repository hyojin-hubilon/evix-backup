import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ResCommonError } from '@/apis/axios-common';
import { Grid, Stack, TextField, Button, Typography, Paper } from '@mui/material';
import authApi from '@/apis/auth';
import { MyProfile } from '@/types/user';
import { LoginReq } from '@/types/auth';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { t } from 'i18next';

type Props = {
    myProfile: MyProfile;
    handleLogin: (status: boolean) => void;
};

const SettingLoginForm: React.FC<Props> = ({ myProfile, handleLogin }) => {
    const initialValues: LoginReq = { email: myProfile.email, password: '' };
	const confirm = useConfirmation();

    const validationSchema = Yup.object({
		email: Yup.string().email().required(t('settings.enter_your_email_address')),
        password: Yup.string().required(t('settings.enter_your_password'))
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async ({ email, password }) => {
            try {
                const responseData = await authApi.login({ email, password });
                if (responseData.code === 400) {
                    confirm({description : t('settings.confirm_your_password'), variant: 'info'});
                    return;
                }
                if (responseData.code === 200) {
                    handleLogin(true);
                }
            } catch (error) {
                if (error instanceof ResCommonError) {
                    alert(error.message);
                }
            }
        },
    });

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '80vh' }}
        >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%', maxWidth: 500 }}>
                <Stack spacing={3}>
                    <Typography variant="h6" textAlign="center">
						{t('settings.enter_password_to_verify')}
                        {/* 본인 확인을 위해 비밀번호를 입력해주세요. */}
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                disabled
                                type="text"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                fullWidth
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
								autoComplete="off"
                                fullWidth
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button variant="contained" type="submit" fullWidth>
								{t('common.confirm')}
                                {/* 확인 */}
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Grid>
    );
};

export default SettingLoginForm;
