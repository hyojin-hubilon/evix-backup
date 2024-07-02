import { instance, handleApiError } from "../commonApi";

interface LoginRequest {
    email: string;
    password: string;
}

interface GoogleLoginRequest {
    email: string;
    sub: string;
}

interface ResetPasswordData {
    user_no: number;
    new_password: string;
}

interface SignupRequest {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    mobile: string;
    company_name: string;
    job_title: string;
    industry: string;
    country: string;
    privilege: string;
    active_yn: string;
    token: string;
}

interface ApplyFreeTrialRequest {
    email: string;
    first_naem: string;
    last_name: string;
    mobile: string;
    company_name: string;
    job_title: string;
    industry: string;
    coutnry: string;
    message: string;
}

const authApi = {
    /**
     * 로그인
     * @param loginData
     * @returns
     */
    login: async (loginData: LoginRequest) => {
        try {
            const response = await instance.post("/auth/login", loginData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            handleApiError(error, "Login error");
        }
    },

    /**
     * 로그아웃
     * @returns
     */
    logout: async () => {
        try {
            const response = await instance.get("/auth/logout");
            return response.data;
        } catch (error) {
            handleApiError(error, "Logout error");
        }
    },

    /**
     * 구글 로그인
     * @param loginData
     * @returns
     */
    googleLogin: async (loginData: GoogleLoginRequest) => {
        try {
            const response = await instance.post(
                "/auth/social_login",
                loginData
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Google login error");
        }
    },

    /**
     * 비밀번호 찾기 이메일 발송
     * @param email
     * @returns
     */
    sendPasswordResetLink: async (email: string) => {
        try {
            const response = await instance.post(
                `/auth/password/authentication-code`,
                { email }
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Send email error");
        }
    },

    /**
     * 비밀번호 재설정
     * @param passwordData
     * @returns
     */
    resetPassword: async (passwordData: ResetPasswordData) => {
        try {
            const response = await instance.put(
                "/auth/password/reset",
                passwordData
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Reset password error");
        }
    },

    /**
     * 회원가입
     * @param signUpData
     * @returns
     */
    signUp: async (signUpData: SignupRequest) => {
        try {
            const response = await instance.put("/auth/signup", signUpData);
            return response.data;
        } catch (error) {
            handleApiError(error, "Sign up error");
        }
    },

    /**
     * 승인 토큰 검증 및 확인
     * @param token
     * @returns
     */
    verifyAcceptToken: async (token: string) => {
        try {
            const response = await instance.get(
                `/auth/accept-verification/${token}`
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Accept verification error");
        }
    },

    /**
     * 초대 토큰 검증 및 수락
     * @param token
     * @returns
     */
    verifyInviteToken: async (token: string) => {
        try {
            const response = await instance.get(
                `/auth/invite-verification/${token}`
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Invitation verification error");
        }
    },

    /**
     * 비밀번호 재설정 인증번호 및 토큰 검증
     * @param authCode
     * @param token
     * @returns
     */
    verifyPasswordReset: async (authCode: string, token: string) => {
        try {
            const response = await instance.get(
                `/auth/authentication-code-verification/${authCode}/${token}`
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Verification error");
        }
    },

    /**
     * 무료 버전 요청
     * @param applyData
     * @returns
     */
    applyFreeTrial: async (applyData: ApplyFreeTrialRequest) => {
        try {
            const response = await instance.post(
                "/auth/apply-free-trial",
                applyData
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Apply Free Trial error");
        }
    },
};

export default authApi;
