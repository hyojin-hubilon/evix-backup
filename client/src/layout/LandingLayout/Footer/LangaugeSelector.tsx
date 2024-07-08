import { useState } from 'react';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLanguage as languageReduce } from '@/store/reducers/language';


const LanguageSelector = () => {
    const dispatch = useDispatch(); // dispatch로 재선언하여 사용한다.
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState<string>('en');

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        setLanguage(event.target.value as string);
        i18n.changeLanguage(event.target.value as string);
        dispatch( languageReduce({ language: event.target.value as string }));
    };

    return (
        <FormControl fullWidth>
            <Select
                name="language-select"
                value={language}
                onChange={handleChange}
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(228, 219, 233, 0.25)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(228, 219, 233, 0.25)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(228, 219, 233, 0.5)',
                    },
                    '.MuiSvgIcon-root ': {
                        fill: 'white !important',
                    },
                }}
            >
                <MenuItem value="en">{t('langding.language.en')}</MenuItem>
                <MenuItem value="ko">{t('langding.language.ko')}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
