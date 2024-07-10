export interface UpdateUserData {
    user_no: number;
    mobile: string;
    company_name: string;
    job_title: string;
    industry: string;
    country: string;
    privilege: string;
    active_yn: 'Y' | 'N';
}

export interface MyProfile {
    user_no: number;
    email: string;
    first_name: string;
    last_name: string;
    mobile: string;
    company_name: string;
    job_title: string;
    industry: string;
    country: string;
    privilege: string;
    profile_image_url: string;
    profile_image_name: string;
    profile_image_origin_name: string;
    created_at: string;
    updated_user_no: number;
    updated_at: string;
    last_login: string;
    active_yn: string;
    delete_yn: string;
}

export interface Number {
    content: number;
}