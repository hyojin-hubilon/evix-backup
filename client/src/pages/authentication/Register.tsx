// Material-UI
import { Grid } from "@mui/material"; // Material-UI에서 필요한 컴포넌트를 가져옵니다.

// 프로젝트 내부 컴포넌트
import FirebaseRegister from "./auth-forms/AuthRegister"; // 회원가입 폼 컴포넌트를 가져옵니다.
import AuthWrapper from "./AuthWrapper"; // 인증 페이지 레이아웃을 감싸는 래퍼 컴포넌트를 가져옵니다.

// ================================|| REGISTER ||================================ //

const Register = () => (
    <AuthWrapper>
        {/* AuthWrapper로 회원가입 페이지를 감쌉니다. */}
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {" "}
                {/* 그리드 아이템을 설정하고 전체 너비를 차지하도록 설정합니다. */}
                <FirebaseRegister /> {/* 회원가입 폼 컴포넌트를 표시합니다. */}
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default Register; // Register 컴포넌트를 기본 내보내기로 설정합니다.
