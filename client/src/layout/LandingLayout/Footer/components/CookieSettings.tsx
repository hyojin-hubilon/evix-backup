import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Switch, FormControlLabel, Paper } from '@mui/material';
import { Cookie } from '@/types/cookie';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    handleConfirm: (dummyCookies: Cookie[]) => void;
};

const CookieSettings: React.FC<Props> = ({ isOpen, handleClose, handleConfirm }) => {
    const [dummyCookies, setDummyCookies] = useState<Cookie[]>([
        { name: 'necessaryCookies', value: true },
        { name: 'functionalCookies', value: false },
        { name: 'advertisingCookies', value: false },
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
                        Cookie settings
                    </Typography>
                    <Typography id="cookie-settings-description" sx={{ mt: 2 }}>
                        For cookies on this site, you can use features and advertising cookies or
                        related technologies to select whether you can collect user data for the
                        following purposes.
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
                            label="Necessary Cookies"
                        />
                        <Typography variant="body2">
                            Required to activate the default website functionality. Unable to
                            deactivate required cookies. Save login details, secure login support,
                            and save incomplete transactions or tasks.
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
                            label="Functional Cookies"
                        />
                        <Typography variant="body2">
                            A cookie that supports you to provide a customized browsing experience.
                            It analyzes usage records to provide customized content, stores shopping
                            cart lists, and analyzes to optimize site functions.
                        </Typography>
                    </Paper>
                    <Paper sx={{ mt: 2, p: 2, border: 1, borderColor: 'divider' }}>
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
                    </Paper>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleConfirm(dummyCookies)}
                        >
                            Confirm My Choice
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CookieSettings;
