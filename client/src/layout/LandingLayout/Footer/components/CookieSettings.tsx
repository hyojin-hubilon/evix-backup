import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Switch, FormControlLabel, Paper } from '@mui/material';
import { Cookie } from '@/types/cookie';
import { useTranslation } from 'react-i18next';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    handleConfirm: (dummyCookies: Cookie[]) => void;
};

const CookieSettings: React.FC<Props> = ({ isOpen, handleClose, handleConfirm }) => {
    const { t } = useTranslation();
    const [dummyCookies, setDummyCookies] = useState<Cookie[]>([
        { name: 'necessaryCookies', value: true },
        { name: 'functionalCookies', value: false },
    ]);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDummyCookies((prevCookies) => {
            const newCookies = prevCookies.map((cookie) =>
                cookie.name === e.target.name ? { ...cookie, value: e.target.checked } : cookie
            );
            return newCookies;
        });
    };

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="cookie-settings-title"
                aria-describedby="cookie-settings-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="cookie-settings-title" variant="h5" component="h2">
                        {t('landing.cookie_settings.title')}
                    </Typography>
                    <Typography id="cookie-settings-description" sx={{ mt: 2 }}>
                        {t('landing.cookie_settings.description')}
                    </Typography>
                    <Paper sx={{ mt: 2, p: 2, border: 1, borderColor: 'divider' }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={true}
                                    name="necessaryCookies"
                                    color="primary"
                                    disabled
                                />
                            }
                            label={t('landing.cookie_settings.necessary_cookie')}
                        />
                        <Typography variant="body2">
                            {t('landing.cookie_settings.necessary_cookie_description')}
                        </Typography>
                    </Paper>
                    <Paper sx={{ mt: 2, p: 2, border: 1, borderColor: 'divider' }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={!!dummyCookies[1].value}
                                    onChange={handleToggle}
                                    name="functionalCookies"
                                    color="primary"
                                />
                            }
                            label={t('landing.cookie_settings.funtional_cookie')}
                        />
                        <Typography variant="body2">
                            {t('landing.cookie_settings.funtional_cookie_description')}
                        </Typography>
                    </Paper>
                    {/* <Paper sx={{ mt: 2, p: 2, border: 1, borderColor: 'divider' }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={!!dummyCookies[2].value}
                                    onChange={handleToggle}
                                    name="advertisingCookies"
                                    color="primary"
                                />
                            }
                            label="Advertising Cookies"
                        />
                        <Typography variant="body2">
                            A cookie that supports advertising features.
                        </Typography>
                    </Paper> */}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleConfirm(dummyCookies)}
                        >
                            {t('landing.cookie_settings.confirm_my_choice')}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CookieSettings;
