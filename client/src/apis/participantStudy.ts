import { ParticipantStudyDetail, ParticipantSurveySet } from '@/types/participant';
import { api, file_api, ResCommonError } from './axios-common';
const BASE_API_URL = '/participant/study';
const participantStudyApi = {
    studyList: async () => {
        try {
            const responseData = await api<{}>(`${BASE_API_URL}/my-list`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    login: async () => {
        try {
            const data = {
                'mdpp_patient_id': 34353,
                'fcm_token':
                    'fQ_S6VPWCk_3odCA-eRdNR:APA91bHZBFUUSyMemfBfB6mubHEM8n9sgujO9Lz1C515f-YB-9xnAdL3zvcyQ13ldfT-J_r39SGQDjqM_VAONyvyay6N9fuAGHQIzMB6zo9PDbvjl13eONRsi01bnegCvTbeLqxeN37T',
            };
            const responseData = await api<{}>('/auth/participant/login', 'post', data);
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    studyDetail: async (stdNo) => {
        try {
            const responseData = await api<ParticipantStudyDetail>(`${BASE_API_URL}/${stdNo}`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    studySurveyList: async (stdNo) => {
        try {
            const responseData = await api<ParticipantSurveySet[]>(`${BASE_API_URL}/${stdNo}/survey-set`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    downloadEicFile: async (stdNo: number, fileName: string) => {
        try {
            const responseData = await api<{}>(
                `${BASE_API_URL}/original-eic-download/${stdNo}/${fileName}`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    uploadEic: async (std_no: number, formData: FormData) => {
        try {
            const responseData = await file_api<{participantName : string}>(`${BASE_API_URL}/upload-eic?std_no=${std_no}`, 'post', formData);
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

};
export default participantStudyApi;