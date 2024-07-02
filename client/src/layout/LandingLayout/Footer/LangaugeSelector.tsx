import { useState } from 'react';
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const LanguageSelector = () => {
    const [language, setLanguage] = useState<string>('EN');

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        setLanguage(event.target.value as string);
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
                <MenuItem value="EN">English</MenuItem>
                <MenuItem value="KR">Korean</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
