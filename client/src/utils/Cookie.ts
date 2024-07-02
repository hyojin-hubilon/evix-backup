import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
    return cookies.set(name, value, { ...options });
};

export const getCookie = (name) => {
    return cookies.get(name);
};

export const removeCookie = (name) => {
    cookies.remove(name);
};

// Base64Url decoding (한글 깨짐 이슈)
const base64UrlDecode = (input) => {
    input = input.replace(/-/g, "+").replace(/_/g, "/");

    const pad = input.length % 4;
    if (pad) {
        if (pad === 1) {
            throw new Error(
                "InvalidLengthError: Input base64url string is the wrong length to determine padding"
            );
        }
        input += new Array(5 - pad).join("=");
    }

    return atob(input);
};

export const getDecodedToken = (cookieName) => {
    const token = getCookie(cookieName);
    if (token) {
        try {
            const payload = token.split(".")[1];
            const decodedPayload = JSON.parse(
                decodeURIComponent(escape(base64UrlDecode(payload)))
            );
            return decodedPayload;
        } catch (error) {
            console.error("토큰 복호화 중 에러 발생:", error);
            return null;
        }
    } else {
        return null;
    }
};
