import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel,
    FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; // 유효성 검사
import axios from "axios";
import { useNavigate } from "react-router";

const SignUp = () => {
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        first_name: Yup.string().required("First Name is required"),
        last_name: Yup.string().required("Last Name is required"),
        password: Yup.string()
            .min(8, "Password should be of minimum 8 characters length")
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,16}$/,
                "Combination of English, numbers and special characters"
            )
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), ""], "Passwords must match")
            .required("Confirm Password is required"),
        mobile: Yup.string().required("mobile number is required"),
        country: Yup.string().required("Country is required"),
        company: Yup.string().required("Company is required"),
        job_title: Yup.string().required("Job Position is required"),
        industry: Yup.string().required("Industry is required"),
        terms: Yup.boolean().oneOf(
            [true],
            "Please confirm you have agreed to Terms of Service, Privacy Policies"
        ),
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
            mobile: "",
            country: "",
            company: "",
            job_title: "",
            industry: "",
            first_name: "",
            last_name: "",
            terms: false,
            // token에서 가져올 정보들
            email: "mijin3004@gmail.com",
            privilege: "DEVELOPER",
            active_yn: "Y",
            token: "eyJ0eXAiOiJkY3Qtc2VjcmV0LXRva2VuIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJkY3Qtc2VjcmV0LXRva2VuIiwiaXNzIjoiZXZpeC1kY3QiLCJ0b2tlbi1raW5kIjoiSU5WSVRFIiwic2VxdWVuY2Utbm8iOjMsImVtYWlsIjoibWlqaW4zMDA0QGdtYWlsLmNvbSIsIm90aGVyLWluZm9ybWF0aW9uIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNzE4MzMwNDU1LCJleHAiOjE3MTk2MjY0NTV9.TX30lKdSyBqEIRSuxwx3xbjb9RHsEWqKeIqvAkXRJ38",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log(setSubmitting);
                console.log(values);
                const response = await axios.post(
                    "/api/v1/auth/signup",
                    values
                );
                console.log("Form submitted successfully", response.data);
                navigate("/");
            } catch (error) {
                console.error("Error submitting the form", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Box>
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Welcome to evix-DCT! We're so great to you're here, let's
                    start by signing up.
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="First Name"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.first_name &&
                            Boolean(formik.errors.first_name)
                        }
                        helperText={
                            formik.touched.first_name &&
                            formik.errors.first_name
                        }
                    />
                    <TextField
                        label="Last Name"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.last_name &&
                            Boolean(formik.errors.last_name)
                        }
                        helperText={
                            formik.touched.last_name && formik.errors.last_name
                        }
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                        }
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                        }
                    />
                    <TextField
                        label="mobile"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.mobile &&
                            Boolean(formik.errors.mobile)
                        }
                        helperText={
                            formik.touched.mobile && formik.errors.mobile
                        }
                    />
                    <TextField
                        label="Country"
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.country &&
                            Boolean(formik.errors.country)
                        }
                        helperText={
                            formik.touched.country && formik.errors.country
                        }
                    />
                    <TextField
                        label="Company"
                        name="company"
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.company &&
                            Boolean(formik.errors.company)
                        }
                        helperText={
                            formik.touched.company && formik.errors.company
                        }
                    />
                    <TextField
                        label="Job Position"
                        name="job_title"
                        value={formik.values.job_title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.job_title &&
                            Boolean(formik.errors.job_title)
                        }
                        helperText={
                            formik.touched.job_title && formik.errors.job_title
                        }
                    />
                    <TextField
                        label="Industry"
                        name="industry"
                        value={formik.values.industry}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        margin="normal"
                        required
                        error={
                            formik.touched.industry &&
                            Boolean(formik.errors.industry)
                        }
                        helperText={
                            formik.touched.industry && formik.errors.industry
                        }
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="terms"
                                color="primary"
                                checked={formik.values.terms}
                                onChange={formik.handleChange}
                            />
                        }
                        label="I agree to Terms of Service, Privacy Policies"
                        // error={
                        //     formik.touched.terms && Boolean(formik.errors.terms)
                        // }
                    />
                    {formik.touched.terms && formik.errors.terms && (
                        <FormHelperText style={{ color: "red" }}>
                            {formik.errors.terms}
                        </FormHelperText>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={formik.isSubmitting}
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignUp;
