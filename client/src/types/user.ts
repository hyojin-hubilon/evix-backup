export interface UpdateUserData {
    user_no: number;
    mobile: string;
    company_name: string;
    job_title: string;
    industry: string;
    country: string;
    email_notification_yn: 'Y' | 'N';
    language: string;
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
    language: string;
    email_notification_yn: string;
    unauthorized_number: number;
    study_number: number;
    survey_number: number;
}

export interface Number {
    content: number;
}

export interface ModifyPassword {
    user_no: number;
    origin_password: string;
    new_password: string;
}
