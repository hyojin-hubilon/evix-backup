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
