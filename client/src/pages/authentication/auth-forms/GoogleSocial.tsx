import { jwtDecode } from 'jwt-decode';
import { Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import authApi from '@/apis/auth';

type Decoded = {
    email: string;
    sub: string;
};

const GoogleSocial = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const googleHandler = async (response) => {
        console.log({ response });
        try {
            const googleInfo: Decoded = jwtDecode(response.credential);
            const { email, sub } = googleInfo;

            const googleResponse = await authApi.googleLogin({ email, sub });
            console.log('googleResponse: ', { googleResponse });

            if (googleResponse.code === 200) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="708293827981-7f40urii58s2e9kt81m70rgppsog733p.apps.googleusercontent.com">
            <Stack
                direction="row"
                spacing={matchDownSM ? 1 : 2}
                justifyContent="center"
                alignItems="center"
                sx={{
                    '& .MuiButton-startIcon': {
                        mr: matchDownSM ? 0 : 1,
                        ml: matchDownSM ? 0 : -0.5,
                    },
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                <GoogleLogin
                    size="large"
                    onSuccess={googleHandler}
                    onError={() => {
                        alert('login error');
                        console.error('Google login failed');
                    }}
                />
            </Stack>
        </GoogleOAuthProvider>
    );
};

export default GoogleSocial;
