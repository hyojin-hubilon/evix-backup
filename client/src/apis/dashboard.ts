import {
    ResCommonError,
    api
} from '@/apis/axios-common';
import { NumberOfParticipant } from '@/types/dashboard';

const BASE_API_URL = '/researcher/dashboard';

const dashboardApi = {
    //스터디별 누적 참여자 수(배포상태인 스터디)
    getNumberOfParicipant: async () => {
        try {
            const responseData = await api<NumberOfParticipant[]>(
                `${BASE_API_URL}/number-of-participant-by-study`,
                'get'
            );

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    }
};

export default dashboardApi;
