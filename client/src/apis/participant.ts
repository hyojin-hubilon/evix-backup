import { ResCommonError, api, file_api } from '@/apis/axios-common';
import { SurveyAnswerReqBody } from '@/types/participant';

const BASE_API_URL = '/participant/survey';

const participantApi = {
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
  
};

export default participantApi;
