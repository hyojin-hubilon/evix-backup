import React, { useMemo } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    List,
    ListItem,
    IconButton,
    Container,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import KoreanPrivacyPolicy from './KoreanPrivacyPolicy';
import EnglishPrivacyPolicy from './EnglishPrivacyPolicy';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

const PrivacyPolicy: React.FC<Props> = ({ isOpen, handleClose }) => {
    const { t, i18n } = useTranslation();
    const isLanguageEnglish = i18n.language === 'en';

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Logo width={130} />
            {isLanguageEnglish ? <EnglishPrivacyPolicy /> : <KoreanPrivacyPolicy />}
        </Dialog>
    );
};

export default PrivacyPolicy;
