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
			<DialogTitle>
            	<Logo width={130} />
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
			<DialogContent>

            {isLanguageEnglish ? <EnglishPrivacyPolicy /> : <KoreanPrivacyPolicy />}
			</DialogContent>
        </Dialog>
    );
};

export default PrivacyPolicy;
