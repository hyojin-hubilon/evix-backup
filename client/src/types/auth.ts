export interface LoginReq {
    email: string;
    password: string;
}

export enum PrivilegeTypes { // 사용자 권한
	Master = "Master",//시스템 마스터(최상위 개념)
	Manager = "Manager",//서비스 관리자
	Researcher = "Researcher",//연구원(일반)
	Caregiver = "Caregiver",//간병인(요양사)
	Participant = "Participant"//일반 참여자
}

export interface LoginRes {
    user_no: number;
    email: string;
    first_name: string;
    last_name: string;
    privilege: PrivilegeTypes;
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
    confirm_password?: string;
    first_name: string;
    last_name: string;
    mobile: string;
    company_name: string;
    job_title: string;
    industry: string;
    country: string;
	language: string;
    privilege: string;
    active_yn: string;
    token: string;
	terms: boolean;
}

export enum IndustryType {
	Academic = "ACADEMIC", //Academic
	CROPartners = "CRO/PARTNERS", //CRO/Partners
	Pharmaceutical = "PHARMACEUTICAL", //Pharmaceutical
	Biotechnology = "BIOTECH", //Biotech
	ConsumerHealth = "CONSUMER-HEALTH",//Consumer Health
	MedicalDevices = "MEDICAL-DEVICES",//Medical Devices	
	DigitalTherapeutics = "DIGITAL-THERAPEUTICS",//Digital Therapeutics
	etc = 'ETC'//etc
}

export enum IndustryType2 {
	Sponsor = "Sponsor",
	CRO = "CRO",
	PreClinical = "Pre-Clinical",
	Biotechnology = "Biotechnology/R&D",
	MedicalSchool = "Medical School",
	IndependentResearchSite = "Independent Research Site",
	Hospital =  "Hospital or Healthcare System",
	Government = "Government",
	Other = "Other"
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

export enum StudyPrivilege {//스터디 권한 / 기능권한 / 설명 / 비고
	Owner = "Owner", //설문 배포/초대/결제 / PM / 최상위 개념
	Maintainer = "Maintainer", // 설문 생성/수정/등록 / 스터디 관리자
	Developer = "Developer", //없음 / 임상의, 임상간호사 / Role Name 변경 필요
	Reporter = "Reporter", //없음/ 간병인, 보호자 / Role Name 변경 필요
	Participant = "Participant", //없음 / 임상 참여자
	Payer = "Payer" //없음 / 결제관리 / 미정
}
///api/v1/researcher/study/study-user-invite 에서 사용하는 부분
export interface InviteStudyUser {
    std_no: number;
    user_email: string;
    std_privilege: StudyPrivilege;
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
