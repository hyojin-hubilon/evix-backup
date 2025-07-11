import * as Yup from 'yup';
import { Container, Typography, Link, Stack, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import authApi from '@/apis/auth';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').required('Please enter your email'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            try {
                const response = await authApi.sendPasswordResetLink(values);

                if (response.code === 200) {
                    console.log('reset_token: ', response.content.reset_token);

                    setStatus({ success: true });
                    // navigate('/change-password', {
                    navigate('/authentication-password', {
                        state: { resetToken: response.content.reset_token },
                    });
                } else {
                    console.log('error message: ', response.message);
                }
            } catch (error) {
                console.error('Error sending password reset link:', error);
                setStatus({ success: false });
            }
            setSubmitting(false);
        },
    });
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Forgot your password?
            </Typography>
            <Stack spacing={1} sx={{ mb: 2 }}>
                <Typography>
                    Enter your email address and we'll send you a link to reset your password.
                </Typography>
                <Typography>
                    If your email is not confirmed, please <Link href="support">contact us.</Link>
                </Typography>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3} width={1}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={
                            formik.touched.email && formik.errors.email ? formik.errors.email : ''
                        }
                    />
                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Continue
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default ForgotPasswordForm;
