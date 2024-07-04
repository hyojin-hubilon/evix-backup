import React, { useState } from 'react';
import { Box, Button, Modal, Typography, Link, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CookieSettings from './CookieSettings';
import { getCookies, setCookie } from '@/utils/Cookie';
import { Cookie } from '@/types/cookie';

const style = {
    position: 'absolute' as 'absolute',
    bottom: '0%',
    left: '50%',
    transform: 'translate(-50%, -0%)',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
};

type Props = {
    handleCookiePolicy: () => void;
};

const CookieGuide: React.FC<Props> = ({ handleCookiePolicy }) => {
    const cookies = getCookies(['necessaryCookies', 'functionalCookies', 'advertisingCookies']);
    const [openThis, setOpenThis] = useState<boolean>(
        cookies?.every((cookie) => cookie.value === undefined)
    );
    const handleThisClose = () => {
        setOpenThis((prev) => !prev);
    };

    const [cookieSettingsIsOpen, setCookieSettingsIsOpen] = useState<boolean>(false);
    const handleCookieSetting = () => {
        setCookieSettingsIsOpen((prev) => !prev);
    };

    const handleConfirm = (dummyCookies: Cookie[]): void => {
        dummyCookies.forEach((cookie) => setCookie(cookie.name, cookie.value, null));
        handleCookieSetting();
        handleThisClose();
    };

    const handleAcceptAllCookie = (): void => {
        cookies.forEach((cookie) => setCookie(cookie.name, true, null));
        handleThisClose();
    };

    return (
        <>
            <Modal
                open={openThis}
                onClose={handleThisClose}
                aria-labelledby="cookie-modal-title"
                aria-describedby="cookie-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2">
                            The website uses technologies such as cookies to activate essential site
                            features and use them for analysis, personalization, and target
                            advertising purposes. <br />
                            You can change the settings at any time or leave the default settings as
                            they are. You can close this banner if you want to continue using only
                            required cookies.
                            <Link
                                onClick={handleCookiePolicy}
                                style={{ cursor: 'pointer' }}
                                sx={{ ml: 1 }}
                            >
                                Cookie Policy
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            sx={{ mb: 1 }}
                            onClick={handleAcceptAllCookie}
                        >
                            Accept all
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={handleCookieSetting}
                        >
                            Cookie settings
                        </Button>
                    </Box>
                    <IconButton aria-label="close" sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <CloseIcon onClick={handleThisClose}/>
                    </IconButton>
                </Box>
            </Modal>
            <CookieSettings
                isOpen={cookieSettingsIsOpen}
                handleClose={handleCookieSetting}
                handleConfirm={handleConfirm}
            />
        </>
    );
};

export default CookieGuide;
