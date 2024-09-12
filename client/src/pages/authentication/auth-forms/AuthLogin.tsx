import { useContext, useState } from 'react';
// import axios from "axios";
import { Formik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import {
    Container,
    Button,
    Divider,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    OutlinedInput,
    Stack,
    Typography,
} from '@mui/material';
import GoogleSocial from './GoogleSocial';
import * as AuthApiType from '@/types/auth';
import authApi from '@/apis/auth';
import { useConfirmation } from '@/context/ConfirmDialogContext';

const AuthLogin = () => {
    const navigate = useNavigate();
	const confirm = useConfirmation();
	
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Sign In
            </Typography>

            <Formik<AuthApiType.LoginReq>
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Must be a valid email')
                        .max(255)
                        .required('Please enter email'),
                    password: Yup.string().max(255).required('Please enter password'),
                })}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        const { code, content } = await authApi.login(values);
                        if (code === 400) {
                            confirm({description : '아이디 또는 패스워드를 확인해주세요.', variant : 'info'});
                            return;
                        }
                        if (code === 200) {
                            setStatus({ success: true });
							if(content.last_login) {
								navigate('/dashboard')
							} else {
								navigate('/onboarding') //로그인 기록이 없을 시 onboarding화면으로 이동
							}
                            
                        }
                    } catch (e) {
						confirm({description : 'This surfactant is already in use.', variant : 'info'});
                        setStatus({ success: false });
                        setFormError('login failed');
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
                                <Stack spacing={1}>
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-email-login"
                                        >
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? (
                                                        <EyeOutlined />
                                                    ) : (
                                                        <EyeInvisibleOutlined />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-password-login"
                                        >
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {formError && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{formError}</FormHelperText>
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
                                        Login
                                    </Button>
                                
                            </Grid>
                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Link
                                        variant="h6"
                                        component={RouterLink}
                                        to="/finding-id"
                                        color="text.primary"
                                        underline="always"
                                    >
                                        Finding ID
                                    </Link>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Link
                                        variant="h6"
                                        component={RouterLink}
                                        to="/forgot-password"
                                        color="text.primary"
                                        underline="always"
                                    >
                                        Forgot your password?
                                    </Link>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">Login with</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <GoogleSocial />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Container>
    );
};

export default AuthLogin;
