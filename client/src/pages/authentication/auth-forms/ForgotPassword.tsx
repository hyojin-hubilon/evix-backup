import { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    Button,
    FormHelperText,
    Grid,
    OutlinedInput,
    Stack,
    Typography,
    Modal,
    Box,
} from "@mui/material";

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [userEmail, setUserEmail] = useState("");
	const [formError, setFormError] = useState("");

    const handleClose = () => {
        setEmailSent(false);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("Must be a valid email")
                        .required("Please enter email"),
                })}
                onSubmit={async (
                    values,
                    { setStatus, setSubmitting }
                ) => {
                    try {
                        await axios.post(
                            "/api/v1/auth/forgot-password",
                            values
                        );
                        setUserEmail(values.email);
                        setEmailSent(true);
                        setStatus({ success: true });
                    } catch (err) {
                        setStatus({ success: false });
                        setFormError("Failed to send reset email");
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h4">
                                    Forgot your password?
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Enter your email address and we'll send you
                                    a link to reset your password. If your email
                                    is not confirmed, please contact us.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <OutlinedInput
                                        id="email-reset"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        fullWidth
                                        error={Boolean(
                                            touched.email && errors.email
                                        )}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-email-reset"
                                        >
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {formError && (
                                <Grid item xs={12}>
                                    <FormHelperText error>
                                        {formError}
                                    </FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <Modal
                open={emailSent}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Please check your email.
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        We sent a password reset email to {userEmail}
                    </Typography>
                    <Button onClick={handleClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ForgotPassword;
