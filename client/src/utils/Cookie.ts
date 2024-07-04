import { Cookies } from 'react-cookie';
import { Cookie } from '@/types/cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: any, options): void => {
    return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
    return cookies.get(name);
};

export const removeCookie = (name: string): void => {
    cookies.remove(name);
};

export const getCookies = (names: string[]): Cookie[] => {
    return names.map(item => {
        return { name: item, value: getCookie(item) ?? undefined };
    });
};

// Base64Url decoding (한글 깨짐 이슈)
const base64UrlDecode = (input) => {
    input = input.replace(/-/g, '+').replace(/_/g, '/');

    const pad = input.length % 4;
    if (pad) {
        if (pad === 1) {
            throw new Error(
                'InvalidLengthError: Input base64url string is the wrong length to determine padding'
            );
        }
        input += new Array(5 - pad).join('=');
    }

    return atob(input);
};

export const getDecodedToken = (cookieName:string) => {
    const token = getCookie(cookieName);
    if (token) {
        try {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(decodeURIComponent(escape(base64UrlDecode(payload))));
            return decodedPayload;
        } catch (error) {
            console.error('토큰 복호화 중 에러 발생:', error);
            return null;
        }
    } else {
        return null;
    }
};
