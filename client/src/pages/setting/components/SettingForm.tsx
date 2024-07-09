import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ResCommonError } from '@/apis/axios-common';
import { Box, Grid, Stack, TextField, Button, Typography, Paper } from '@mui/material';
import authApi from '@/apis/auth';
import { LoginReq, MyProfile } from '@/types/auth';

type Props = {
    myProfile : MyProfile;
    handleLogin: (status: boolean) => void;
};

const SettingForm: React.FC<Props> = ({ myProfile, handleLogin }) => {
    const initialValues: LoginReq = ({ email: myProfile.email, password: '' });

    const validationSchema = Yup.object({
        email: Yup.string().email().required('이메일을 입력해주세요.'),
        password: Yup.string().required('비밀번호를 입력해주세요.'),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async ({ email, password }) => {
            try {
                const responseData = await authApi.login({ email, password });
                if (responseData.code === 200) {
                    handleLogin(true);
                }
            } catch (error) {
                alert((error as ResCommonError).message);
            }
        },
    });

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '80vh', backgroundColor: '#f5f5f5' }}
        >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%', maxWidth: 500 }}>
                <Stack spacing={3}>
                    <Typography variant="h6" textAlign="center">
                        본인 확인을 위해 비밀번호를 입력해주세요.
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
                                fullWidth
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button variant="contained" type="submit" fullWidth>
                                확인
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Grid>
    );
};

export default SettingForm;