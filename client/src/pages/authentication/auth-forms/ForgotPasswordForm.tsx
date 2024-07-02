import { Container, Typography, Link, Stack, OutlinedInput, Button } from '@mui/material';
import { useState } from 'react';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState();

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
            <Stack spacing={3} width={1}>
                <OutlinedInput
                    id="email"
                    type="email"
                    value={email}
                    name="email"
                    onChange={() => setEmail}
                    placeholder="Email"
                    fullWidth
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
        </Container>
    );
};

export default ForgotPasswordForm;
