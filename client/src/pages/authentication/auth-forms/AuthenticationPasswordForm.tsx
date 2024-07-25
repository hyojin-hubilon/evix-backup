import authApi from '@/apis/auth';
import {
    Container,
    Typography,
    Stack,
    OutlinedInput,
    Button,
    InputAdornment,
    FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const validationSchema = yup.object({
    authenticationNumber: yup.string().required('Authentication Number is required'),
});

const AuthenticationPasswordForm = () => {
    const location = useLocation();
    const resetToken = location.state?.resetToken || '';
    const navigate = useNavigate();

    const [timer, setTimer] = useState(300);
    // const [timer, setTimer] = useState(10);

    useEffect(() => {
        if (timer <= 0) {
            navigate(-1);
        }

        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer, navigate]);

    const formik = useFormik({
        initialValues: {
            authenticationNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await authApi.verifyPasswordReset(
                    values.authenticationNumber,
                    resetToken
                );
                if (response.code === 200) {
                    alert(response.content);
                    navigate('/change-password', {
                        state: { user_no: response.content },
                    });
                }
            } catch (error) {
                console.error('Error verifying password reset link:', error);
            }
        },
    });

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Authentication password
            </Typography>

            <Stack spacing={1} sx={{ mb: 2 }}>
                <Typography gutterBottom>
                    Please enter the authentication number sent to your email.
                </Typography>
            </Stack>

            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={1} width={1}>
                    <OutlinedInput
                        id="authenticationNumber"
                        type="text"
                        value={formik.values.authenticationNumber}
                        name="authenticationNumber"
                        onChange={formik.handleChange}
                        placeholder="Authentication Number"
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">{formatTime(timer)}</InputAdornment>
                        }
                        error={
                            formik.touched.authenticationNumber &&
                            Boolean(formik.errors.authenticationNumber)
                        }
                    />
                    {formik.touched.authenticationNumber && formik.errors.authenticationNumber && (
                        <FormHelperText error>{formik.errors.authenticationNumber}</FormHelperText>
                    )}

                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Verify Authentication Number
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default AuthenticationPasswordForm;
