export interface RegistrableSurvey {
	survey_no: number;
	title: string;
	updated_date: string | Date;///researcher/survey/my-list-registrable 추가해야함
	frequency?: string;//반복 주기
	times?: number;//반복 횟수
}