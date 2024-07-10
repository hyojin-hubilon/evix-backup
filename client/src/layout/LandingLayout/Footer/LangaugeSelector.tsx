import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        i18n.changeLanguage(event.target.value as string);
    };

    return (
        <FormControl fullWidth>
            <Select
                name="language-select"
                value={i18n.language}
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
                <MenuItem value="en">{t('landing.language.en')}</MenuItem>
                <MenuItem value="ko">{t('landing.language.ko')}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
