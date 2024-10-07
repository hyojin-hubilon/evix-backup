import { NotificationResponse } from '@/types/notification';
import { api, ResCommonError, ResCommonSuccess } from './axios-common';

const BASE_API_URL = '/researcher/notification';

/**
 * 알림 API
 */
const notificationApi = {
    /**
     * 알림 모두 읽기
     * @returns
     */
    readAllNotifications: async () => {
        try {
            const responseData = await api<{}>(`${BASE_API_URL}/all-checked`, 'put');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    /**
     * 알림 상세 조회
     * @param notificationNo
     * @returns
     */
    getNotificationDetails: async (notificationNo: Number) => {
        try {
            const responseData = await api<NotificationResponse>(
                `${BASE_API_URL}/detail/${notificationNo}`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    /**
     * 최근 알림 5개
     * @returns
     */
    getRecentNotifications: async () => {
        try {
            const responseData = await api<NotificationResponse[]>(
                `${BASE_API_URL}/last-5-notification`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    /**
     * 전체 알림 목록
     * @returns
     */
    getAllNotifications: async () => {
        try {
            const responseData = await api<NotificationResponse[]>(
                `${BASE_API_URL}/my-full-list-notification`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    /**
     * 미확인 알림 갯수
     * @returns
     */
    getUnreadNotificationCount: async () => {
        try {
            const responseData = await api<Number>(`${BASE_API_URL}/unchecked-notification`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
};

export default notificationApi;
