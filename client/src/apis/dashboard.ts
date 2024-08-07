import * as DashboardApiType from '@/types/dashboard';
import { api, ResCommonError } from './axios-common';

const BASE_API_URL = '/researcher/dashboard';

const DashboardApi = {
    // 스터디별 누적 참여자 수 (배포 상태인 스터디)
    getNumOfParticipantByStudy: async () => {
        try {
            const responseData = await api<DashboardApiType.NumOfParticipantByStudy[]>(
                `${BASE_API_URL}/number-of-participant-by-study`,
                'get'
            );

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    // 최근 참여자 로그 (배포 상태인 스터디)
    getRecentParticipantLogs: async () => {
        try {
            const responseData = await api<DashboardApiType.NumOfParticipantByStudy[]>(
                `${BASE_API_URL}/recent-participant-logs`,
                'get'
            );

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    // 월별 스터디 참여자 수 (배포 상태인 스터디)
    getStudyGoalByMonthly: async (stdNo: number) => {
        try {
            const responseData = await api<DashboardApiType.StudyGoalByMonthly[]>(
                `${BASE_API_URL}/study-goal-by-monthly/${stdNo}`,
                'get'
            );

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    // 주간 스터디 참여자 수 (배포 상태인 스터디)
    getWeeklyByStudy: async () => {
        try {
            const responseData = await api<DashboardApiType.NumOfParticipantByStudy[]>(
                `${BASE_API_URL}/weekly-by-study`,
                'get'
            );

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
};

export default DashboardApi;
