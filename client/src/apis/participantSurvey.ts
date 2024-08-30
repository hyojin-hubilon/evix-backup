import { ResCommonError, api, file_api } from '@/apis/axios-common';
import { ParticipantSurveyDetail, SurveyAnswer, SurveyAnswerReqBody } from '@/types/participant';

const BASE_API_URL = '/participant/survey';

const participantSurveyApi = {
    postParticipantSurveyAnswer: async (answerData: SurveyAnswerReqBody[]) => {
        try {
            const responseData = await api<{}>(`${BASE_API_URL}`, 'post', answerData);
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    getParticipantSurveyAnswer: async (setNo: number, surveyNo: number) => {
        try {
            const responseData = await api<{}>(`${BASE_API_URL}/${setNo}/${surveyNo}`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
	getSurveyDetail: async (setNo, surveyNo, surveyCycle, surveyTurn) => {
		try {
            const responseData = await api<ParticipantSurveyDetail>(`${BASE_API_URL}/${setNo}/${surveyNo}/${surveyCycle}/${surveyTurn}`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
	},
	postSurveyAnswer: async (surveyData: SurveyAnswer[]) => {
		try {
            const responseData = await api<{}>(`${BASE_API_URL}/survey`, 'post', surveyData);
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
	}
  
};

export default participantSurveyApi;
