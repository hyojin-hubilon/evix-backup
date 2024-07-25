import React from 'react';
import authApi from '@/apis/auth';
import { Container, Typography, Stack, OutlinedInput, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const validationSchema = yup.object({
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .matches(
            /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,16}$/,
            'Combination of English, numbers and special characters'
        )
        .required('Password is required'),
    newPassword: yup
        .string()
        .oneOf([yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm Password is required'),
});

const ChangePasswordForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user_no = location.state?.user_no || '';

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            console.log('Password changed successfully!', values);
            try {
                const response = await authApi.resetPassword({
                    user_no,
                    new_password: values.password,
                });
                alert('비밀번호 변경 성공');
                navigate('/login');
            } catch (error) {
                console.error('Password reset failed:', error);
                setStatus({ errorMessage: 'Failed to reset password. Please try again.' });
            }
            setSubmitting(false);
        },
    });

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Change Password
            </Typography>

            <Stack spacing={1} sx={{ mb: 2 }}>
                <Typography gutterBottom>Please enter a new password.</Typography>
                <Typography>After the change, go to the login screen.</Typography>
            </Stack>

            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3} width={1}>
                    <OutlinedInput
                        id="password"
                        type="password"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        placeholder="New Password"
                        fullWidth
                        error={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Typography color="error">{formik.errors.password}</Typography>
                    )}

                    <OutlinedInput
                        id="new-password"
                        type="password"
                        value={formik.values.newPassword}
                        name="newPassword"
                        onChange={formik.handleChange}
                        placeholder="New Password Confirm"
                        fullWidth
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword && (
                        <Typography color="error">{formik.errors.newPassword}</Typography>
                    )}

                    {formik.status && formik.status.errorMessage && (
                        <Typography color="error">{formik.status.errorMessage}</Typography>
                    )}

                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={formik.isSubmitting}
                    >
                        Change Password
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default ChangePasswordForm;
