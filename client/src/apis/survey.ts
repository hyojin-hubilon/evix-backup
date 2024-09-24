import { ResCommonError, api } from '@/apis/axios-common';
import { ParticipantSurveyDetail } from '@/types/participant';
import {
    ParticipantSurveyAnswerSet,
    RegistrableSurvey,
    SampleSurveyList,
    SurveyApiResponse,
    SurveyDetail,
    SurveyPostReqBody,
    SurveyPostResponse,
    SurveyPutReqBody,
} from '@/types/survey';

const BASE_API_URL = '/researcher/survey';

const surveyApi = {
    /**
     * 내 Survey 목록 조회
     * @param pageNum
     * @param elementSize
     * @param orderBy
     * @returns
     */
    mySurveyList: async () => {
        try {
            const responseData = await api<SurveyApiResponse>(
                `${BASE_API_URL}/full-my-list`,
                'get'
            );

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    postNewSurvey: async (survey: SurveyPostReqBody) => {
        try {
            const responseData = await api<SurveyPostResponse>(BASE_API_URL, 'post', survey);

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    saveSurvey: async (survey: SurveyPutReqBody) => {
        try {
            const responseData = await api<SurveyPostResponse>(BASE_API_URL, 'put', survey);

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    getSurvey: async (survey_no: number | string) => {
        try {
            const responseData = await api<SurveyDetail>(`${BASE_API_URL}/${survey_no}`, 'get');

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    registrableSurvey: async () => {
        try {
            const responseData = await api<RegistrableSurvey[]>(
                `${BASE_API_URL}/my-list-registrable`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    registrableSurveyStudyInfo: async (stdNo: number) => {
        try {
            const responseData = await api<RegistrableSurvey[]>(
                `${BASE_API_URL}/my-list-registrable/${stdNo}`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    getCopyingSurvey: async (survey_no: number | string) => {
        try {
            const responseData = await api<SurveyDetail>(
                `${BASE_API_URL}/copy/${survey_no}`,
                'get'
            );

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    deleteSurvey: async (survey_no: number) => {
        try {
            const responseData = await api<{}>(BASE_API_URL, 'delete', { survey_no: survey_no });
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    getSamples: async () => {
        try {
            const responseData = await api<SampleSurveyList[]>(
                `${BASE_API_URL}/sample-list`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    getParticipantsSurveySets: async (stdNo: number, participantNo: number) => {
        //참여자 참여한 설문 목록가져오기
        try {
            const responseData = await api<ParticipantSurveyAnswerSet[]>(
                `${BASE_API_URL}/${stdNo}/${participantNo}/list-survey-answer`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    getParticipantSurveyDetail: async (
        setNo: number,
        surveyNo: number,
        answerCycle: string | Date,
        answerTurn: number,
        participantNo
    ) => {
        try {
            const responseData = await api<ParticipantSurveyDetail>(
                `${BASE_API_URL}/answer/${setNo}/${surveyNo}/${answerCycle}/${answerTurn}/${participantNo}`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
};

export default surveyApi;
