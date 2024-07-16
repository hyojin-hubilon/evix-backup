import {
    ResCommonError,
    api
} from '@/apis/axios-common';
import { SurveyApiResponse } from '@/types/survey';

const BASE_API_URL = '/researcher/survey';

const surveyApi = {
    /**
     * 내 Survey 목록 조회
     * @param pageNum
     * @param elementSize
	 * @param orderBy
     * @returns
     */
    mySurveyList: async (pageNum: number, elementSize: number, orderBy:'CREATED' | 'UPDATED') => {
        try {
            const responseData = await api<SurveyApiResponse>(
                `${BASE_API_URL}/my-list/${pageNum}/${elementSize}/${orderBy}`,
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
