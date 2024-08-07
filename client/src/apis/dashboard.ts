import * as DashboardApiType from '@/types/dashboard';
import { api, ResCommonError } from './axios-common';

const BASE_API_URL = '/researcher/dashboard';

const DashboardApi = {
    /**
     * 스터디별 누적 참여자 수 (배포 상태인 스터디)
     * @param cookie
     * @returns
     */
    getNumOfParticipantByStudy: async () => {
        try {
            const responseData = await api<DashboardApiType.NumOfParticipantByStudy[]>(
                `${BASE_API_URL}/number-of-participant-by-study`,
                'get'
            );

            console.log(responseData);

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
};

export default DashboardApi;
