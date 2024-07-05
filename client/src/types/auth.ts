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
