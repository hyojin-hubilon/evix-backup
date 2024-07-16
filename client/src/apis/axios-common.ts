import Axios, { AxiosRequestConfig } from 'axios';

/**
 * http status 외 예외가 발생했을 때 코드 정의
 */
export const ResCustomErrorCode = {
    // timeout or cancel request
    TIMEOUT: 600,
    // 에러 발생 이후 response.data 에서 data or response 가 없는 경우
    NONE_RESPONSE: 601,
    // 그 외 모든 에러 (설정에러 등)
    OTHERS: 699,
} as const;

export type API_ACTION = 'post' | 'get' | 'put' | 'delete';

const apiVersion = 'api/v1';

export interface ResCommonSuccess<T> {
    // [A] YiSuHwan TypeGuard 를 위함
    type: 'SUCCESS';
    result: boolean;
    code: number;
    message: string;
    content: T;
}

export interface ResCommonErrorInf {
    // [A] YiSuHwan TypeGuard 를 위함
    type: 'FAIL';
    // [A] YiSuHwan Add 값을 강제로 채워준다.
    code: number;

    dateTime: string;
    status: number;
    error: string;
    message: string;
}

export class ResCommonError implements ResCommonErrorInf {
    type;
    constructor(public code, public dateTime, public status, public error, public message) {}
}

export const axios_instance = Axios.create({
    withCredentials: true,
    baseURL: `/${apiVersion}`, // baseURL을 확인하고 변경 필요
    timeout: 60000,
    headers: {
        'Content-Language': 'utf-8',
        'Content-Type': 'application/json',
    },
});

export const axios_file_instance = Axios.create({
    withCredentials: true,
    baseURL: `/${apiVersion}`,
    timeout: 60000,
    headers: {
        'Content-Language': 'utf-8',
        'Content-Type': 'multipart/form-data',
    },
});

function generateError(
    code: number,
    dateTime: string | null | undefined,
    error: string | null | undefined,
    message: string | null | undefined
): ResCommonError {
    return new ResCommonError(
        code,
        dateTime ? dateTime : '',
        0,
        error ? error : '',
        message ? message : '메시지가 없습니다.'
    );
}

export async function api<T>(
    url: string,
    method: API_ACTION,
    data?: any,
    config?: AxiosRequestConfig
): Promise<ResCommonSuccess<T>> {
    // loadingEle 은 향후 화면이 개발되면 추가한다
    // let loadingEle;
    let res;
    try {
        if (method == 'post')
            res = await axios_instance.post<ResCommonSuccess<T>>(url, data, config);
        else if (method == 'put') res = await axios_instance.put<ResCommonSuccess<T>>(url, data);
        else if (method == 'delete') res = await axios_instance.delete<ResCommonSuccess<T>>(url);
        // else res = await axios_instance.get(url);
        else res = await axios_instance.get<ResCommonSuccess<T>>(url);
        // if (loadingEle) {
        //     loadingEle.style.display = 'none';
        // }
        return res.data as ResCommonSuccess<T>;
    } catch (error) {
        // if (loadingEle) {
        //     loadingEle.style.display = 'none';
        // }
        if (Axios.isCancel(error)) {
            throw generateError(ResCustomErrorCode.TIMEOUT, null, null, error.message);
        }
        if (Axios.isAxiosError<ResCommonError>(error)) {
            if (error.response !== undefined) {
                const errorResult = error.response.data;
                errorResult.code == error.response.status;
                throw errorResult;
            } else {
                throw generateError(ResCustomErrorCode.NONE_RESPONSE, null, null, error.message);
            }
        } else {
            throw generateError(ResCustomErrorCode.OTHERS, null, null, (error as Error).message);
        }
    }
}

export async function file_api<T>(
    url: string,
    method: API_ACTION,
    data?: any,
    config?: AxiosRequestConfig
): Promise<ResCommonSuccess<T>> {
    let res;
    try {
        if (method === 'post') {
            console.log(url, ', ', data);
            res = await axios_file_instance.post<ResCommonSuccess<T>>(url, data, config);
		} else if (method == 'put') { res = await axios_instance.put<ResCommonSuccess<T>>(url, data);
        } else {
            res = await axios_file_instance.get(url);
        }
        
        // if (loadingEle) {
        //     loadingEle.style.display = 'none';
        // }
        return res.data as ResCommonSuccess<T>;
    } catch (error) {
        if (Axios.isCancel(error)) {
            throw generateError(ResCustomErrorCode.TIMEOUT, null, null, error.message);
        }
        if (Axios.isAxiosError<ResCommonError>(error)) {
            if (error.response !== undefined) {
                const errorResult = error.response.data;
                errorResult.code = error.response.status;
                throw errorResult;
            } else {
                throw generateError(ResCustomErrorCode.NONE_RESPONSE, null, null, error.message);
            }
        } else {
            throw generateError(ResCustomErrorCode.OTHERS, null, null, (error as Error).message);
        }
    }
}
