export interface LoginReq {
    email: string;
    password: string;
}

export interface LoginRes {
    user_no: number;
    email: string;
    first_name: string;
    last_name: string;
    privilege: string;
    last_login: string | Date;
}

export interface GoogleLoginReq {
    email: string;
    sub: string;
}

export interface ResetPasswordDataReq {
    user_no: number;
    new_password: string;
}

export interface SignUpReq {
    email: string;
    password: string;
    confirm_password: string;
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

export interface ApplyFreeTrialReq {
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

///api/v1/researcher/study/study-user-invite 에서 사용하는 부분
export interface InviteStudyUser {
    std_no: number;
    user_email: string;
    std_privilege: string;
}

export interface InviteStudyUsers extends Array<InviteStudyUser> {}

export interface Email {
    email: string;
}

export interface RequestChangePasswordRes {
    email: string;
    reset_token: string;
}

// Study 초대 토큰 검증
export interface VerifyInviteToken {
    std_no: number;
    std_privilege: string;
    user_email: string;
    created_at: string;
    accepted_at: string;
}

export interface InviteToken {
    email: string;
    iss: string;
    sub: string;
    exp: number;
    iat: number;
    'other-information': string;
    'sequence-no': number;
    'token-kind': string;
}
