export interface RegistrableSurvey { //스터디에 등록가능한 서베이
	survey_no: number;
	title: string;
	updated_date: string | Date;///researcher/survey/my-list-registrable 추가해야함
	frequency?: string;//반복 주기
	times?: number;//반복 횟수
}

export interface ExampleList { //예시목록
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

export interface MySurveyList { //서베이리스트
	survey_no: number,
	title: string,
	question_number: number,
	created_user_first_name: string,
	created_user_last_name: string,
	created_at: string | Date,
	updated_at: string | Date | null,
	std_no: number,
	study_title: string
}


export interface SurveyApiResponse {
	next?: boolean,
	orderBy?: "CREATED" | "UPDATED", //UPDATED가 Default
	searchType?: string | null, 
	searchKeyword?: string | null, //추가예정
	pageNum?: number,
	surveyMyList?: MySurveyList[];
}


export interface SurveyExample {//RequestBody Survey 답변
	example_title: string,
	example_value: string | number,
	sort: number
}

export enum QuestionTypes {
	TITLE = "TITLE",
	PARENT = "PARENT",
	SINGLE = "SINGLE",
	MULTIPLE = "MULTIPLE",
	WRITE = "WRITE"
}

export interface SurveyQuestion {
	question: string,
	level: number,
	sort: number,
	question_type: QuestionTypes,
	questionChildList: SurveyQuestion[], //parent 일때 하위 질문이 있으나 기획엔 없음
	exampleList: SurveyExample[] //답변목록
}

export interface SurveyPostReqBody {
	title: string,
	diseases_affected_parts: string,
	description: string, //영문
	translation: string, //한글변역?
	sample_yn: string, //Y|N
	questionList: SurveyQuestion[],
	required: boolean //아직 없음
}