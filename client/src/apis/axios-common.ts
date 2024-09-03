import { dispatch } from '@/store';
import { AlertType, setAlert } from '@/store/reducers/snack';
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

const ignoreAPIUrl = ['/auth/login'];
const ignoreMdppUrl = '/mdpp';

axios_instance.interceptors.response.use( //MDPP 제외
    (response) => response,
    (error) => {
        if (ignoreAPIUrl.indexOf(error?.response?.config?.url) === -1 && location.href.indexOf(ignoreMdppUrl) === -1) {
            if ([401, 403, 404].includes(error?.response?.status)) {
                if (typeof window !== 'undefined') {
                    location.href = '/login';
                }
                throw error;
            }
        }
        throw error;
    }
);

export const axios_file_instance = Axios.create({
    withCredentials: true,
    baseURL: `/${apiVersion}`,
    timeout: 60000,
    headers: {
        'Content-Language': 'utf-8',
        'Content-Type': 'multipart/form-data',
    },
});

axios_file_instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (ignoreAPIUrl.indexOf(error?.response?.config?.url) === -1) {
            if ([401, 403, 404].includes(error?.response?.status)) {
                if (typeof window !== 'undefined') {
                    location.href = '/login';
                }
                throw error;
            }
        }
        throw error;
    }
);

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
    let loadingEle;
    let res;

	if (typeof window != 'undefined') {
        loadingEle = document.getElementById('loadingContainer');
        if (loadingEle) {
            loadingEle.style.display = 'block';
        }
    }
	
    try {
        if (method == 'post')
            res = await axios_instance.post<ResCommonSuccess<T>>(url, data, config);
        else if (method == 'put') res = await axios_instance.put<ResCommonSuccess<T>>(url, data);
        else if (method == 'delete')
            //res = await axios_instance.delete<ResCommonSuccess<T>>(url);
            res = await axios_instance.delete<ResCommonSuccess<T>>(url, {
                data,
                ...config,
            });
        // delete 수정
        // else res = await axios_instance.get(url);
        else res = await axios_instance.get<ResCommonSuccess<T>>(url, data);
        
		if (loadingEle) {
            loadingEle.style.display = 'none';
        }

		if(res.data && res.data.code !== 200) { //alert snack bar
			dispatch(setAlert({ alertOpen: true, alertText: res.data.message, alertType: 'error' }));
		}


        return res.data as ResCommonSuccess<T>;
    } catch (error) {
		console.log(error)

		
        if (loadingEle) {
            loadingEle.style.display = 'none';
        }
        if (Axios.isCancel(error)) {
			dispatch(setAlert({ alertOpen: true, alertText: error.message, alertType: AlertType.error }));
            throw generateError(ResCustomErrorCode.TIMEOUT, null, null, error.message);
        }
        if (Axios.isAxiosError<ResCommonError>(error)) {
            if (error.response !== undefined) {
                const errorResult = error.response.data;
                errorResult.code == error.response.status;
                throw errorResult;
            } else {
				dispatch(setAlert({ alertOpen: true, alertText: error.message, alertType: AlertType.error }));
                throw generateError(ResCustomErrorCode.NONE_RESPONSE, null, null, error.message);
            }
        } else {
			dispatch(setAlert({ alertOpen: true, alertText: (error as Error).message, alertType: AlertType.error }));
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
	let loadingEle;

	if (typeof window != 'undefined') {
        loadingEle = document.getElementById('loadingContainer');
        if (loadingEle) {
            loadingEle.style.display = 'block';
        }
    }

    try {
        if (method === 'post') {
            console.log(url, ', ', data);
            res = await axios_file_instance.post<ResCommonSuccess<T>>(url, data, config);
        } else if (method == 'put') {
            res = await axios_file_instance.put<ResCommonSuccess<T>>(url, data);
        } else {
            res = await axios_file_instance.get(url);
        }
        if (loadingEle) {
            loadingEle.style.display = 'none';
        }
        return res.data as ResCommonSuccess<T>;
    } catch (error) {
		if (loadingEle) {
            loadingEle.style.display = 'none';
        }
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
