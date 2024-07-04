import React from 'react';
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

const Terms: React.FC<{ isOpen: boolean; handleOpen: () => void }> = ({ isOpen, handleOpen }) => {
    return (
        <Dialog open={isOpen} onClose={handleOpen}>
            <DialogTitle>
                <h3>Website terms and conditions</h3>
                <IconButton
                    aria-label="close"
                    onClick={handleOpen}
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
                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            Last Revised: November 2022
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            These Terms and Conditions together with our Privacy Notice govern your
                            use or viewing of this website (the “Site”) and your relationship with
                            the owner of the Site, Roche Diagnostics (the “Site Owner”). You may
                            contact Roche Diagnostics at F. Hoffmann-La Roche Ltd, Corporate
                            Communications, Grenzacherstrasse 124, CH-4070 Basel, Switzerland. By
                            using this Site, you agree to be bound by these Terms and Conditions.
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            1. Terms of Use:
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            2. Not Health Advice:
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            3. DISCLAIMER OF WARRANTIES:
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            4. LIABILITY:
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            5. INDEMNITY:
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            6. Third Party Content:
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            7. Copyright and Trademark:
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            8. No Offers or Solicitations; Forward-Looking Statements:
                        </Typography>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default Terms;
