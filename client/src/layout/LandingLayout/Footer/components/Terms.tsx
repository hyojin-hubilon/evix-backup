import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EnglishTerms from './terms/EnglishTerms';
import KoreanTerms from './terms/KoreanTerms';
import Logo from '@/components/Logo/Logo';
import CloseIcon from '@mui/icons-material/Close';

type Props = { isOpen: boolean; handleClose: () => void };

const Terms: React.FC<Props> = ({ isOpen, handleClose }) => {
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
            <DialogContent>{isLanguageEnglish ? <EnglishTerms /> : <KoreanTerms />}</DialogContent>
        </Dialog>
    );
};

export default Terms;
