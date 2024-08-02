import {
    ResCommonError,
    api
} from '@/apis/axios-common';
import {
    RegistrableSurvey,
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
			const responseData = await api<SurveyPostResponse>(
				BASE_API_URL,
				'put',
				survey
			);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},

	getSurvey: async (survey_no: number) => {
		try {
			const responseData = await api<SurveyDetail>(
				`${BASE_API_URL}/${survey_no}`,
				'get'
			);

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

	getCopyingSurvey: async (survey_no: number) => {
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
			const responseData = await api<{}>(
				BASE_API_URL,
				'delete',
				{ survey_no: survey_no }
			)
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	}
};

export default surveyApi;
