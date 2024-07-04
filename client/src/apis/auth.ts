import * as AuthApiType from '@/types/auth';
import { ResCommonError, api } from '@/apis/axios-common';

const authApi = {
    /**
     * 로그인
     * @param loginData
     * @returns
     */
    login: async (loginData: AuthApiType.LoginReq) => {
        try {
            const response = await api<AuthApiType.LoginRes>('/auth/login', 'post', loginData);
            console.log(response);
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 로그아웃
     * @returns
     */
    logout: async () => {
        try {
            const response = await api<AuthApiType.LoginRes>('/auth/logout', 'get');
            console.log(response);
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 구글 로그인
     * @param loginData
     * @returns
     */
    googleLogin: async (loginData: AuthApiType.GoogleLoginReq) => {
        try {
            const response = await api<{}>('/auth/social_login', 'post', loginData);
            console.log(response);
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 비밀번호 찾기 이메일 발송
     * @param email
     * @returns
     */
    sendPasswordResetLink: async (email: string) => {
        try {
            const response = await api<{}>('/auth/social_login', 'post', { email });
            console.log(response);
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 비밀번호 재설정
     * @param passwordData
     * @returns
     */
    resetPassword: async (passwordData: AuthApiType.ResetPasswordDataReq) => {
        try {
            const response = await api<{}>('/auth/password/reset', 'put', passwordData);
            console.log(response);
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 회원가입
     * @param signUpData
     * @returns
     */
    signUp: async (signUpData: AuthApiType.SignUpReq) => {
        try {
            const response = await api<{}>('/auth/signup', 'put', signUpData);
            console.log(response);
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 승인 토큰 검증 및 확인
     * @param token
     * @returns
     */
    verifyAcceptToken: async (token: string) => {
        try {
            const response = await api<{}>(`/auth/accept-verification/${token}`, 'get');
            console.log(response);
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 초대 토큰 검증 및 수락
     * @param token
     * @returns
     */
    verifyInviteToken: async (token: string) => {
        try {
            const response = await api<{}>(`/auth/invite-verification/${token}`, 'get');
            console.log(response);
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
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
            const uri = `/auth/authentication-code-verification/${authCode}/${token}`;
            const response = await api<{}>(uri, 'get');
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 무료 버전 요청
     * @param applyData
     * @returns
     */
    applyFreeTrial: async (applyData: AuthApiType.ApplyFreeTrialReq) => {
        try {
            const response = await api<{}>('/auth/apply-free-trial', 'post', applyData);
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
};

export default authApi;
