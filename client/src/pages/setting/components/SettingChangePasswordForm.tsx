import { ResCommonError } from '@/apis/axios-common';
import userApi from '@/apis/user';
import { useConfirmation } from '@/context/ConfirmDialogContext';
import { ModifyPassword } from '@/types/user';
import { Container, Typography, Stack, OutlinedInput, Button, Modal, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { t } from 'i18next';

type Props = {
    user_no: number;
    isOpen: boolean;
    handleClose: () => void;
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

const SettingChangePasswordForm: React.FC<Props> = ({ user_no, isOpen, handleClose }) => {
    const confirm = useConfirmation();
    const validationSchema = yup.object({
        origin_password: yup.string().required('Origin Password is required'),
        new_password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,16}$/,
                'Combination of English, numbers and special characters'
            )
            .required('Password is required'),
        new_password_confirm: yup
            .string()
            .oneOf([yup.ref('new_password'), ''], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            origin_password: '',
            new_password: '',
            new_password_confirm: '',
        },
        validationSchema: validationSchema,
        onSubmit: ({ origin_password, new_password }) => {
            handleChangePassword({ user_no, origin_password, new_password });
        },
    });

    const handleChangePassword = async (body: ModifyPassword) => {
        try {
            const { content } = await userApi.modifyPassword(body);
            if (content) {
                confirm({ description: t('settings.change_password_success'), variant: 'info' });
                handleClose();
            }
        } catch (error) {
            if (error instanceof ResCommonError) {
                alert(error.message);
            }
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        {t('settings.change_password')}
                    </Typography>

                    <Stack sx={{ mt: 2, mb: 2 }}>
                        <Typography>{t('settings.please_enter_new_password')}</Typography>
                    </Stack>

                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={3} width={1}>
                            <OutlinedInput
                                id="origin_password"
                                type="password"
                                value={formik.values.origin_password}
                                name="origin_password"
                                onChange={formik.handleChange}
                                placeholder="Origin Password"
                                fullWidth
                                error={
                                    formik.touched.origin_password &&
                                    Boolean(formik.errors.origin_password)
                                }
                            />
                            {formik.touched.origin_password && formik.errors.origin_password && (
                                <Typography color="error">
                                    {formik.errors.origin_password}
                                </Typography>
                            )}
                            <OutlinedInput
                                id="new_password"
                                type="password"
                                value={formik.values.new_password}
                                name="new_password"
                                onChange={formik.handleChange}
                                placeholder="New Password"
                                fullWidth
                                error={
                                    formik.touched.new_password &&
                                    Boolean(formik.errors.new_password)
                                }
                            />
                            {formik.touched.new_password && formik.errors.new_password && (
                                <Typography color="error">{formik.errors.new_password}</Typography>
                            )}

                            <OutlinedInput
                                id="new-new_password_confirm"
                                type="password"
                                value={formik.values.new_password_confirm}
                                name="new_password_confirm"
                                onChange={formik.handleChange}
                                placeholder="New Password Confirm"
                                fullWidth
                                error={
                                    formik.touched.new_password_confirm &&
                                    Boolean(formik.errors.new_password_confirm)
                                }
                            />
                            {formik.touched.new_password_confirm &&
                                formik.errors.new_password_confirm && (
                                    <Typography color="error">
                                        {formik.errors.new_password_confirm}
                                    </Typography>
                                )}
                            <Button
                                disableElevation
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {t('settings.change_password')}
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </Box>
        </Modal>
    );
};

export default SettingChangePasswordForm;
