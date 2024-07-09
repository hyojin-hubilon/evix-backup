import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from './text/ko.json';
import en from './text/en.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        ko: {
            translation: ko,
        },
    },
    lng: 'en', // 초기 언어 설정
    fallbackLng: 'en', // 사용자가 설정한 언어에 해당하는 번역이 없을 경우 사용할 언어
    interpolation: {
        escapeValue: false, // React는 기본적으로 XSS 방지 기능을 제공하므로 별도로 설정할 필요 없음
    },
});

export default i18n;
