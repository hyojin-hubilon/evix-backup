import axios from "axios";

const instance = axios.create({
    baseURL: "/api/v1",
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
});

const handleApiError = (error: any, defaultMessage: string) => {
    if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error || error.message;
        throw new Error(`${defaultMessage} : ${errorMessage}`);
    } else {
        throw new Error(`${defaultMessage} : ${error.message}`);
    }
};

export { instance, handleApiError };
