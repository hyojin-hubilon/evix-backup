import Axios, { AxiosRequestConfig } from 'axios';

export type API_ACTION = 'post' | 'get' | 'put' | 'delete';
const apiVersion = 'api/v1';
export interface CommonResponse {
    result: boolean;
    code: number;
    message: string;
}

export interface ErrorResponse {
    result: boolean;
    dateTime: string;
    status: number;
    error: string;
    message: string;
}

export const axios = Axios.create({
    withCredentials: true,
    baseURL: apiVersion,
    timeout: 60000,
    headers: {
        'Content-Language': 'utf-8',
        'Content-Type': 'application/json',
    },
});

export async function api<Response>(
    url: string,
    method: API_ACTION,
    data?: any,
    config?: AxiosRequestConfig
) {
    let loadingEle;
    let res;
    try {
        if (method == 'post') res = await axios.post<Response>(url, data, config);
        else if (method == 'put') res = await axios.put<Response>(url, data);
        else if (method == 'delete') res = await axios.delete<Response>(url);
        else res = await axios.get<Response>(url);
        if (loadingEle) {
            loadingEle.style.display = 'none';
        }

        if (res.result) {
            return res.data;
        } else {
            throw new Error(res);
        }
    } catch (e) {
        if (loadingEle) {
            loadingEle.style.display = 'none';
        }
        throw e;
    }
}

// const ignoreUrl = ['/api/login'];

// axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (ignoreUrl.indexOf(error?.response?.config?.url) === -1) {
//             if ([401, 403, 404].includes(error?.response?.status)) {
//                 if (typeof window !== 'undefined') {
//                     location.href = '/login';
//                 }

//                 throw error;
//             }
//         }

//         throw error;
//     }
// );
