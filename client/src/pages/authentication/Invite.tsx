import { Box, Button, Container, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import { StudyUserInvite, StudyUserInvites } from '@/types/study';
import studyApi from '@apis/study';

const Invite = () => {
    const validationSchema = Yup.object({
        std_no: Yup.string()
            .matches(/^[0-9]+$/, 'Must be numbers')
            .required('Study number is required'),
        user_email: Yup.string().email('Must be a valid email').required('Email is required'),
        std_privilege: Yup.string().required('Privilege is required'),
    });

    const formik = useFormik<StudyUserInvite>({
        initialValues: {
            std_no: 0,
            user_email: '',
            std_privilege: '',
        },
        validationSchema: validationSchema,

        onSubmit: async (values, { setStatus }) => {
            try {
                const payload: StudyUserInvites = [
                    {
                        std_no: +values.std_no,
                        user_email: values.user_email,
                        std_privilege: values.std_privilege,
                    },
                ];

                const responseData = studyApi.inviteStudyMember(payload);
                setStatus({ success: true });
                console.log(responseData);
                // console.log(getDecodedToken(responseData));
            } catch (error) {
                console.log('error occur : ', error);
                setStatus({ success: false });
            }
        },
    });

    const makeTextField = (
        labal: string,
        name: string,
        formik: {
            values: StudyUserInvite;
            errors: FormikErrors<StudyUserInvite>;
            touched: FormikTouched<StudyUserInvite>;
            handleChange;
            handleBlur;
        }
    ) => {
        return (
            <TextField
                label={labal}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
                required
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
            />
        );
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    임상 연구원 초대
                </Typography>
                <form noValidate onSubmit={formik.handleSubmit}>
                    {makeTextField('Study Number', 'std_no', formik)}
                    {makeTextField('Email', 'user_email', formik)}
                    {makeTextField('Privilege', 'std_privilege', formik)}
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
