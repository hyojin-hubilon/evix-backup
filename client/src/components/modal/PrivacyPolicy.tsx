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

type Term = {
    title: string;
    description: string;
};

const PrivacyPolicy: React.FC<Props> = ({ isOpen, handleClose }) => {
    const { t, i18n } = useTranslation();
    const termsGenerator = ():Term[] => {
        return [
            {
                title: t('landing.privacy_policy.last_revised'),
                description: '',
            },
            {
                title: '',
                description: t('landing.privacy_policy.description'),
            },
            { title: '1. Terms of Use: ', description: '' },
            { title: '2. Not Health Advice: ', description: '' },
            { title: '3. DISCLAIMER OF WARRANTIES: ', description: '' },
            { title: '4. LIABILITY: ', description: '' },
            { title: '5. INDEMNITY: ', description: '' },
            { title: '6. Third Party Content: ', description: '' },
            { title: '7. Copyright and Trademark: ', description: '' },
            {
                title: '8. No Offers or Solicitations; Forward-Looking Statements: ',
                description: '',
            },
        ];
    };

    const terms:Term[] = useMemo(() => {
        return termsGenerator();
    }, [i18n.language]);

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>
                <h3>{t('landing.privacy_policy.title')}</h3>
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
                    {terms.map((term, index) => (
                        <ListItem key={index}>
                            <Typography variant="body1" gutterBottom>
                                {term.title}
                                {term.description}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default PrivacyPolicy;
