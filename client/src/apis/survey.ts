export interface RegistrableSurvey {
	survey_no: number;
	title: string;
	updated_date: string | Date;///researcher/survey/my-list-registrable 추가해야함
	frequency?: string;//반복 주기
	times?: number;//반복 횟수
}

export interface ExampleList {
	survey_no: number,
	question_no: number,
	example_no: number,
	example_title: string,
	example_value: string,
	sort: number
}
export interface QuestionList {
	survey_no: number,
	question_no: number,
	question: string,
	parent: string | number | null, //? 확실치 않음
	level: number,
	sort: number,
	question_type: string, //"RADIO"
	exampleList : ExampleList[]
}
export interface SurveyDetail {
	survey_no: number,
	title: string,
	diseases_affected_parts: string,
	description: string,
	translation: string,
	sample_yn: string, // Y | N?
	created_user_no: number,
	created_at: string | Date,
	updated_user_no: number | null,
	updated_at: string | Date | null,
	std_no: number | null,
	study_title: string | null,
	questionList: QuestionList[]
}