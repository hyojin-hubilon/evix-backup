import {
    ResCommonError,
    api
} from '@/apis/axios-common';

const BASE_API_URL = '/researcher/survey';

const surveyApi = {
    /**
     * 내 Survey 목록 조회
     * @param pageNum
     * @param elementSize
	 * @param orderBy
     * @returns
     */
    mySurveyList: async (pageNum: number, elementSize: number, orderBy:string) => {
        try {
            const responseData = await api<{}>(
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
