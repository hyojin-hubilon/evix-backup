import { Box, Button, Container, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { getDecodedToken } from '@utils/Cookie';

const Invite = () => {
    const validationSchema = Yup.object({
        std_no: Yup.string().required('Study number is required'),
        user_email: Yup.string().email('Must be a valid email').required('Email is required'),
        std_privilege: Yup.string().required('Privilege is required'),
    });

    const formik = useFormik({
        initialValues: {
            std_no: '',
            user_email: '',
            std_privilege: '',
            submit: '',
        },
        validationSchema: validationSchema,

        onSubmit: async (values, { setStatus, setErrors }) => {
            try {
                const payload = [
                    {
                        std_no: values.std_no,
                        user_email: values.user_email,
                        std_privilege: values.std_privilege,
                    },
                ];

                const response = await axios.post(
                    '/api/v1/researcher/study/study-user-invite',
                    payload
                );
                setStatus({ success: true });
                console.log(response.data);
                console.log(getDecodedToken(response.data));
            } catch (error) {
                setErrors({ submit: '에러 발생gg' });
                console.log('에러 발생 : ', error);
                setStatus({ success: false });
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    임상 연구원 초대
                </Typography>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Study Number"
                        name="std_no"
                        value={formik.values.std_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.std_no && Boolean(formik.errors.std_no)}
                        helperText={formik.touched.std_no && formik.errors.std_no}
                    />
                    <TextField
                        label="Email"
                        name="user_email"
                        value={formik.values.user_email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.user_email && Boolean(formik.errors.user_email)}
                        helperText={formik.touched.user_email && formik.errors.user_email}
                    />
                    <TextField
                        label="Privilege"
                        name="std_privilege"
                        value={formik.values.std_privilege}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={formik.touched.std_privilege && Boolean(formik.errors.std_privilege)}
                        helperText={formik.touched.std_privilege && formik.errors.std_privilege}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={formik.isSubmitting}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Invite;
