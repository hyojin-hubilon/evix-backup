import AuthenticationPasswordForm from './auth-forms/AuthenticationPasswordForm';
import AuthWrapper from './AuthWrapper'; // 인증 페이지 레이아웃을 감싸는 래퍼 컴포넌트를 가져옵니다.

const AuthPassword = () => {
    return (
        <AuthWrapper>
            <AuthenticationPasswordForm />
        </AuthWrapper>
    );
};

export default AuthPassword;
