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

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

type Term = {
    title: string;
    description: string;
};

const termsGenerator = ():Term[] => {
    return [
        {
            title: 'Last Revised: November 2022',
            description: '',
        },
        {
            title: '',
            description: `These Terms and Conditions together with our Privacy Notice govern your
                        use or viewing of this website (the “Site”) and your relationship with
                        the owner of the Site, Roche Diagnostics (the “Site Owner”). You may
                        contact Roche Diagnostics at F. Hoffmann-La Roche Ltd, Corporate
                        Communications, Grenzacherstrasse 124, CH-4070 Basel, Switzerland. By
                        using this Site, you agree to be bound by these Terms and Conditions.`,
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

const PrivacyPolicy: React.FC<Props> = ({ isOpen, handleClose }) => {
    const terms:Term[] = useMemo(() => {
        return termsGenerator();
    }, []);

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>
                <h3>Privacy notice</h3>
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
