import { CommonResponse } from '@/utils/axios';

export interface LoginReqBody {
    email: string;
    password: string;
}

export interface GoogleLoginReqBody {
    email: string;
    sub: string;
}

export interface LoginReponse extends CommonResponse {
    content: {
        user_no: number;
        email: string;
        first_name: string;
        last_name: string;
        privilege: string;
        last_login: string | Date;
    };
}
