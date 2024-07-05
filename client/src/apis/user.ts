import { ResCommonError, api } from '@/apis/axios-common';
import { UpdateUserData } from '@/types/user';

const BASE_API_URL = '/researcher/user';

const userApi = {
    updateUser: async (userData: UpdateUserData) => {
        try {
            const responseData = await api<{}>(`${BASE_API_URL}`, 'put', userData);
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    getUserInfo: async (userNo: number) => {
        try {
            const responseData = await api<{}>(`${BASE_API_URL}/${userNo}`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    deleteUser: async (userNo: number) => {
        try {
            const responseData = await api<{}>(`${BASE_API_URL}/${userNo}`, 'delete');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    // 현재 로그인된 쿠키 정보로 내 정보 조회
    getMyProfile: async () => {
        try {
            const responseData = await api<{}>(`${BASE_API_URL}/my-profile`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
};

export default userApi;
