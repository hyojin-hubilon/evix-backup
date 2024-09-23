export interface RegistrableSurvey {
    //스터디에 등록가능한 서베이
    survey_no: number;
    title: string;
    updated_at: string | Date; ///researcher/survey/my-list-registrable 추가해야함
    frequency: string; //반복 주기
    times: number; //반복 횟수
    sort: number; // 순번
    set_no?: number;
}

export interface ExampleList {
    //예시목록
    survey_no: number;
    question_no: number;
    example_no: number;
    example_title: string;
    example_type: ExampleTypes;
    example_value: number;
    sort: number;
}
export interface QuestionList {
    survey_no: number;
    question_no: number;
    question: string;
    parent: string | number | null; //? 확실치 않음
    level: number;
    sort: number;
    question_type: QuestionTypes;
    question_division: QuestionDivision;
    exampleList: ExampleList[];
    required_answer_yn: 'Y' | 'N';
}
export interface SurveyDetail {
    survey_no: number;
    title: string;
    disease: string;
    description: string;
    translation: string;
    sample_yn: string; // Y | N?
    created_user_no: number;
    created_at: string | Date;
    updated_user_no: number | null;
    updated_at: string | Date | null;
    std_no: number | null;
    study_title: string | null;
    questionList: QuestionList[];
}

export interface MySurveyList {
    //서베이리스트
    survey_no: number;
    title: string;
    question_number: number;
    created_user_first_name: string;
    created_user_last_name: string;
    created_at: string | Date;
    updated_at: string | Date | null;
    std_no: number;
    study_title: string;
}

export interface SampleSurveyList {
    created_at: string | Date;
    disease: string;
    question_number: number;
    sample_yn: 'Y' | 'N';
    survey_no: number;
    title: string;
}

export interface SurveyApiResponse {
    next?: boolean;
    orderBy?: 'CREATED' | 'UPDATED'; //UPDATED가 Default
    searchType?: string | null;
    searchKeyword?: string | null; //추가예정
    pageNum?: number;
    surveyMyList?: MySurveyList[];
}

export enum ExampleTypes {
    CHOICE = 'CHOICE',
    WRITE = 'WRITE',
    OTHER = 'OTHER', //기타
}
//WRITE 타입은 question_type이 주관식답변일 경우 >> 이때 example_title 값을 WRITE로 보냈었는데 example_title = null로 전달 되도록. example_value는 그대로 1 로 전달
//기타 옵션인 경우에 example_type = OTHER 로, example_title = 기타 or Other

export interface SurveyExample {
    //RequestBody Survey
    example_type: ExampleTypes;
    example_title: string | null | undefined;
    example_value: string | number | undefined;
    sort: number;
}

export enum QuestionTypes {
    TITLE = 'TITLE',
    SINGLE = 'SINGLE',
    RADIO = 'RADIO',
    MULTIPLE = 'MULTIPLE',
    WRITE = 'WRITE',
}

export type TQuestionTypes = keyof typeof QuestionTypes;

// 서베이에서 질문타입이 다중선택일 경우
// example_value 값을 이진법으로 1,2,4,8,16,32

export enum QuestionDivision {
    GENERAL = 'GENERAL',
    PARENT = 'PARENT',
    CHILD = 'CHILD',
}
// question_division >> GENERAL - 일반,
// PARENT - 부모, CHILD - 자식
// 상위 질문 - 하위 질문 관계가 아닐 경우에 GENERAL,
// 상위 질문 - 하위 질문 관계 일 경우 PARENT - 부모, CHILD - 자식
// question_division이 PARENT 일 경우 question_type = null 로 전달

export interface SurveyQuestion {
    question: string;
    question_division: QuestionDivision;
    level: number;
    sort: number;
    question_type: QuestionTypes;
    required_answer_yn: 'Y' | 'N';
    questionChildList?: SurveyQuestion[]; //parent 일때 하위 질문이 있으나 기획엔 없음
    exampleList: SurveyExample[]; //답변목록 Child가 있을땐 questionChildList만 있음 (?)
}

export interface SurveyPostReqBody {
    title: string;
    disease?: string; //샘플작성시에만 추가
    description: string; //영문
    // translation?: string, //한글변역?
    sample_yn?: string; //Y|N
    questionList: SurveyQuestion[];
}

export interface SurveyPostResponse {
    questionList: [] | null;
    survey_no: number;
}

export interface SurveyPutReqBody extends SurveyPostReqBody {
    survey_no: number | string;
}

export interface ParticipantSurveyAnswerSet {
    answer_cycle: string | Date;
    answer_turn: number;
    created_at: string | Date;
    participant_no: number;
    set_no: number;
    survey_answer_no: number;
    survey_no: number;
    survey_title: string;
}
