import { Grid } from '@mui/material'; // Material-UI에서 Grid 컴포넌트를 가져옵니다.
import AuthLogin from './auth-forms/AuthLogin'; // 로그인 폼 컴포넌트를 가져옵니다.
import AuthWrapper from './AuthWrapper'; // 인증 페이지 레이아웃을 감싸는 래퍼 컴포넌트를 가져옵니다.

// ================================|| LOGIN ||================================ //

// Login 컴포넌트를 정의합니다.
const Login = () => (
    <AuthWrapper>
        <Grid container spacing={3} direction="column" alignItems="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <AuthLogin />
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default Login; // Login 컴포넌트를 기본 내보내기로 설정합니다.
