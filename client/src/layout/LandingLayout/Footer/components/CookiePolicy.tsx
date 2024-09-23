import React, { useMemo } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    List,
    ListItem,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

type CookiePolicy = {
    title: string;
    description: string;
};

const CookiePolicy: React.FC<Props> = ({ isOpen, handleClose }) => {
    const { t, i18n } = useTranslation();
    const cookiePolicies: CookiePolicy[] = useMemo(() => {
        return [
            {
                title: `${t('landing.cookie_policy.what_are_cookies')}`,
                description: `${t('landing.cookie_policy.what_are_cookies_description')}`,
            },
            {
                title: `${t('landing.cookie_policy.how_do_we')}`,
                description: `${t('landing.cookie_policy.how_do_we_description')}`,
            },
            {
                title: `${t('landing.cookie_policy.strictly_necessary')}`,
                description: `${t('landing.cookie_policy.strictly_necessary_description')}`,
            },
            {
                title: `${t('landing.cookie_policy.session_cookie')}`,
                description: `${t('landing.cookie_policy.session_cookie_description')}`,
            },
            {
                title: `${t('landing.cookie_policy.auth_cookie')}`,
                description: `${t('landing.cookie_policy.auth_cookie_description')}`,
            },
            {
                title: `${t('landing.cookie_policy.analytics_cookie')}`,
                description: `${t('landing.cookie_policy.analytics_cookie_description')}`,
            },
            {
                title: `${t('landing.cookie_policy.preference_cookie')}`,
                description: `${t('landing.cookie_policy.preference_cookie_description')}`,
            },
        ];
    }, [i18n.language]);

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>
                <Typography variant='h3'>Cookie Policy</Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <List>
                    {cookiePolicies.map((policy, index) => (
                        <ListItem key={index}>
                            <Typography variant="body1" gutterBottom>
                                <strong>{policy.title}</strong>
                                <br />
                                {policy.description}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default CookiePolicy;
