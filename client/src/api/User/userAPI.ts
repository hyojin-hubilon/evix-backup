import { handleApiError, instance } from "../commonApi";

const BASE_API_URL = "/researcher/user";

interface UpdateUserData {
    user_no: number;
    mobile: string;
    company_name: string;
    job_title: string;
    industry: string;
    country: string;
    privilege: string;
    active_yn: "Y" | "N";
}

const userApi = {
    updateUser: async (userData: UpdateUserData) => {
        try {
            const response = await instance.put(`${BASE_API_URL}`, userData);
            return response.data;
        } catch (error) {
            handleApiError(error, "Update User error");
        }
    },
    getUserInfo: async (userNo: number) => {
        try {
            const response = await instance.get(`${BASE_API_URL}/${userNo}`);
            return response.data;
        } catch (error) {
            handleApiError(error, "Get User Info error");
        }
    },
    deleteUser: async (userNo: number) => {
        try {
            const response = await instance.delete(`${BASE_API_URL}/${userNo}`);
            return response.data;
        } catch (error) {
            handleApiError(error, "Delete User error");
        }
    },
    // 현재 로그인된 쿠키 정보로 내 정보 조회
    getMyProfile: async () => {
        try {
            const response = await instance.get(`${BASE_API_URL}/my-profile`);
            return response.data;
        } catch (error) {
            alert("로그인 하슈");
            // handleApiError(error, "Get My Profile Error");
        }
    },
};

export default userApi;
