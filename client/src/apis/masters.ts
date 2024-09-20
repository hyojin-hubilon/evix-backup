import {
    ResCommonError,
    api
} from '@/apis/axios-common';
import {
	SampleSurveyList,
    SurveyDetail,
    SurveyPostReqBody,
    SurveyPostResponse,
	SurveyPutReqBody,
} from '@/types/survey';

const BASE_API_URL = '/master/survey';

const mastersApi = {
   
    postNewSurveySample: async (survey: SurveyPostReqBody) => {
        try {
            const responseData = await api<SurveyPostResponse>(BASE_API_URL, 'post', survey);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},

	saveSurveySample: async (survey: SurveyPutReqBody) => {
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

	getSurveySample: async (survey_no: number|string) => {
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

    
	getCopyingSurveySample: async (survey_no: number|string) => {
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

	deleteSurveySample: async (survey_no: number) => {
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
	},
	getSamples : async() => {
		try {
			const responseData = await api<SampleSurveyList[]>(
				`${BASE_API_URL}/sample-list`,
				'get',
			)
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
};

export default mastersApi;
