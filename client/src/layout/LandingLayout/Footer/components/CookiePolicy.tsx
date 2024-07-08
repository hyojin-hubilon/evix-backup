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
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/reducers';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

type CookiePolicy = {
    title: string;
    description: string;
};

const cookiePlicyGenerate = (): CookiePolicy[] => {
    return [
        {
            title: 'What are cookies?',
            description: `When you visit a website such as uMotif.com, the website stores data in
                            small files on your computer, known as cookies. Cookies are used to
                            store information about you and your preferences, so that you don't have
                            to keep re-entering them, and improve your browsing experience.`,
        },
        {
            title: 'How do we use cookies?',
            description: 'There are several different types of cookie:',
        },
        {
            title: 'Strictly necessary cookies',
            description: `These cookies are essential to enable you to move around the website and
                            use its features, such as accessing secure areas of the website. Without
                            these cookies, the services you have asked for cannot be provided.`,
        },
        {
            title: 'Session Cookies:',
            description: `A session cookie is stored in
                            temporary memory and is not retained after the browser is closed.
                            Session cookies do not collect information from the user's computer and
                            contain only a session identifier which is not personally identifiable.`,
        },
        {
            title: 'Authentication Cookies:',
            description: `If you register and
                            authenticate (log in) to any of uMotif's services you may receive
                            authentication cookies that are used to securely maintain a logged-in
                            state to one or more of our services and will usually expire after a
                            period for your safety. They contain no personally identifiable
                            information.`,
        },
        {
            title: 'Analytics Cookies:',
            description: `These cookies collect information
                            about how visitors use a website, for instance, which pages visitors go
                            to most often, and if they get error messages from web pages. These
                            cookies don't collect information that identifies a visitor. All
                            information these cookies collect is aggregated and therefore anonymous.
                            It is only used to improve how a website works.`,
        },
        {
            title: 'Preference Cookies',
            description: `You may store non-personally identifiable preferences such as your
                            preferred language choice so that we can display content in the correct
                            language to you when you use our services.`,
        },
    ];
};

const CookiePolicy: React.FC<Props> = ({ isOpen, handleClose }) => {
	
    const languageSelector = useSelector((state: IRootState) => state.language);
    const { t } = useTranslation();

    console.log("CookiePolicy: ", languageSelector.selected_language);

    const cookiePolicies: CookiePolicy[] = useMemo(() => {
        return [
            {
                title: `${t('langding.cookie_policy.what_are_cookies')}`,
                description: `${t('langding.cookie_policy.what_are_cookies_description')}`,
            },
            {
                title: `${t('langding.cookie_policy.how_do_we')}`,
                description: `${t('langding.cookie_policy.how_do_we_description')}`,
            },
            {
                title: 'Strictly necessary cookies',
                description: `These cookies are essential to enable you to move around the website and
                                use its features, such as accessing secure areas of the website. Without
                                these cookies, the services you have asked for cannot be provided.`,
            },
            {
                title: 'Session Cookies:',
                description: `A session cookie is stored in
                                temporary memory and is not retained after the browser is closed.
                                Session cookies do not collect information from the user's computer and
                                contain only a session identifier which is not personally identifiable.`,
            },
            {
                title: 'Authentication Cookies:',
                description: `If you register and
                                authenticate (log in) to any of uMotif's services you may receive
                                authentication cookies that are used to securely maintain a logged-in
                                state to one or more of our services and will usually expire after a
                                period for your safety. They contain no personally identifiable
                                information.`,
            },
            {
                title: 'Analytics Cookies:',
                description: `These cookies collect information
                                about how visitors use a website, for instance, which pages visitors go
                                to most often, and if they get error messages from web pages. These
                                cookies don't collect information that identifies a visitor. All
                                information these cookies collect is aggregated and therefore anonymous.
                                It is only used to improve how a website works.`,
            },
            {
                title: 'Preference Cookies',
                description: `You may store non-personally identifiable preferences such as your
                                preferred language choice so that we can display content in the correct
                                language to you when you use our services.`,
            },
        ];
    }, [languageSelector.selected_language]);

    // const cookiePolicies: CookiePolicy[] = useMemo(() => {
    //     return cookiePlicyGenerate();
    // }, []);

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>
                <strong>Cookie Policy</strong>
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
